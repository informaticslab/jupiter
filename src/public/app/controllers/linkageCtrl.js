angular.module('apolloApp').controller('linkageCtrl', function($scope, $routeParams){
    $scope.nodeId = $routeParams.id;
});