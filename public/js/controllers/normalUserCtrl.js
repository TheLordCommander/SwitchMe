angular.module('normalUserCtrl', [])
	.controller('normalUserCtrl', ['$rootScope','$scope','$http','signupService','$location', function($rootScope,$scope, $http, signupService,$location) {
		
		$scope.currentEmpList;
		$scope.nextEmpList;
		$scope.groupMapping = {
					"Group 1" : "G1",
					"Group 2" : "G2",
					"Group 3" : "G3",
					"Group 4" : "G4",
				};
		$scope.refreshGrids = function() {
			signupService.fetchEmpList().success(function(data) {
				
				var assoId = $rootScope.userDetails.associateid;
				$scope.currentEmpList = data.filter(function(rec) {
					return rec.egroup == $scope.groupMapping[$rootScope.currDetails.currGroup];
				});
				$scope.nextEmpList = data.filter(function(rec) {
					return rec.egroup == $scope.groupMapping[$rootScope.nextGroup];
				});
				var empDetails = data.filter(function(item){
					return item.eid == assoId;
				});
				$rootScope.userDetails['empDetails'] = empDetails[0];

			});
		}
		$scope.$on('groupChange',$scope.refreshGrids);
		$scope.switchMe = function() {
			var userDetail = $rootScope.userDetails;
			var dir='';
			if($scope.groupMapping[$rootScope.currDetails.currGroup] == userDetail.empDetails.egroup)
				dir = "next";
			else if($scope.groupMapping[$rootScope.nextGroup] == userDetail.empDetails.egroup)
				dir = "prev";
			else{
				alert('Wait for your group to be active');
				return false;
			}
			var switchDetail = {
				'associateid' : userDetail.associateid,
				'tstamp' : new Date().toISOString(),
				'direction':($sc)
			};
			signupService.updateSwitchInfo();
		}

	}]);