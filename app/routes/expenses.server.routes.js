'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller');
var	expenses = require('../../app/controllers/expenses.server.controller');

module.exports = function(app) {
	// Expense Routes
	app.route('/expenses')
		.get(expenses.list)
		.post(users.requiresLogin, expenses.create);

	app.route('/expenses/:expenseId')
		.get(expenses.read)
		.put(users.requiresLogin, expenses.hasAuthorization, expenses.update)
		.delete(users.requiresLogin, expenses.hasAuthorization, expenses.delete);

	// Finish by binding the article middleware
	app.param('expenseId', expenses.expenseByID);
};