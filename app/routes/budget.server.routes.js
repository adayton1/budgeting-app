'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	budgets = require('../../app/controllers/budgets.server.controller');

module.exports = function(app) {
	// Budget Routes
	app.route('/budgets')
		.get(budgets.list)
		.post(users.requiresLogin, budgets.create);

	app.route('/budgets/:budgetId')
		.get(budgets.read)
		.put(users.requiresLogin, budgets.hasAuthorization, budgets.update)
		.delete(users.requiresLogin, budgets.hasAuthorization, budgets.delete);

	// Finish by binding the budget middleware
	app.param('budgetId', budgets.budgetByID);
};