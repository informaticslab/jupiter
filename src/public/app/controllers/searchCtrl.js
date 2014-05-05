angular.module('apolloApp').controller('searchCtrl', function($scope, $resource, $http, $routeParams) {
	
    $scope.$parent.q = 'explore';
	$scope.contentLoading = true;
    $scope.hadSearchResults = true;
    $scope.search=[];
    $scope.queryString = $routeParams.query;

    var nodes = $resource('/apollo/api/node/search/:query', {
        query: '@query'
    },{'query': {isArray: false }});

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
        
    if($routeParams.query == null || $routeParams.query == '')
    {
        $scope.hasSearchValue= false;
    }
    else
    {
        $scope.hasSearchValue= true;
    }

    $scope.redirectToSearch = function(){
       window.location =  '/apollo/#/search/' + $scope.queryString;
    };

    $scope.checkedLabels = {Program:false,SurveillanceSystem:false,Registry:false,
                            HealthSurvey:false,Tool:false,Dataset:false,DataStandard:false,
                            Collaborative:false,Organization:false,Tag:false};
});