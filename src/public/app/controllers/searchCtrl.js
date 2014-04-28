angular.module('apolloApp').controller('searchCtrl', function($scope, $resource, $http, $routeParams) {
	$scope.$parent.q = 'explore';
	$scope.contentLoading = true;
    var nodes = $resource('/apollo/api/node/search/:query', {
        query: '@query'
    },{'query': {isArray: false }});

    $scope.hadSearchResults = true;

    var searchResult = nodes.query({
        query: $routeParams.query
    },function(result){
        if (result.nullset)
        {
            $scope.hadSearchResults = false;
        }
        $scope.contentLoading = false;
        $scope.labelCounts = result.nodeLabelCounts;
        $scope.nodes = result.nodedataarr;
    });
    
    $scope.search=[];
    $scope.queryString = $routeParams.query;
    if($routeParams.query == null || $routeParams.query == '')
    {
        $scope.hasSearchValue= false;
    }
    else
    {
        $scope.hasSearchValue= true;
    }

});