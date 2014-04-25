angular.module('apolloApp').controller('searchCtrl', function($scope, $resource, $http, $routeParams) {
	$scope.$parent.q = 'explore';
	$scope.contentLoading = true;
    var nodes = $resource('/apollo/api/node/search/:query', {
        query: '@query'
    },{'query': {isArray: false }});

    var searchResult = nodes.query({
        query: $routeParams.query
    },function(result){
        $scope.contentLoading = false;
        $scope.labelCounts = result.nodeLabelCounts;
        $scope.nodes = result.nodedataarr;
        // console.log(result)
        // console.log($scope.nodes)
        // console.log($scope.labelCounts)
    });
    
    $scope.search=[];
    $scope.queryString = $routeParams.query;

});