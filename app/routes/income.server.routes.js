'use strict';

/**
 * Module dependencies
 */
var users = require('../../app/controllers/users.server.controller');
var income = require('../../app/controllers/income.server.controller');

module.exports = function(app) {
	// Income Routes
	app.route('/income')
		.get(income.list)
		.post(users.requiresLogin, income.create);

	app.route('/income/:incomeId')
		.get(income.read)
		.put(users.requiresLogin, income.hasAuthorization, income.update)
		.delete(users.requiresLogin, income.hasAuthorization, income.delete);

	// Finish by binding the income middleware
	app.param('incomeId', income.incomeByID);
};