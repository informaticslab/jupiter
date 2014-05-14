angular.module('apolloApp').controller('searchCtrl', function($scope, $resource, $http, $routeParams, $timeout) {
	
    $scope.$parent.q = 'explore';
	$scope.contentLoading = true;
    $scope.hadSearchResults = true;
    $scope.search=[];
    $scope.queryString = $routeParams.query;


    var searchTimeout =  $timeout(function(){ 
        throw new Error('Search Timeout');
        }, 10000);
    var nodes = $resource('/apollo/api/node/search/:query', {
        query: '@query'
    },{'query': {isArray: false }});

    var searchResult = nodes.query({
        query: $routeParams.query
    },function(result){
        $timeout.cancel(searchTimeout);
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
        $timeout.cancel(searchTimeout);
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
    searchTimeout.catch( function(err){
            if(err != 'canceled')
            {
                alert('The search timed out, please try again');
            }
        });
});