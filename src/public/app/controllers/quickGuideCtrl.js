angular.module('apolloApp').controller('quickGuideCtrl', function($scope, $location, $anchorScroll, $routeParams){
    $scope.$parent.q = 'explore';

//function for scrolling to the top
    $scope.goToTop = function(){
    	$anchorScroll();
    }

    $scope.goToSection = function(anchorId){
    	$location.hash(anchorId);
    	$anchorScroll();
    }
});

function goBack()
{
  window.history.back();
}
