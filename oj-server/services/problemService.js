const ProblemModel = require('../models/problemModel');

// get all problems
const getProblems = function() {
	// return new Promise((resolve, reject) => {
	// 	resolve(problems);
	// });

	return new Promise((resolve, reject) => {
		ProblemModel.find({}, (err, problems) => {
			if (err) {
				reject(err);
			} else {
				resolve(problems);
			}
		});
	});
}

// get 1 problem by id
const getProblem = function(idNumber) {
	// return new Promise((resolve, reject) => {
	// 	resolve(problems.find(problem => problem.id === id));
	// });

	return new Promise((resolve, reject) => {
		ProblemModel.findOne({id: idNumber}, (err, problem) => {
			if (err) {
				reject(err);
			} else {
				resolve(problem);
			}

		});
	});
}

// add a problem
const addProblem = function(newProblem) {
	// return new Promise((resolve, reject) => {
	// 	// reject if the problem already exists
	// 	if (problems.find(problem => problem.name === newProblem.name)) {
	// 		reject('problem already exists');
	// 	} else {
	// 		newProblem.id = problems.length + 1;
	// 		problems.push(newProblem);
	// 		resolve(newProblem);
	// 	}
	// });
	return new Promise((resolve, reject) => {
		ProblemModel.findOne({name: newProblem.name}, (err, data) => {
			if (data) {
				reject('problem already exists');
			} else {
				ProblemModel.count({}, (err, count) => {
					newProblem.id = count + 1;
					const mongoProblem = new ProblemModel(newProblem);
					mongoProblem.save();
					resolve(mongoProblem);
				});
			}
		});
	});
}

module.exports = {
	getProblems,
	getProblem,
	addProblem
}