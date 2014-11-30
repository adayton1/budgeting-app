'use strict';

angular.module('budgets').controller('BudgetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Budgets',
	function($scope, $stateParams, $location, Authentication, Budgets) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var budget = new Budgets({
				name: this.name,
				categories: this.categories,
				notes: this.notes
			});
			budget.$save(function(response) {
				$location.path('budgets/' + response._id);

				$scope.name = '';
				$scope.categories = [];
				$scope.notes = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(budget) {
			if (budget) {
				budget.$remove();

				for (var i in $scope.budgets) {
					if ($scope.budgets[i] === budget) {
						$scope.budgets.splice(i, 1);
					}
				}
			} else {
				$scope.budgets.$remove(function() {
					$location.path('budgets');
				});
			}
		};

		$scope.update = function() {
			var budget = $scope.budget;

			budget.$update(function() {
				$location.path('budgets/' + budget._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.budgets = Budgets.query();
		};

		$scope.findOne = function() {
			$scope.budget = Budgets.get({
				budgetId: $stateParams.budgetId
			});
		};
	}
]);