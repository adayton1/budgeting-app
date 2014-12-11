'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		required: 'Name cannot be blank'
	},
	budgetedAmount: {
		type: Number,
		default: 0,
		required: 'Amount budgeted cannot be blank'
	},
	budgetId: {
		type: Schema.ObjectId,
		ref: 'Budget'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Category', CategorySchema);