'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Category = mongoose.model('Category'),
	_ = require('lodash');

/**
 * Create a category
 */
exports.create = function(req, res, budgetId) {
	console.log(budgetId);
	console.log(req.body);

	var category = new Category(req.body);
	category.budgetId = budgetId;
	category.user = req.user;

	category.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(category);
		}
	});
};

/**
 * Show the current category
 */
exports.read = function(req, res) {
	res.json(req.category);
};

/**
 * Update a category
 */
exports.update = function(req, res) {
	var category = req.category;

	category = _.extend(category, req.body);

	category.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(category);
		}
	});
};

/**
 * Delete an category
 */
exports.delete = function(req, res) {
	var category = req.category;

	category.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(category);
		}
	});
};

/**
 * List of Categories
 */
exports.list = function(req, res) {
	Category.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

/**
 * Category middleware
 */
exports.categoryByID = function(req, res, next, id) {
	Category.findById(id).populate('user', 'displayName').exec(function(err, category) {
		if (err) return next(err);
		if (!category) return next(new Error('Failed to load category ' + id));
		req.category = category;
		next();
	});
};