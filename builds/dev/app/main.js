;(function(){
	'use strict';

	angular.module('Fitness', [
		// 'ui.router',
		'ngRoute',
		'Fitness.Fire',
		'Fitness.Exercises'
		])
	.constant('FIREBASE_URL', 'https://yuliyafitnesstracker.firebaseapp.com')
	.config(Config)
	.controller('MainCtrl', MainController)

	// //@ngInject
	// function Config($urlRouterProvider, $logProvider){
	// 	$logProvider.debugEnabled(true);
	// 	$urlRouterProvider.otherwise('/');
	// }
	//@ngInject
	function Config($routeProvider){
		$routeProvider
		.when('/exercises', {
			templateUrl: 'exercises/index.html',
			controller: 'ExercisesCtrl',
			controllerAs: 'esc'
		})
		.otherwise({redirectTo: '/'})
	}

	//@ngInject
	function MainController($log, $scope){
		$scope.hello = 'hello';
	}
})();