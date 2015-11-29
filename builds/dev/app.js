;(function(){
	'use strict';

	angular.module('Fitness', [
		'ui.router',
		'Fitness.Fire',
		'Fitness.Exercises',
		'Fitness.Auth',
		'Fitness.Navbar',
		'Fitness.Home',
		'winline.openAccount'
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
;(function(){
	'use strict';

	angular.module('Fitness.Home', [

		])
	.controller('HomeCtrl', HomeController)
	.config(HomeConfig)

	function HomeController(Authentification, $state){
		Authentification.getAuth();
		var s = this;

		s.createUser = {
			email: null,
			password: null
		};

		s.user = {
			email: null,
			password: null
		};

		s.addUser = function(_user){
			console.log(_user);
			Authentification.createUser(_user);
		};

		s.loginUser = function(_user){
			Authentification.authObj(_user)
				.then(function(authData) {
				  //console.log("Logged in as:", authData.uid);
				  s.userLogin = "Logged in as:" + authData.uid;
				  s.error = false;
				  $state.go('exercises');
				  //Authentification.getAuth();
				}).catch(function(error) {
				  //console.error("Authentication failed:", error);
				  s.userLogin = "Authentication failed:" + error;
				  s.error = true;
				});
		}
	}

	function HomeConfig($stateProvider){
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'app/home/index.html',
			controller: 'HomeCtrl',
			controllerAs: 'hc'
		});
	}
})();
;(function(){
	'use strict';

	angular.module('Fitness.Auth', [
		'Fitness.Fire'
		])
		.factory('Authentification', AuthentificationFactory)

	//@ngInject
	function AuthentificationFactory(dbc, $firebaseAuth, $rootScope){
		var o = {};

		var auth = $firebaseAuth(dbc.getRef());

		o.authObj = function(_user){
			return auth.$authWithPassword(_user);
		};

		o.getAuth = function(){
			var authData = auth.$getAuth();
			if (authData) {
			  console.log("Logged in as:", authData.uid);
			  $rootScope.isUserLogged = true;
			} else {
			  console.log("Logged out");
			  $rootScope.isUserLogged = false;
			}
		};

		o.onAuth = function(){
			auth.$onAuth(function(authData) {
			  if (authData) {
			    console.log("Logged in as:", authData.uid);
			    auth.$unauth();
			  } else {
			    console.log("Logged out");
			    
			  }
			  o.getAuth();
			});
		};

		o.createUser = function(newUser){
			auth.$createUser(newUser)
			.then(function(userData) {
			  console.log("User " + userData.uid + " created successfully!");

			  return auth.$authWithPassword(newUser);
			}).then(function(authData) {
			  console.log("Logged in as:", authData.uid);
			}).catch(function(error) {
			  console.error("Error: ", error);
			});
		};

		return o;
	}
})();
;(function(){
	'use strict';

	angular
		.module('Fitness.Navbar', [])
		.controller('NavbarCtrl', NavbarController)

		//@ngInject
		function NavbarController(Authentification){
			var s = this;

			s.logOut = function(){
				Authentification.onAuth();
				Authentification.getAuth();
			}
		}
})();
;(function(){
	'use strict';

	angular.module('winline.openAccount', [])
		.controller('OpenAccountController', OpenAccountController)
		.config(WinlineConfig)

	//@ngInject
	function OpenAccountController($scope, $rootScope, OpenAccountOneService){
		/*
		* переключение вкладок шагов 
		*/
		var steps = [
			{number: 0, url: 'app/winline/steps/step1/step1.html'},
			{number: 1, url: 'app/winline/steps/step2/step2.html'},
			{number: 2, url: 'app/winline/steps/step3/step3.html'}
		];
		$scope.step = steps[0];

		/*
		* комментарии к полям заполнения
		*/
		var comments = [
			{number: 0, url: 'app/winline/comments/comment1.html'},
			{number: 1, url: 'app/winline/comments/comment2.html'},
			{number: 2, url: 'app/winline/comments/comment3.html'},
		];
		$scope.comment = comments[0];

		//перейти к предыдущему шагу
		$scope.previousStep = function(){
			var current = $scope.step.number;
			if(current > 0){
				$scope.step = steps[current - 1];
				$scope.comment = comments[current - 1];
			}

		};

		//перейти к следующему шагу
		$scope.nextStep = function(){
			var current = $scope.step.number;
			if(!OpenAccountOneService.getErrorInfo()){
				$scope.step = steps[current];
				$rootScope.$broadcast('Error', 'error 1');
				return;
			}
			if(current < steps.length - 1){
				$scope.step = steps[current + 1];
				$scope.comment = comments[current + 1];
			}
				
		};
	}

	//@ngInject
	function WinlineConfig($stateProvider){
		$stateProvider
		.state('winline', {
			url: '/winline',
			templateUrl: 'app/winline/index.html',
			controller: 'OpenAccountController',
			controllerAs: 'oac'
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
;(function(){
	'use strict';

	var stepOne = angular.module('winline.openAccount');

	stepOne.controller('OpenAccountStepOneController', ['$scope', '$rootScope', 'OpenAccountOneService', function($scope, $rootScope, OpenAccountOneService){
		//дни
		var days = [];
		for (var i = 1; i <= 31; i++){
			days.push(i);
		}
		$scope.days = days;

		//месяцы
		$scope.months = [
			'январь',
			'февраль',
			'март',
			'апрель',
			'май',
			'июнь',
			'июль',
			'август',
			'сентябрь',
			'октябрь',
			'ноябрь',
			'декабрь'
		];

		//годы
		var years = [];
		var currentDate = new Date();
		var lastYear = currentDate.getFullYear() - 18;
		for(var i = 1920; i <= lastYear; i++){
			years.push(i);
		}
		$scope.years = years;

		//страны - по видимому будут грузиться из админки, пока делаю заглушку
		$scope.countries = [
			'Россия',
			'Украина',
			'Беларусь',
			'Казахстан',
			'Азербайджан',
			'Армения',
			'Грузия',
			'Кыргызстан',
			'Латвия',
			'Литва',
			'Молдова',
			'Таджикистан'
		];

		//регулярное выражение - вводить только буквы
		var regLetters = new RegExp(/^[a-zа-яё]+$/i);
		//регулярное выражение - вводить только цифры
		var regNumbers = new RegExp(/^[0-9]+$/)

		$scope.$watch('surname', function(){
			var surname = $scope.surname;
			if(surname && !regLetters.test(surname)){
				$scope.surname = surname.substring(0, surname.length - 1);
			}
			OpenAccountOneService.setSurname($scope.surname);
		});

		$scope.$watch('name', function(){
			var name = $scope.name;
			if(name && !regLetters.test(name)){
				$scope.name = name.substring(0, name.length - 1);
			}
			OpenAccountOneService.setName($scope.name);
		});

		$scope.$watch('phone', function(){
			var phone = $scope.phone;
			if(phone && !regNumbers.test(phone)){
				$scope.phone = phone.substring(0, phone.length - 1);
			}
			OpenAccountOneService.setPhone($scope.phone);
		});

		$rootScope.$on('Error', function(event, data){
			console.log(data);
		})

	}]);		
})();
;(function(){
	'use strict';

	var stepOneService = angular.module('winline.openAccount');

	stepOneService.service('OpenAccountOneService', function(){
		var user = {
			surname : null,
			name: null,
			day: null,
			month: null,
			year: null,
			country: null,
			phone: null
		};

		function setPhone(phone){
			if(!phone || phone == "")
				user.phone = null;
			else
				user.phone = phone;
		}

		function setSurname(surname){
			if(!surname || surname == "")
				user.surname = null;
			else
				user.surname = surname;
		}

		function setName(name){
			if(!name || name == "")
				user.name = null;
			else
				user.name = name;
		}

		function getErrorInfo(){
			if(!user.surname)
				return false;
			return true;
		}

		function getUserInfo(){
			return user;
		}

		return{
			getUserInfo: getUserInfo,
			getErrorInfo: getErrorInfo,
			//функции записи данных
			setPhone: setPhone,
			setSurname: setSurname,
			setName: setName
		}
	});
})();