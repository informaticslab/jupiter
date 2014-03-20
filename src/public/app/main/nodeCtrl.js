angular.module('app').controller('nodeCtrl', function($scope, $resource, $http, $routeParams) {
    var node = $resource('/api/node/:id', {
        id: '@id'
    });

    var labels = $http.get('/api/node/' + $routeParams.id + '/labels')
        .success(function(data){
            $scope.labels = data;
        });

    var relations = $resource('/api/node/:id/relations', {
        id: '@id'
    });

    $scope.node = node.get({
        id: $routeParams.id
    });

    $scope.relations = relations.query({
        id: $routeParams.id
    });
});