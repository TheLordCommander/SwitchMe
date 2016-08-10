angular.module('signupCtrl', [])

	// inject the Todo service factory into our controller
	.controller('signupCtrl', ['$rootScope','$scope','$http','signupService','$location', function($rootScope,$scope, $http, signupService,$location) {
		

		$scope.signup = function() {
			var signupData = {
				username : this.username,
				password : this.password,
				email:this.email
			};
			signupService.signupUser(signupData).success(function(data) {
				var result = data;
				if(result == "success"){
					$location.path('/home');
					$rootScope.$broadcast('userValidated',signupData.username);
				}
				else
					$scope.signupResult = result;
			});
		};

		
	}]);