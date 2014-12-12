'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Budgets', 'Incomes', 'Expenses', 'Categories',
	function($scope, Authentication, Budgets, Incomes, Expenses, Categories) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

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

			Incomes.query(function(incomes) {
				var scopeIncomes = [];
				incomes.forEach(function(income, index, array) {
					if (Authentication.user._id === income.user._id) {
						scopeIncomes.push(income);
					}
				});
				
				$scope.incomes = scopeIncomes;
			});

			Expenses.query(function(expenses) {
				var scopeExpenses = [];
				expenses.forEach(function(expense, index, array) {
					if (Authentication.user._id === expense.user._id) {
						scopeExpenses.push(expense);
					}
				});
				
				$scope.expenses = scopeExpenses;
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