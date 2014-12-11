'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	categories = require('../../app/controllers/categories.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/budgets/:budgetId/categories')
		.get(categories.list)
		.post(users.requiresLogin, categories.create);

	app.route('/budgets/:budgetId/categories/:categoryId')
		.get(categories.read)
		.put(users.requiresLogin, categories.update)
		.delete(users.requiresLogin, categories.delete);

	// Finish by binding the article middleware
	app.param('categoryId', categories.categoryByID);
	app.param('budgetId', categories.create);
};