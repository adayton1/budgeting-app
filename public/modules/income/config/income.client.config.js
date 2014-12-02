'use strict';

// Configuring the Income module
angular.module('income').run(['Menus',
	function(Menus) {
		// Set up top bar menu itmes
		Menus.addMenuItem('topbar', 'Income', 'income', 'dropdown', '/income(/create)?');
		Menus.addSubMenuItem('topbar', 'income', 'List Income', 'income');
		Menus.addSubMenuItem('topbar', 'income', 'New Income', 'income/create');
	}
]);