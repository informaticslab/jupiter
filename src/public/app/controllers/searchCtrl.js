angular.module('apolloApp').controller('searchCtrl', function($scope, $resource, $http, $routeParams) {
    var node = $resource('/apollo/api/node/search/:query', {
        query: '@query'
    });

    // // var labels = $http.get('/apollo/api/node/' + $routeParams.id + '/labels')
    // //     .success(function(data){
    // //         $scope.labels = data;
    // //     });

    // // var relations = $resource('/apollo/api/node/:id/relations', {
    // //     id: '@id'
    // // });

    $scope.node = node.get({
        query: $routeParams.query
    });
    $scope.queryString = $routeParams.query;
    // $scope.relations = relations.query({
    //     id: $routeParams.id
    // });
});