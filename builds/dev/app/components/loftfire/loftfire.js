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