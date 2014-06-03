angular.module('apolloApp').controller('quickGuideCtrl', function($scope, $location, $anchorScroll, $routeParams){
    $scope.$parent.q = 'explore';

	//function for scrolling to the top
    // $scope.goToTop = function(){
    // 	$anchorScroll();
    // }

    $scope.goToSection = function(anchorId){
    	
    	$location.hash(anchorId);
    	$anchorScroll();
    }
    
    $scope.twitterBlurb = encodeURIComponent($location.absUrl());
    var site = {
  'name':'Quick Guide: ' + $scope.queryString,
  'url':$location.absUrl()
}
$scope.$parent.browseHistory.sites.push(site);
});

function goBack()
{
  window.history.back();
}




