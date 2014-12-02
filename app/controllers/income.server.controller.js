'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var Income = mongoose.model('Income');
var _ = require('lodash');

/**
 * Create an income
 */
exports.create = function(req, res) {
	var income = new Income();

	income.user = req.user;
	income.date = req.date;
	income.source = req.source;
	income.amount = req.amount;

	income.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(income);
		}
	});
};

/**
 * Show the current income item
 */
exports.read = function(req, res) {
	res.json(req.income);
};

/**
 * Update an income item
 */
exports.update = function(req, res) {
	var income = req.income;

	income.user = req.user;
	income.date = req.date;
	income.source = req.source;
	income.amount = req.amount;

	income.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(income);
		}
	});
};

/**
 * Delete an income item
 */
exports.delete = function(req, res) {
	var income = req.income;

	income.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(income);
		}
	});
};

/**
 * List income items
 */
exports.list = function(req, res) {
	Income.find().sort('-created').populate('user', 'displayName').exec(function(err, incomeItems) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(incomeItems);
		}
	});
};

/**
 * Income middleware
 */
exports.incomeByID = function(req, res, next, id) {
	Income.findById(id).populate('user', 'displayName').exec(function(err, incomeItem) {
		if (err) return next(err);
		if (!incomeItem) return next(new Error('Failed to load income item ' + id));
		req.income = incomeItem;
		next();
	});
};

/**
 * Income authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.income.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};