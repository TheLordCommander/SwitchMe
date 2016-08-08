angular.module('loginCtrl', [])

	// inject the Todo service factory into our controller
	.controller('loginCtrl', ['$scope','$http','signupService','$location', function($scope, $http, signupService,$location) {
		

		$scope.login = function() {
			var loginData = {
				username : this.username,
				password : this.password
			};
			signupService.loginUser(loginData).success(function(data) {
				if(data.length>0)
					$location.path('/home');
			});
		};

		
	}]);