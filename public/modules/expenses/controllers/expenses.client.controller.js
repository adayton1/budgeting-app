'use strict';

angular.module('expenses').controller('ExpensesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Expenses',
	function($scope, $stateParams, $location, Authentication, Expenses) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var expense = new Expenses({
				date: this.date,
				location: this.location,
				category: this.category,
				amount: this.amount,
				notes: this.notes
			});
			expense.$save(function(response) {
				$location.path('expenses');

				$scope.date = '';
				$scope.location = '';
				$scope.category = '';
				$scope.amount = '';
				$scope.notes = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(expense) {
			if (expense) {
				expense.$remove();

				for (var i in $scope.expenses) {
					if ($scope.expenses[i] === expense) {
						$scope.expenses.splice(i, 1);
					}
				}
			} else {
				$scope.expense.$remove(function() {
					$location.path('expenses');
				});
			}
		};

		$scope.update = function() {
			var expense = $scope.expense;

			expense.$update(function() {
				$location.path('expenses');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			Expenses.query(function(expenses) {
				var scopeExpenses = [];
				expenses.forEach(function(expense, index, array) {
					if (Authentication.user._id === expense.user._id) {
						scopeExpenses.push(expense);
					}
				});
				
				$scope.expenses = scopeExpenses;
			});
		};

		$scope.findOne = function() {
			$scope.expense = Expenses.get({
				expenseId: $stateParams.expenseId
			});
		};
	}
]);