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

	var siteName = 'Linkage Viewer: ' + $routeParams.id;
	if ($scope.node.name != null)
	{
		'Linkage Viewer: ' + $scope.node.name;
	}

	var site = {
      'name':siteName,
      'url':$location.absUrl()
    }

    $scope.$parent.unshiftSiteHistory(site);
    $scope.emailBlurb = encodeURIComponent($location.absUrl());
});