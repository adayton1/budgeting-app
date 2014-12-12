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
	spent: {
		type: Number,
		default: 0
	},
	budgetId: {
		type: String,
		default: '',
		require: 'Must have a budget'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Category', CategorySchema);