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