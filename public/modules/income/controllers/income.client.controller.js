'use strict';

angular.module('income').controller('IncomeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Income',
	function($scope, $stateParams, $location, Authentication, Income) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var income = new Income({
				date: this.date,
				source: this.source,
				amount: this.amount,
				// user = this.user ?
			});
			income.$save(function(response) {
				$location.path('income/' + response._id);

				$scope.date = '';
				$scope.source = '';
				$scope.amount = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(income) {
			if (income) {
				income.$remove();

				for (var i in $scope.incomes) {
					if ($scope.incomes[i] === income) {
						$scope.incomes.splice(i, 1);
					}
				}
			} else {
				$scope.income.$remove(function() {
					$location.path('income');
				});
			}
		};

		$scope.update = function() {
			var income = $scope.income;

			income.$update(function() {
				$location.path('income/' + income._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.income = Income.query();
		};

		$scope.findOne = function() {
			$scope.income-entry = Income.get({
				incomeId: $stateParams.incomeId
			});
		};
	}
]);