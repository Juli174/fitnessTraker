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