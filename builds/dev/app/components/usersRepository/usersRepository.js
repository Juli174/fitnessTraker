;(function(){
	'use strict';

	angular.module('Fitness.Exercises.Repository', [
		'Fitness.Fire'
		])
	.factory('ExercisesRepository', ExercisesRepositoryFactory)

	function ExercisesRepositoryFactory(dbc, $firebaseArray){
		var o = {};

		o.getAllExercises = function(){
			var ref = dbc.getRef();

			return $firebaseArray(ref.child('examples'));

		}

		o.addNewUser = function(_exercise){
			if(_exercise && _exercise.name && _exercise.name.length > 0){
				var exercisesList = $firebaseArray(ref.child('examples'));
				return exercisesList.$add(_exercise);
			}
			return false;
		}

		return o;
	}
})();