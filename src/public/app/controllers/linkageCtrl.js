angular.module('apolloApp').controller('linkageCtrl', function($scope, $routeParams, $resource, $location){
	$scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;

    var node = $resource('/apollo/api/node/:id', {
        id: '@id'
    });

    $scope.node = node.get({
        id: $routeParams.id
    });
    
	$scope.twitterBlurb = encodeURIComponent($location.absUrl());

	var site = {
      'name':'Linkage Viewer',
      'url':$location.absUrl()
    }
    $scope.$parent.browseHistory.sites.push(site);
});