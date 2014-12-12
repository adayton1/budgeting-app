'use strict';

angular.module('categories').controller('CategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categories', 'Budgets',
	function($scope, $stateParams, $location, Authentication, Categories, Budgets) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var category = new Categories({
				name: this.name,
				budgetedAmount: this.budgetedAmount,
				budgetId: this.budgetId
			});
			category.$save(function(response) {
				$location.path('categories');

				$scope.name = '';
				$scope.budgetedAmount = '';
				$scope.budgetId = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.update = function() {
			var category = $scope.category;

			category.$update(function() {
				$location.path('categories/' + category._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(category) {
			if (category) {
				category.$remove();

				for (var i in $scope.categories) {
					if ($scope.categories[i] === category) {
						$scope.categories.splice(i, 1);
					}
				}
			} else {
				$scope.categories.$remove(function() {
					$location.path('categories');
				});
			}
		};

		$scope.find = function() {
			$scope.categories = Categories.query();
		};

		$scope.findOne = function() {
			$scope.category = Categories.get({
				categoryId: $stateParams.categoryId
			});
		};

		$scope.getUserBudgets = function() {
			$scope.budgets = Budgets.query();
		};
	}
]);