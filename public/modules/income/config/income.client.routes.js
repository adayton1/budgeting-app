'use strict';

// Setting up route
angular.module('income').config(['$stateProvider',
	function($stateProvider) {
		// Income state routing
		$stateProvider.
		state('listIncome', {
			url: '/income',
			templateUrl: 'modules/income/views/list-income.client.view.html'
		}).
		state('createIncome', {
			url: '/income/create',
			templateUrl: 'modules/income/views/create-income.client.view.html'
		}).
		state('viewIncome', {
			url: '/income/:incomeId',
			templateUrl: 'modules/income/views/view-income.client.view.html'
		}).
		state('editeIncome', {
			url: '/income/:incomeId/edit',
			templateUrl: 'modules/views/edit-income.client.view.html'
		});
	}
]);