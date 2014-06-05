angular.module('apolloApp').controller('advancedSearchCtrl', function($scope, $routeParams, $resource){
	$scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;
    

});