angular.module('jupiterApp').controller('browseCtrl', function($scope, $location, $anchorScroll){
    $scope.$parent.q = 'explore';

    //function for scrolling to the top
    $scope.goToTop = function(){
    	$anchorScroll();
    }
});