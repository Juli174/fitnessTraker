;(function(){
	'use strict';

	angular.module('Fitness.Exercises', [
		// 'Fitness.Exercises.Repository'
		])
	.controller('ExercisesCtrl', ExercisesController)
	.config(ExercisesConfig)

	//@ngInject
	function ExercisesController($q){
		// var exercises = ExercisesRepository.getAllExercises();
		// exercises.$loaded(function(_exercisesList){
		// 	e.list = _exercisesList;
		// });
		var s = this;
		s.hello = "hello, world!";
	}

	//@ngInject
	function ExercisesConfig($stateProvider){
		$stateProvider
		.state('exercises', {
			url: '/exercises',
			templateUrl: 'app/exercises/index.html',
			controller: 'ExercisesCtrl',
			controllerAs: 'esc'
		});
	}


})();