angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate']);
angular.module('app').config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true)
    .hashPrefix('!');
    $routeProvider.when('/apollo/', {
        templateUrl: '/apollo/partials/main',
        controller: 'mainCtrl'
    }).when('/apollo/faq', {
        templateUrl: '/apollo/partials/faq',
        controller: 'faqCtrl'
    }).when('/apollo/node/:id', {
        templateUrl: '/apollo/partials/node',
        controller: 'nodeCtrl'
    }).otherwise({
        templateUrl: '/apollo/partials/404'
    });
});