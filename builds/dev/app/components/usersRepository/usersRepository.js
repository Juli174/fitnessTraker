;(function(){
	'use strict';

	angular.module('Fitness.Exercises.Repository', [
		'Fitness.Fire'
		])
	.factory('ExercisesRepository', ExercisesRepositoryFactory)

	function ExercisesRepositoryFactory(dbc, $firebaseArray, $firebaseObject){
		var o = {};

		o.getAllExercises = function(){
			var ref = dbc.getRef();

			return $firebaseArray(ref.child('exercise'));

		}

		o.addNewExercise = function(_exercise){
			if(_exercise && _exercise.name && _exercise.name.length > 0){
				var ref = dbc.getRef();
				var exercisesList = $firebaseArray(ref.child('exercise'));
				return exercisesList.$add(_exercise);
			}
			return false;
		}

		o.removeExercise = function(_$id){
			if(_$id){
				var ref = dbc.getRef();
				//var exercisesList = $firebaseArray(ref.child('exercise'));
				//return exercisesList.$remove(_$id);
				var exercisesList = $firebaseObject(ref.child('exercise').child(_$id));
				return exercisesList.$remove();
			}
		}

		return o;
	}
})();