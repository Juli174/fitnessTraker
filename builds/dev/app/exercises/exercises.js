;(function(){
	'use strict';

	angular.module('Fitness.Exercises', [
		'ui.router',
		'Fitness.Exercises.Repository'
		])
	.controller('ExercisesCtrl', ExercisesController)
	.config(ExercisesConfig)

	//@ngInject
	function ExercisesController($q, ExercisesRepository){
		var exercises = ExercisesRepository.getAllExercises();
		exercises.$loaded(function(_exercisesList){
			e.list = _exercisesList;
		});
	}

	//@ngInject
	function ExercisesConfig($stateProvider){
		$stateProvider
		.state('Exercises', {
			url: '/exercises',
			templateUrl: 'app/exercises/index.html',
			controller: 'ExercisesCtrl',
			controllerAs: 'esc'
		});
	}
})();