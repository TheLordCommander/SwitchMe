angular.module('signupService', []).factory('signupService', 
	['$http',function($http) {
		return {
			loginUser : function(loginData) {
				return $http.post('/api/login',loginData);
			},
			signupUser : function(signupData) {
				return $http.post('/api/signup', signupData);
			},
			updateDetails : function(interviewData) {
				return $http.post('/api/updateDetails', interviewData);
			},
			fetchEmpList : function() {
				return $http.post('/api/fetchEmpList');
			},
			fetchDetails : function() {
				return $http.post('/api/getDetails');
			}

		}
	}]);