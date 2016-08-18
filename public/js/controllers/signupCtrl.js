angular.module('signupCtrl', [])

	// inject the Todo service factory into our controller
	.controller('signupCtrl', ['$rootScope','$scope','$http','signupService','$location', function($rootScope,$scope, $http, signupService,$location) {

		$scope.signup = function() {
			var signupData = {
				username : this.username,
				password : this.password,
				email:this.email,
				associateid : this.associateid
			};
			signupService.signupUser(signupData).success(function(data) {
				var result = data;
				if(result == "success"){
					$location.path('/home');
					$rootScope.$broadcast('userValidated',signupData.username);
					$rootScope.userDetails = signupData;
				}
				else
					$scope.signupResult = result;
			});
		};

		
	}]);