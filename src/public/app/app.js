var apolloApp = angular.module('apolloApp', [
  'ngRoute'
  ,'ngResource'
  ,'ngAnimate'
  ,'ngSanitize'
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

var routeRoleChecks = {
  admin:{auth: function(ngAuth){
            return ngAuth.authorizeCurrentUserForRoute('admin')
          }},
  su:{auth:function(ngAuth){
    return ngAuth.authorizeCurrentUserForRoute('su')
          }}
};

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
          when('/query', {
        templateUrl: 'partials/query',
        controller: 'queryCtrl'
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
          when('/adminCRAdd', {
        templateUrl: 'partials/adminCRAdd',
        controller: 'adminCRAddCtrl',
        resolve: routeRoleChecks.admin
      }).
          when('/adminCREdit', {
        templateUrl: 'partials/admin',
        controller: 'adminCtrl',
        resolve: routeRoleChecks.admin
      }).
          when('/adminCREdit/:id', {
        templateUrl: 'partials/admin',
        controller: 'adminCtrl',
        resolve: routeRoleChecks.admin
      }).
          when('/adminCRQueue', {
        templateUrl: 'partials/adminCRQueue',
        controller: 'adminCRQueueCtrl',
        resolve: routeRoleChecks.admin
      }).
          when('/adminCRQueue/CRDiff/:id', {
        templateUrl: 'partials/adminCRDiff',
        controller: 'adminCRDiffCtrl',
        resolve: routeRoleChecks.admin
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

  

angular.module('apolloApp').run(function($rootScope,$location) {
  $rootScope.$on('$routeChangeError', function(evt,current, previous,rejection) {
    if(rejection === 'not authorized'){
      $location.path('/main');
    }
  }) 
})

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