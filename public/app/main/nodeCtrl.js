angular.module('app').controller('nodeCtrl', function($scope, nodeService, $routeParams){
    console.log('The routeparams id is: ', $routeParams.id)
    nodeService.get($routeParams.id).then(function(data){
        $scope.node = data
    });
    console.log(nodeService.get($routeParams.id));
});