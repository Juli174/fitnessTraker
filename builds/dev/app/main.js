;(function(){
	'use strict';

	angular.module('Fitness', [
		'ui.router',
		'Fitness.Fire',
		'Fitness.Exercises',
		'Fitness.Home'
		])
	.constant('FIREBASE_URL', 'https://yuliyafitnesstracker.firebaseapp.com')
	.config(Config)
	.controller('MainCtrl', MainController)

	//@ngInject
	function Config($urlRouterProvider){
		$urlRouterProvider
			.otherwise('/home');
	}

	//@ngInject
	function MainController($log, $scope){
		$scope.hello = 'hello';
	}
})();