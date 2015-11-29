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