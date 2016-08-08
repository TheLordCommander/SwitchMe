  angular.module('appRoute', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })

        .when('/home', {
            templateUrl: 'views/home.html'/*,
            controller: 'homeCtrl'*/
        });

    $locationProvider.html5Mode(true);

}]);