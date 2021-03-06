;(function(){
	'use strict';

	angular.module('Fitness.Exercises', [
		 'Fitness.Exercises.Repository',
		 'ui.bootstrap'
		])
	.controller('ExercisesCtrl', ExercisesController)
	.config(ExercisesConfig)

	//@ngInject
	function ExercisesController($q, ExercisesRepository, $rootScope, $scope){
		var s = this;
		var exercises = ExercisesRepository.getAllExercises();
		exercises.$loaded(function(_exercisesList){
			s.list = _exercisesList;
		});

		// exercises.$watch(function(_exercisesList){
		// 	s.list = _exercisesList;
		// });

		s.newExercise = {
			name: "",
			target: ""
		};

		s.addExercise = function(){
			ExercisesRepository.addNewExercise(s.newExercise)
				.then(function(ref){
					$rootScope.addAlert('success', "Упражнение успешно добавлено"); 
				});
			s.newExercise = {
				name: "",
				target: ""
			};
		}

		s.removeExercise = function(_$id){
			ExercisesRepository
				.removeExercise(_$id)
				.then(function(){
					console.log(arguments);
					$rootScope.addAlert('success', 'Пользователь успешно удален');
				});
		}

		//pagination
		s.currentPage = 1;
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