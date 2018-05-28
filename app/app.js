var app = angular.module('MyApp', [
	'ngRoute',
	'ui.bootstrap',
	'ngDragDrop'
	]);

/*
	By: Anna and Calle 2014-03-10
	This provides routing between different html-views. 
	We assign controllers to each view in each html file as well.

*/

app.config(function($routeProvider) {
		$routeProvider.
		when('/MainView/', {
			templateUrl: 'app/views/mainView.html',
			controller: 'DragDropController'
		}).
		when('/welcome', {
			templateUrl: 'app/views/welcomeView.html',
			controller: 'WelcomeController'
		}).
		otherwise({
			redirectTo:'/welcome'
		});
});