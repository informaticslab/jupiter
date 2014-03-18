angular.module('app', ['ngResource', 'ngRoute']);
angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
        templateUrl: '/partials/main',
        controller: 'mainCtrl'
    }).when('/faq', {
        templateUrl: '/partials/faq',
        controller: 'faqCtrl'
    }).when('/node/:id', {
        templateUrl: '/partials/node',
        controller: 'nodeCtrl'
    });
});