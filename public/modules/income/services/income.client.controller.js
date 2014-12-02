'use strict'

// Income service used for communicating with the income REST endpoints
angular.module('income').factory('Income', ['$resource',
	function($resource) {
		return $resource('income/:incomeId', {
			incomeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);