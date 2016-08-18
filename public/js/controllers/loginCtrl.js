angular.module('loginCtrl', [])

	// inject the Todo service factory into our controller
	.controller('loginCtrl', ['$rootScope','$scope','$http','signupService','$location', function($rootScope,$scope, $http, signupService,$location) {
		
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
					if (data[0].username == 'nikita') {
						$rootScope.admin = true; 
					}
					$location.path('/home');
					$scope.validLogin = true;
					$rootScope.userDetails = data[0];
					$scope.username = loginData.username;
				}
			});
		};

		
	}]);