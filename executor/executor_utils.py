
# with all the business logic
import docker
import os
import shutil
import uuid

from docker.errors import APIError
from docker.errors import ContainerError
from docker.errors import ImageNotFound

CURRENT_DIR = os.path.dirname(os.path.relpath(__file__)) # set up a unique folder; "__file__" is the current running file
IMAGE_NAME = 'wendy/cs503'

client = docker.from_env() # flask server becomes docker client so that it can call docker service

TEMP_BUILD_DIR = "%s/tmp/" % CURRENT_DIR # create a temp folder where we temprarily save code generated during build
CONTAINER_NAME = "%s:latest" % IMAGE_NAME

SOURCE_FILE_NAMES = {
	"java": "Example.java",
	"python": "example.py",

}

BINARY_NAMES = {
	"java": "Example",
	"python": "example.py",
}

BUILD_COMMANDS = {
	"java": "javac",
	"python": "python3",

}

EXECUTE_COMMANDS = {
	"java": "java",
	"python": "python3",
}

def load_image():
	try:
		client.images.get(IMAGE_NAME)
		print("iamge exists locally")
	except ImageNotFound:
		print("Image not found locally, loading from docker hub")
		client.image.pull(IMAGE_NAME)
	except APIError:
		print("Can't connect to docker")

	return

def make_dir(dir): # used in build_and_run function
	try:
		os.mkdir(dir)
	except OSError:
		print("Can't create directory")


def build_and_run(code, lang):
	result = {'build': None, 'run': None, 'error': None}

	source_file_parent_dir_name = uuid.uuid4() # the parent dir will be set up every time build_and_run is evoked

	# create host dir located in python server
	source_file_host_dir = "%s/%s" % (TEMP_BUILD_DIR, source_file_parent_dir_name)

	# create guest dir located in docker container
	source_file_guest_dir = "/test/%s" % (source_file_parent_dir_name)

	# use the function defined earlier
	make_dir(source_file_host_dir)

	with open("%s/%s" % (source_file_host_dir, SOURCE_FILE_NAMES[lang]), 'w') as source_file:
		source_file.write(code) # "with"means open the file and then close it; "w": open the file in write mode; "code" is the code from users

	try:
		client.containers.run(
			image = IMAGE_NAME,
			command = "%s %s" % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang]),
			
			#connect host with guest by binding two folders in the mode of "read" and "write"
			volumes = {source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
			#define working directory
			working_dir = source_file_guest_dir
		)

		print("Source built")

		result['build'] = 'OK'
	except ContainerError as e:
		result['build'] = str(e.stderr, 'utf-8')
		shutil.rmtree(source_file_host_dir)

		return result

	try:
		log = client.containers.run(
			image = IMAGE_NAME,
			command = "%s %s" % (EXECUTE_COMMANDS[lang], BINARY_NAMES[lang]),
			volumes = {source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
			working_dir = source_file_guest_dir
		)

		log = str(log, 'utf-8')

		print(log)

		result['run'] = log
	except ContainerError as e:
		result['run'] = str(e.stderr, 'utf-8')
		shutil.rmtree(source_file_host_dir)

		return result

	shutil.rmtree(source_file_host_dir) # clean up host directory

	return result
