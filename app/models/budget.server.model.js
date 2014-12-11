'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var budgetTypes = 'yearly monthly weekly daily'.split(' ');
var budgetStates = 'active inactive'.split(' ');

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
		trim: true,
		required: 'Name cannot be blank'
	},
	type: {
		type: String,
		enum: budgetTypes,
		required: 'Type cannot be blank'
	},
	state: {
		type: String,
		enum: budgetStates,
		default: 'active'
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