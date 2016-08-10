angular.module('loginCtrl', [])

	// inject the Todo service factory into our controller
	.controller('loginCtrl', ['$scope','$http','signupService','$location', function($scope, $http, signupService,$location) {
		
		$scope.validLogin = false;
		$scope.$on('userValidated',function(eve,arg) {
			eve.currentScope.validLogin = true;
			eve.currentScope.username=arg;
		})
		$scope.login = function() {
			var loginData = {
				username : this.username,
				password : this.password
			};
			signupService.loginUser(loginData).success(function(data) {
				if(data.length>0){
					$location.path('/home');
					$scope.validLogin = true;
					$scope.username = loginData.username;
				}
			});
		};

		
	}]);