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