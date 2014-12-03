'use strict';

//Incomes service used for communicating with the articles REST endpoints
angular.module('incomes').factory('Incomes', ['$resource',
	function($resource) {
		return $resource('incomes/:incomeId', {
			incomeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);