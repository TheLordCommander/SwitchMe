  angular.module('appRoute', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
            templateUrl: 'views/login.html',
            controller: 'signupCtrl'
        })

        .when('/home', {
            templateUrl: 'views/home.html'/*,
            controller: 'adminCtrl'*/
        });

    $locationProvider.html5Mode(true);

}]);