'use strict';

angular.module('incomes').controller('IncomesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Incomes',
	function($scope, $stateParams, $location, Authentication, Incomes) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var income = new Incomes({
				date: this.date,
				source: this.source,
				amount: this.amount
			});
			income.$save(function(response) {
				$location.path('incomes/' + response._id);

				$scope.date = null;
				$scope.source = '';
				$scope.amount = 0;
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
					$location.path('incomes');
				});
			}
		};

		$scope.update = function() {
			var income = $scope.income;

			income.$update(function() {
				$location.path('incomes/' + income._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.incomes = Incomes.query();
		};

		$scope.findOne = function() {
			$scope.income = Incomes.get({
				incomeId: $stateParams.incomeId
			});
		};
	}
]);