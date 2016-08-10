angular.module('adminCtrl', [])
	.controller('adminCtrl', ['$rootScope','$scope','$http','signupService','$location', function($rootScope,$scope, $http, signupService,$location) {
		
		$scope.groups = ['Group 1', 'Group 2', 'Group 3','Group 4'];
		$scope.locations = ['CDC','S B Road'];
		$scope.applyAdmin = function() {
			var interviewData = {
				group: this.currGroup,
				location : this.currLocation,
				dateOf	 :this.currDate
			};
			signupService.updateDetails(interviewData).success(function(data) {
				$scope.updateResult = data;
			});
		};

	}]);