angular.module('apolloApp').controller('browseCtrl', function($scope, $location, $anchorScroll){
    $scope.$parent.q = 'explore';

    //function for scrolling to the top
    $scope.goToTop = function(){
    	$anchorScroll();
    }
	// var site = {
 //      'name':'Browse',
 //      'url':$location.absUrl()
 //    }
 //    $scope.$parent.unshiftSiteHistory(site);
});