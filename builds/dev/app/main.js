;(function(){
	'use strict';

	angular.module('Fitness', [
		'ui.router',
		'Fitness.Fire',
		'Fitness.Exercises'
		])
	.constant('FIREBASE_URL', 'https://yuliyafitnesstracker.firebaseapp.com')
	.config(Config)
	.controller('MainCtrl', MainController)

	//@ngInject
	function Config($urlRouterProvider, $logProvider){
		$logProvider.debugEnabled(true);
		$urlRouterProvider.otherwise('/');
	}

	//@ngInject
	function MainController($log, $scope){
		$scope.hello = 'hello';
	}
})();