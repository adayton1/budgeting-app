'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Budgets', 'Categories',
	function($scope, Authentication, Budgets, Categories) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		if ($scope.authentication.user) {
			$scope.loggedIn = true;
		}

		$scope.init = function() {
			Budgets.query(function(budgets) {
				var activeBudget;
				budgets.forEach(function(budget, index, array) {
					if (budget.user._id === Authentication.user._id && budget.state === 'active') {
						activeBudget = budget;
					}
				});
				$scope.activeBudget = activeBudget;
			});

			Categories.query(function(categories) {
				var scopeCategories = [];
				categories.forEach(function(category, index, array) {
					if (Authentication.user._id === category.user._id) {
						scopeCategories.push(category);
					}
				});
				
				$scope.categories = scopeCategories;
			});
		};
	}
]);