angular.module('app', ['ngResource','ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {templateUrl: '/partials/main', controller:'mainCtrl'});
    $routeProvider.when('/faq', {templateUrl: '/partials/faq', controller:'faqCtrl'});
});