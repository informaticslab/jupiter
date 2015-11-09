angular.module('jupiterApp').controller('searchCtrl', function($scope, $resource, $http, $routeParams, $timeout, $filter, $location, $anchorScroll) {
	
    $scope.goToTop = function(){
        $anchorScroll();
    }
    $scope.$parent.q = 'explore';
	$scope.contentLoading = true;
    $scope.hadSearchResults = true;
    $scope.search=[];
    $scope.queryString = $routeParams.query;
    var currentURL = $location.path();


    var searchTimeout =  $timeout(function(){ 
        throw new Error('Search Timeout');
        }, 60000);

    var nodes;
    var pageName = '';
    if(currentURL.length >7 && currentURL.substring(0,14) == '/search/label/')
    {

        pageName = 'Label Search: ' + $routeParams.query;
        nodes = $resource('/api/node/search/label/:query', {
        query: '@query'
        },{'query': {isArray: false }});
        $scope.queryString = '';
    }
    else
    {
        if($routeParams.query != null)
        {
            pageName = 'Search: ' + $routeParams.query;
        }
        var nodes = $resource('/api/node/search/:query', {
        query: '@query'
    },{'query': {isArray: false }});
        
    }
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
        $scope.totalItems = result.nodedataarr.length;
        $scope.notAvailable = $scope.labelCounts.Total - ($scope.labelCounts.FutureDev + $scope.labelCounts.UnderDev + $scope.labelCounts.PartOperational + $scope.labelCounts.FullOperational + $scope.labelCounts.Retired);
        $filter('orderBy')($scope.totalItems, 'nodes.name');
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
       $location.path('/search/' + $scope.queryString);
    };

    $scope.itemSelected = function($item, $model, $label) {
        $location.path('/node/' + $item.id);
        $scope.queryString = null;
    };

    $scope.getNodes = function(val) {
        return $http.get('/api/node/searchByName/' + val).then(function(res) {
            var nodes = [];
            angular.forEach(res.data, function(item) {
                nodes.push(item);
            });
            return nodes;
        });
    };

    $scope.checkedLabels = {Program:false,SurveillanceSystem:false,Registry:false,
                            HealthSurvey:false,Tool:false,Dataset:false,DataStandard:false,
                            Collaborative:false,Organization:false,Tag:false, 
                            FutureDev:false, UnderDev:false, PartOperational:false,
                            FullOperational:false, Retired:false, NotAvailable:false,Concept:false,DataElement:false,
                            DatatsetAttachment:false
                        };

    searchTimeout.catch( function(err){
            if(err != 'canceled')
            {
                alert('The search timed out, please try again');
            }
        });

    //pagination
 
  $scope.currentPage = 1;
  $scope.entryLimit = 10;
  $scope.maxSize = 10;


   $scope.filterclick = function(){
    $scope.currentPage = 1;
    $timeout(function(){ 
        //timeout to avoid race condition.  Could add a watch, but they don't seem to recognize labelCount status :-/

        //check all checkboxes, if all are unchecked, then reset totalItems count for pagination
            if (!$scope.checkedLabels.Program && !$scope.checkedLabels.SurveillanceSystem && !$scope.checkedLabels.Registry 
                                && !$scope.checkedLabels.HealthSurvey&& !$scope.checkedLabels.Tool&& !$scope.checkedLabels.Dataset&& !$scope.checkedLabels.DataStandard
                                && !$scope.checkedLabels.Collaborative && !$scope.checkedLabels.Organization && !$scope.checkedLabels.Tag && !$scope.checkedLabels.DataElement
                                && !$scope.checkedLabels.FutureDev && !$scope.checkedLabels.UnderDev && !$scope.checkedLabels.PartOperational
                                && !$scope.checkedLabels.FullOperational && !$scope.checkedLabels.Retired && !$scope.checkedLabels.NotAvailable && !$scope.checkedLabels.Concept
                                && !$scope.checkedLabels.DatatsetAttachment)
            {
                $scope.totalItems =  $scope.nodes.length;
            }
            else 
            {
                //check all checkboxes and add to the total count depending on what's checked.
                var filteredTotalItems = 0;
                if ($scope.checkedLabels.Program)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Program;
                }
                if ($scope.checkedLabels.SurveillanceSystem)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.SurveillanceSystem;
                }
                if ($scope.checkedLabels.Registry)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Registry;
                }
                if ($scope.checkedLabels.HealthSurvey)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.HealthSurvey;
                }
                if ($scope.checkedLabels.Tool)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Tool;
                }
                if ($scope.checkedLabels.Dataset)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Dataset;
                }
                if ($scope.checkedLabels.DataStandard)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.DataStandard;
                }
                if ($scope.checkedLabels.Collaborative)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Collaborative;
                }
                if ($scope.checkedLabels.Organization)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Organization;
                }
                if ($scope.checkedLabels.Tag)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Tag;
                }
                if ($scope.checkedLabels.Concept)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Concept;
                }
                if ($scope.checkedLabels.DataElement)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.DataElement;
                }
                if ($scope.checkedLabels.FutureDev)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.FutureDev;
                }
                if ($scope.checkedLabels.UnderDev)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.UnderDev;
                }
                if ($scope.checkedLabels.PartOperational)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.PartOperational;
                }
                if ($scope.checkedLabels.FullOperational)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.FullOperational;
                }
                if ($scope.checkedLabels.Retired)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Retired;
                }
                if ($scope.checkedLabels.NotAvailable)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.notAvailable;
                }
                if ($scope.checkedLabels.DatatsetAttachment)
                {
                    filteredTotalItems = filteredTotalItems +  $scope.labelCounts.Attachment;
                }
                $scope.totalItems =  filteredTotalItems;
            }        
            $scope.goToTop();

        }, 10);
    }

    //sort by ...
    $scope.selectedSortType = 'name';
    $scope.setSortValue = function(sortType){
        $scope.selectedSortType = sortType;
    }

    $scope.pageChanged = eval($scope.goToTop);

    if(pageName.length >0){
        var site = {
          'name':pageName,
          'url':$location.absUrl()
        }
        $scope.$parent.unshiftSiteHistory(site);
    }

    $scope.evalStatusCheck = function(){

    }
});