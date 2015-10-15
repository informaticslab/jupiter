angular.module('jupiterApp').controller('inTheLabCtrl', function($scope, $routeParams, $resource, $location, $anchorScroll){

    $scope.goToTop = function(){
    	$anchorScroll();
    }

    $scope.uvBlurb = encodeURIComponent($location.absUrl());
});