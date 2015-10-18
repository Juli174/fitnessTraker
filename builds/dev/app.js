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

;(function(){
	'use strict';

	angular.module('Fitness.Fire', [
		'firebase'
		])
	.factory('dbc', dbcFactory)

	//@ngInject
	function dbcFactory(FIREBASE_URL, $firebaseAuth){
		//$log.debug('dbc factory');
		var o = {};
		var reference = new Firebase(FIREBASE_URL);

		o.getRef = function(){
			return reference;
		}

		return o;
	}
})();
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

			return $firebaseArray(ref.child('users')).$loaded();

		}

		return o;
	}
})();