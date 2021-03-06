'use strict';

//Expenses service used for communicating with the expenses REST endpoints
angular.module('expenses').factory('Expenses', ['$resource',
	function($resource) {
		return $resource('expenses/:expenseId', {
			expenseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);