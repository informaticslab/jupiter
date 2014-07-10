angular.module('apolloApp').controller('inTheLabCtrl', function($scope, $routeParams, $resource, $location, $anchorScroll){
    // $scope.rayes = 'sunny';
    // $scope.$parent.q = 'explore';

   	// var site = {
    //   'name':'In The lab',
    //   'url':$location.absUrl()
    // }
    // $scope.$parent.browseHistory.sites.push(site);

    $scope.goToTop = function(){
    	$anchorScroll();
    }

    $scope.uvBlurb = encodeURIComponent($location.absUrl());

});