angular.module('signupService', []).factory('signupService', 
	['$http',function($http) {
		return {
			loginUser : function(loginData) {
				return $http.post('/api/login',loginData);
			},
			signupUser : function(signupData) {
				return $http.post('/api/signup', signupData);
			}
		}
	}]);