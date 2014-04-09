var apolloApp = angular.module('apolloApp', [
  'ngRoute'
  ,'ngResource'
  ,'ngAnimate'
  ,'ui.bootstrap'
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
        controller: 'faqCtrl'
      }).
          when('/main', {
        templateUrl: 'partials/main',
        controller: 'mainCtrl'
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