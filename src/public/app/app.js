var jupiterApp = angular.module('jupiterApp', [
  'ngRoute'
  ,'ngResource'
  ,'ngAnimate'
  ,'ngSanitize'
  ,'LocalStorageModule'
  ,'ui.bootstrap'
  ,'chieffancypants.loadingBar'
  ,'angulartics'
  ,'angulartics.google.analytics'
  ,'angularFileUpload'
  ,'ui.grid'
  ,'ui.grid.autoResize'
  ,'ui.grid.selection'
  ,'ui.grid.exporter'
  ,'ngCsv'
  ,'ui.grid.resizeColumns'
  //'jupiterAppAnimations',
 // 'jupiterAppControllers',
 // 'jupiterAppFilters',
//  'jupiterAppServices'
]);

var routeRoleChecks = {
  levelThree:{auth: function(ngAuth){
            return ngAuth.authorizeCurrentUserForRoute('levelThree')
          }},
  levelTwo:{auth:function(ngAuth){
    return ngAuth.authorizeCurrentUserForRoute('levelTwo')
          }},
  levelOne:{auth:function(ngAuth){
    return ngAuth.authorizeCurrentUserForRoute('levelOne')
          }},
  levelTwoOrThree:{auth:function(ngAuth){
    return ngAuth.authorizeCurrentUserForRoute('levelTwoOrThree')
  }}     
};


//to prevent IE caching
jupiterApp.config([
    '$httpProvider', function ($httpProvider) {
        // Initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // Enables Request.IsAjaxRequest() in ASP.NET MVC
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    }
])
jupiterApp.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
          when('/faq', {
        templateUrl: 'partials/faq',
        controller: 'faqCtrl'
      }).
          when('/login', {
        redirectTo: function (routeParams, path, search) {
        return "/faq" ;
      }
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
      //     when('/template/', {
      //   templateUrl: 'partials/template'
      //   //controller: 'linkageCtrl'
      // }).
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
          when('/data', {
        templateUrl: 'partials/upload',
        controller: 'uploadCtrl'
      }).
          when('/adminCRAdd', {
        templateUrl: 'partials/adminCRAdd',
        controller: 'adminCRAddCtrl',
        resolve: routeRoleChecks.levelThree
      }).
          when('/adminCRRapidEntry', {
        templateUrl: 'partials/adminCRRapidEntry',
        controller: 'adminCRRapidEntryCtrl',
        resolve: routeRoleChecks.levelThree
      }).
          when('/adminCRRapidEntry/:id', {
        templateUrl: 'partials/adminCRRapidEntry',
        controller: 'adminCRRapidEntryCtrl',
        resolve: routeRoleChecks.levelThree
      }).
          when('/adminCREdit', {
        templateUrl: 'partials/admin',
        controller: 'adminCtrl',
        resolve: routeRoleChecks.levelThree
      }).
          when('/adminCREdit/:id', {
        templateUrl: 'partials/admin',
        controller: 'adminCtrl',
        resolve: routeRoleChecks.levelThree
      }).
          when('/adminCRQueue', {
        templateUrl: 'partials/adminCRQueue',
        controller: 'adminCRQueueCtrl',
        resolve: routeRoleChecks.levelTwoOrThree
      }).
          when('/adminCRQueue/CRDiff/:id', {
        templateUrl: 'partials/adminCRDiff',
        controller: 'adminCRDiffCtrl',
        resolve: routeRoleChecks.levelTwoOrThree
      }).
          when('/adminRights', {
        templateUrl: 'partials/adminRights',
        controller: 'adminRightsCtrl',
        resolve: routeRoleChecks.levelOne
      }).
          when('/signup',{
          templateUrl: 'partials/signup',
          controller: 'signupCtrl',
          resolve:routeRoleChecks.levelOne
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
          when('/dataMatch', {
          templateUrl:'partials/inTheLab/dataMatch',
          controller: 'dataMatchCtrl'
      }).
          when('/dataMatch1', {
          templateUrl:'partials/inTheLab/dataMatch1',
          controller: 'dataMatch1Ctrl'
      }).
          when('/dataMatch2', {
          templateUrl:'partials/inTheLab/dataMatch2',
          controller: 'dataMatch2Ctrl'
      }).
          when('/dataMatch3', {
          templateUrl:'partials/inTheLab/dataMatch3',
          controller: 'dataMatch3Ctrl'
      }).
          when('/sankey/', {
        templateUrl: 'partials/inTheLab/inTheLabSankey',
        controller: 'sankeyCtrl'
      }).
         when('/sankey2/:id', {
        templateUrl: 'partials/inTheLab/inTheLabSankey2',
        controller: 'sankey2Ctrl'
      }).
         when('/sankey2/', {
        templateUrl: 'partials/inTheLab/inTheLabSankey2',
        controller: 'sankey2Ctrl'
      }).
        otherwise({
        redirectTo: '/main'
      });
  }]);

  

angular.module('jupiterApp').run(function($rootScope,$location) {
  $rootScope.$on('$routeChangeError', function(evt,current, previous,rejection) {
    if(rejection === 'not authorized'){
      $location.path('/main');
    }
  }) 
})

// angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate']);
// jupiterApp.config([function($routeProvider, $locationProvider) {

//     $locationProvider.html5Mode(true);
//     $routeProvider.when('/', {
//         templateUrl: '/partials/main',
//         controller: 'mainCtrl'
//     }).when('/faq', {
//         templateUrl: '/partials/faq',
//         controller: 'faqCtrl'
//     }).when('/node/:id', {
//         templateUrl: '/partials/node',
//         controller: 'nodeCtrl'
//     }).otherwise({
//         templateUrl: '/partials/404'
//     });
// }]);