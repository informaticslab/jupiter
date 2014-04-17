angular.module('apolloApp').controller('searchCtrl', function($scope, $resource, $http, $routeParams) {
	$scope.$parent.q = 'explore';
    var nodes = $resource('/apollo/api/node/search/:query', {
        query: '@query'
    });
    $scope.nodes = nodes.query({
        query: $routeParams.query
    });
    $scope.queryString = $routeParams.query;
});