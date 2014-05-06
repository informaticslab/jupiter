angular.module('apolloApp').controller('quickGuideCtrl', function($scope, $location, $anchorScroll){
    $scope.$parent.q = 'explore';

//function for scrolling to the top
    $scope.goToTop = function(){
    	$anchorScroll();
    }
});

function goBack()
{
  window.history.back();
}
