'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	categories = require('../../app/controllers/categories.server.controller');

module.exports = function(app) {
	// Category routes
	app.route('/categories/')
		.get(categories.list)
		.post(users.requiresLogin, categories.create);

	app.post('/categories/post/:budgetId', categories.create);

	app.route('/categories/:categoryId')
		.get(categories.read)
		.put(users.requiresLogin, categories.update)
		.delete(users.requiresLogin, categories.delete);

	// Finish by binding the category middleware
	app.param('categoryId', categories.categoryByID);
};