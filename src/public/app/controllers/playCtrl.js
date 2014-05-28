angular.module('apolloApp').controller('playCtrl', function($scope, $routeParams, $resource){
	$scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;

    //console.log("routeparams id",$routeParams.id)

    /*
    var node = $resource('/apollo/api/node/:id', {
        id: '@id'
    });

    $scope.node = node.get({
        id: $routeParams.id
    });
    */

    //$scope.leftnode = 55;
    

});