angular.module('app').controller('nodeCtrl', function($scope, $resource, $routeParams) {
    var node = $resource('/api/node/:id', {
        id: '@id'
    });

    var labels = $resource('/api/node/:id/labels', {
        id: '@id'
    });

    var relations = $resource('/api/node/:id/relations', {
        id: '@id'
    });

    $scope.node = node.get({
        id: $routeParams.id
    });

    $scope.labels = labels.get({
        id: $routeParams.id
    })

    $scope.relations = relations.get({
        id: $routeParams.id
    })
});