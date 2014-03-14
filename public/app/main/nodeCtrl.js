angular.module('app').controller('nodeCtrl', function($scope, nodeService){
    $scope.nodes = nodeService.getNodes();
});