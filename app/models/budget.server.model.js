'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var budgetTypes = 'yearly monthly weekly'.split(' ');

/**
 * Budget Schema
 */
var BudgetSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},
	type: {
		type: String,
		enum: budgetTypes,
		required: 'Type cannot be blank'
	},
	categories: {
		type: [Schema.Types.Mixed],
		default: []
	},
	notes: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Budget', BudgetSchema);