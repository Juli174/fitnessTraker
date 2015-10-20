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