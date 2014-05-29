angular.module('apolloApp').controller('rootCtrl', function($scope, $http, $location){
    
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
    $scope.twitterRootBlurb = encodeURIComponent($location.absUrl());

    
    // FACEBOOK CONNECT
    $scope.facebook_appID = '';
    $scope.facebook_link = '';
    window.fbAsyncInit = function() {
      
      if(window.location.hostname == 'localhost'){
        $scope.facebook_appID = '236193566580095';
        $scope.facebook_link = 'http://www.localhost:8089';
      }
      else if(window.location.hostname == 'edemo.phiresearchlab.org'){
        $scope.facebook_appID = '293314017511951';
        $scope.facebook_link = 'http://www.edemo.phiresearchlab.org';
      }
      else if(window.location.hostname == 'cloudev.phiresearchlab.org'){
        $scope.facebook_appID = '507747656017817';
        $scope.facebook_link = 'http://www.cloudev.phiresearchlab.org';
      }

      FB.init({appId: $scope.facebook_appID, status: true, cookie: true,
      xfbml: true});
    };
    
    (function() {
      var e = document.createElement('script'); e.async = true;
      e.src = document.location.protocol +
      '//connect.facebook.net/en_US/all.js';
      document.getElementById('fb-root').appendChild(e);
    }());

    //START Facebook Share
    $scope.post = {id:1,title:"Integrated Surveillance Sharing on Facebook",content:"content1",caption:"Integrated Surveillance"};
    $scope.share = function(){
      FB.ui(
      {
          method: 'feed',
          name: 'Name: Integrated Surveillance',
          link: $scope.facebook_link,
          picture: '',
          caption: $scope.post.caption,
          description: 'This is the content of the "description" field, below the caption.',
          message: ''
      });
  }
  //END Facebook Share

});