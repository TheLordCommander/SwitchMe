angular.module('adminCtrl', [])
	.controller('adminCtrl', ['$rootScope','$scope','$http','signupService','$location', function($rootScope,$scope, $http, signupService,$location) {
		
		$scope.groups = ['Group 1', 'Group 2', 'Group 3','Group 4'];
		$scope.locations = ['CDC','S B Road'];
		$scope.adminTrue = $rootScope.admin;
		$scope.getDetails = function() {
			signupService.fetchDetails().success(function(data) {
				var currentDetail = data[data.length-1];
				var currentDetObj={};
				currentDetObj.currGroup = currentDetail.group;
				currentDetObj.currDate = new Date(currentDetail.dateOf).toDateString();
				currentDetObj.currLocation = currentDetail.location;
				$rootScope.currDetails = currentDetObj;
				$scope.findNextGroup(currentDetail.group);
				$rootScope.$broadcast('groupChange');
			});
		}
		$scope.applyAdmin = function() {
			var interviewData = {
				group: this.currGroup,
				location : this.currLocation,
				dateOf	 :this.currDate
			};
			signupService.updateDetails(interviewData).success(function(data) {
				$scope.updateResult = data;
				$scope.getDetails();
			});
		};
		$scope.findNextGroup = function(currGroup) {
			var currIdx = $scope.groups.indexOf(currGroup);
			var nextIdx;
			if(currIdx == $scope.groups.length-1)
				nextIdx = 0;
			else
				nextIdx = currIdx+1;
			$rootScope.nextGroup = $scope.groups[nextIdx];
		}
		$scope.getDetails();
	}]);