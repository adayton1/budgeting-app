'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Income Schema
 */
var IncomeSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	date: {
		type: Date,
		default: Date.now,
		required: 'Date cannot be blank'
	},
	source: {
		type: String,
		default: '',
		trim: true
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

mongoose.model('Income', IncomeSchema);