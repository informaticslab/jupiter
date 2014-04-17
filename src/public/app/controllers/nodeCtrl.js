angular.module('apolloApp').controller('nodeCtrl', function($scope, $resource, $http, $routeParams) {

    $scope.$parent.q = 'explore';
    
    var node = $resource('/apollo/api/node/:id', {
        id: '@id'
    });

    var labels = $http.get('/apollo/api/node/' + $routeParams.id + '/labels')
        .success(function(data){
            $scope.labels = data;
        });

    var relations = $resource('/apollo/api/node/:id/relations', {
        id: '@id'
    });

    $scope.node = node.get({
        id: $routeParams.id
    });

    $scope.relations = relations.query({
        id: $routeParams.id
    });

    $scope.nodeId = $routeParams.id
});