;(function(){
	'use strict';

	angular.module('Fitness.Home', [

		])
	.controller('HomeCtrl', HomeController)
	.config(HomeConfig)

	function HomeController(){

	}

	function HomeConfig($stateProvider){
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'app/home/index.html',
			controller: 'ExercisesCtrl',
			controllerAs: 'hc'
		});
	}
})();