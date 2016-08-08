angular.module('signupCtrl', [])

	// inject the Todo service factory into our controller
	.controller('signupCtrl', ['$scope','$http','signupService','$location', function($scope, $http, signupService,$location) {
		

		$scope.signup = function() {
			var signupData = {
				username : this.username,
				password : this.password,
				email:this.email
			};
			signupService.signupUser(signupData).success(function(data) {
				if(JSON.parse(data)=="success")
					$scope.signupResult = "User created successfully";
				else
					$scope.signupResult = "Error creating user";
			});
		};

		
	}]);