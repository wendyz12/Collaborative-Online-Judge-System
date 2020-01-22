var redis = require('redis');
// only one client is created;
var client = redis.createClient();

// we only call our own wapper set and get to store and get values from redis
function set(key, value, callback) {
	client.set(key, value, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}

		callback(res);
	});
}

function get(key, callback) {
	client.get(key, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}

		callback(res);
	});
}

function expire(key, timeInSeconds) {
	client.expire(key, timeInSeconds);
}

function quit() {
	client.quit();
}

module.exports = {
	get: get,
	set: set,
	expire: expire,
	quit: quit,
	redisPrint: redis.print
}