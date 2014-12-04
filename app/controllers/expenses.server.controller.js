'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var	errorHandler = require('./errors.server.controller');
var	Expense = mongoose.model('Expense');
var _ = require('lodash');

/**
 * Create an expense
 */
exports.create = function(req, res) {
	var expense = new Expense(req.body);
	expense.user = req.user;

	expense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(expense);
		}
	});
};

/**
 * Show the current expense
 */
exports.read = function(req, res) {
	res.json(req.expense);
};

/**
 * Update an expense
 */
exports.update = function(req, res) {
	var expense = req.expense;
	
	expense = _.extend(expense, req.body);

	expense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(expense);
		}
	});
};

/**
 * Delete an expense
 */
exports.delete = function(req, res) {
	var expense = req.expense;

	expense.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(expense);
		}
	});
};

/**
 * List of Expenses
 */
exports.list = function(req, res) {
	Expense.find().sort('-created').populate('user', 'displayName').exec(function(err, expenses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(expenses);
		}
	});
};

/**
 * Expenses middleware
 */
exports.expenseByID = function(req, res, next, id) {
	Expense.findById(id).populate('user', 'displayName').exec(function(err, expense) {
		if (err) 
			return next(err);
		if (!expense) 
			return next(new Error('Failed to load expense ' + id));
		req.expense = expense;
		next();
	});
};

/**
 * Expense authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.expense.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};