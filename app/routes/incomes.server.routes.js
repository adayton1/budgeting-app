'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	incomes = require('../../app/controllers/incomes.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/incomes')
		.get(incomes.list)
		.post(users.requiresLogin, incomes.create);

	app.route('/incomes/:incomeId')
		.get(incomes.read)
		.put(users.requiresLogin, incomes.hasAuthorization, incomes.update)
		.delete(users.requiresLogin, incomes.hasAuthorization, incomes.delete);

	// Finish by binding the article middleware
	app.param('incomeId', incomes.incomeByID);
};