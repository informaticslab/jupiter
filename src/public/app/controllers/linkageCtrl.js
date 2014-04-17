angular.module('apolloApp').controller('linkageCtrl', function($scope, $routeParams){
	$scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;
});