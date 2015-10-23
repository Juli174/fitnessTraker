;(function(){
	'use strict';

	angular.module('Fitness', [
		'ui.router',
		'Fitness.Fire',
		'Fitness.Exercises',
		'Fitness.Home'
		])
	.constant('FIREBASE_URL', 'https://yuliyafitnesstracker.firebaseio.com/')
	.config(Config)
	.controller('MainCtrl', MainController)
	.run(Run)

	//@ngInject
	function Config($urlRouterProvider){
		$urlRouterProvider
			.otherwise('/home');
	}

	//@ngInject
	function MainController($log, $scope){
		$scope.hello = 'hello';
	}

	//@ngInject
	function Run($rootScope){
		$rootScope.alerts = [];

		$rootScope.addAlert = function(_type, _msg) {
			_type = _type || "warning";
		    $rootScope.alerts.push({type: _type, msg: _msg});
		  };

		$rootScope.closeAlert = function(index) {
		    $rootScope.alerts.splice(index, 1);
		  };
	}
})();
;(function(){
	'use strict';

	angular.module('Fitness.Exercises', [
		 'Fitness.Exercises.Repository'
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

	function ExercisesRepositoryFactory(dbc, $firebaseArray, $firebaseObject){
		var o = {};

		o.getAllExercises = function(){
			var ref = dbc.getRef();

			return $firebaseArray(ref.child('exercises'));

		}

		o.addNewExercise = function(_exercise){
			if(_exercise && _exercise.name && _exercise.name.length > 0){
				var ref = dbc.getRef();
				var exercisesList = $firebaseArray(ref.child('exercises'));
				return exercisesList.$add(_exercise);
			}
			return false;
		}

		o.removeExercise = function(_$id){
			if(_$id){
				var ref = dbc.getRef();
				//var exercisesList = $firebaseArray(ref.child('exercise'));
				//return exercisesList.$remove(_$id);
				var exercisesList = $firebaseObject(ref.child('exercises').child(_$id));
				return exercisesList.$remove();
			}
		}

		return o;
	}
})();