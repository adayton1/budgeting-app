'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ExpenseSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	date: {
		type: Date,
		default: Date.now,
		required: 'Date cannot be blank'
	},
	location: {
		type: String,
		default: '',
		trim: true,
	},
	amount: {
		type: Number,
		default: 0,
		required: 'Amount cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Expense', ExpenseSchema);