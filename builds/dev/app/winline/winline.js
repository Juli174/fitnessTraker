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

		$scope.comment = true;
		//обратный отсчет
		$scope.press = function(){
			$scope.comment = false;
			var count = 10;
			$scope.count = count;
			var seconds = setInterval(function(){
				count--;
				document.getElementById("count").innerText = count;
				console.log(count);
				if(count == 0)
				clearInterval(seconds);
			}, 1000);


		}

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