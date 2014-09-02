var apolloApp = angular.module('apolloApp', [
  'ngRoute'
  ,'ngResource'
  ,'ngAnimate'
  ,'LocalStorageModule'
  ,'ui.bootstrap'
  ,'chieffancypants.loadingBar'
  ,'angulartics'
  ,'angulartics.google.analytics'
  //'apolloAppAnimations',
 // 'apolloAppControllers',
 // 'apolloAppFilters',
//  'apolloAppServices'
]);

apolloApp.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
          when('/faq', {
        templateUrl: 'partials/faq',
        controller: 'mainCtrl'
      }).
          when('/dashboard', {
        templateUrl: 'partials/dashboard',
        controller: 'dashboardCtrl'
      }).
          when('/dashboard/:id', {
        templateUrl: 'partials/dashboard',
        controller: 'dashboardCtrl'
      }).
          when('/dashboarddetail', {
        templateUrl: 'partials/dashboarddetail',
        controller: 'dashboarddetailCtrl'
      }).
          when('/main', {
        templateUrl: 'partials/main',
        controller: 'mainCtrl'
      }).
          when('/quickGuide', {
        templateUrl: 'partials/quickGuide',
        controller: 'quickGuideCtrl'
      }).
          when('/quickGuide/:topic', { 
            templateUrl: function(params){
        return 'partials/quickGuide/' + params.topic
       },
        controller: 'quickGuideCtrl'
      }).
          when('/browse', {
        templateUrl: 'partials/browse',
        controller: 'browseCtrl'
      }).
          when('/node/:id', {
        templateUrl: 'partials/node',
        controller: 'nodeCtrl'
      }).
          when('/search/:query', {
        templateUrl: 'partials/search',
        controller: 'searchCtrl'
      }).
          when('/search/', {
        templateUrl: 'partials/search',
        controller: 'searchCtrl'
      }).
          when('/search/label/:query', {
        templateUrl: 'partials/search',
        controller: 'searchCtrl'
      }).
          when('/template/', {
        templateUrl: 'partials/template'
        //controller: 'linkageCtrl'
      }).
          when('/linkage/:id', {
        templateUrl: 'partials/linkage',
        controller: 'linkageCtrl'
      }).
          when('/advancedSearch/:id', {
        templateUrl: 'partials/advancedSearch',
        controller: 'advancedSearchCtrl'
      }).
          when('/advancedSearch/', {
        templateUrl: 'partials/advancedSearch',
        controller: 'advancedSearchCtrl'
      }).
          when('/inTheLab', {
        templateUrl: 'partials/inTheLab',
        controller: 'inTheLabCtrl'
      }).
          when('/sysTree/:id', {
        templateUrl: 'partials/sysTree',
        controller: 'sysTreeCtrl'
      }).
          when('/inTheLab/:topic', { 
            templateUrl: function(params){
          return 'partials/inTheLab/' + params.topic
          },
          controller: 'inTheLabCtrl'
      }).
          when('/inTheLab/:topic', { 
            templateUrl: function(params){
          return 'partials/inTheLab/' + params.topic
          },
          controller: 'inTheLabCtrl'
      }).
          when('/bottomNav/:topic', { 
            templateUrl: function(params){
          return 'partials/bottomNav/' + params.topic
          },
          controller: 'rootCtrl'
      }).
        otherwise({
        redirectTo: '/main'
      });
  }]);

// angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate']);
// apolloApp.config([function($routeProvider, $locationProvider) {

//     $locationProvider.html5Mode(true);
//     $routeProvider.when('/apollo/', {
//         templateUrl: '/apollo/partials/main',
//         controller: 'mainCtrl'
//     }).when('/apollo/faq', {
//         templateUrl: '/apollo/partials/faq',
//         controller: 'faqCtrl'
//     }).when('/apollo/node/:id', {
//         templateUrl: '/apollo/partials/node',
//         controller: 'nodeCtrl'
//     }).otherwise({
//         templateUrl: '/apollo/partials/404'
//     });
// }]);