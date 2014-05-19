angular.module('apolloApp').controller('quickGuideCtrl', function($scope, $location, $anchorScroll, $routeParams){
    $scope.$parent.q = 'explore';

//function for scrolling to the top
    $scope.goToTop = function(){
    	$anchorScroll();
    }

    $scope.goToSection = function(anchorId){
    	//scroll to overview
        // location.hash(anchorId);
        // if (window.location.hash)
        //     window.location = window.location.hash;
        
        $window.location.hash(anchorId);
    	$anchorScroll();
    }
});

function goBack()
{
  window.history.back();
}
