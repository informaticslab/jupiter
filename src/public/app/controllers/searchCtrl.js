angular.module('apolloApp').controller('searchCtrl', function($scope, $resource, $http, $routeParams) {
	$scope.$parent.q = 'explore';
	$scope.contentLoading = true;
    var nodes = $resource('/apollo/api/node/search/:query', {
        query: '@query'
    });

    $scope.nodes = nodes.query({
        query: $routeParams.query
    },function(){
        $scope.contentLoading = false;
    });

    $scope.queryString = $routeParams.query;

});