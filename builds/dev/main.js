;(function(){
	'use strict';

	angular.module('Fitness', [
		'ui.router',
		'Fitness.Fire',
		'Fitness.Exercises'
		])
	.constant('FIREBASE_URL', 'https://yuliyafitnesstracker.firebaseapp.com')
	.config(Config)

	//@ngInject
	function Config($urlRouterProvider, $logProvider){
		$logProvider.debugEnabled(true);
		$log.debug('main config');
		$urlRouterProvider.otherwise('/');
	}
})();