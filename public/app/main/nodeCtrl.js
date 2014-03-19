angular.module('app').controller('nodeCtrl', function($scope, $resource, $routeParams) {
    var Node = $resource('/api/node/:id', {
        id: '@id'
    });
    $scope.node = Node.get({
        id: $routeParams.id
    })
});