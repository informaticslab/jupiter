angular.module('apolloApp').controller('rootCtrl', function($scope, $http){
    
    $scope.q = 'home';
    $scope.loginuser = 'guest';
    $scope.queryString = '';
    
    $http.get('build.json')
      .then(function(res){
      	
      	var build = res.data
         $scope.buildNumber = res.data.buildNumber;              
       });
    
    $scope.toCapitalizedWords  = function toCapitalizedWords(name) {
      //var words = name.match(/[A-Za-z][a-z]*/g);
      var words = name.match(/^[a-z]+|[A-Z][a-z]*/g);
      return words.map(capitalize).join(" ");
    };

    function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.substring(1);
    }

    $scope.redirectToSearch = function(){
       window.location =  '/apollo/#/search/' + $scope.queryString;
    };

    $scope.showSidebar = true;

    $scope.getSidebarWidth = function(){

       // returning the column width for the sidebar
       if ($scope.showSidebar == true) {
          return 'col-lg-1 col-md-1 col-sm-1';
       }
       else if ($scope.showSidebar == false) {
         return 'col-lg-2 col-md-2 col-sm-2';
       };

    }

    $scope.getContentWidth = function(){

       // returning the column width for the sidebar
       if ($scope.showSidebar == true) {
          return 'col-lg-11 col-md-11 col-sm-11';
       }
       else if ($scope.showSidebar == false) {
          return 'col-lg-10 col-md-10 col-sm-10';
       };
    }

    $scope.toggleSidebar = function(){
      $scope.showSidebar = !$scope.showSidebar;
    };
});