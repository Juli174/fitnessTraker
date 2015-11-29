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