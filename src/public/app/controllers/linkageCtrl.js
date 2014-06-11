angular.module('apolloApp').controller('linkageCtrl', function($scope, $routeParams, $resource, $location){
	$scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;

    var node = $resource('/apollo/api/node/:id', {
        id: '@id'
    });

    var siteName = 'Linkage: ' + $routeParams.id;

    $scope.node = node.get({
        id: $routeParams.id
    }, function() {
        console.log('node name was: ' + $scope.node.name)
        if ($scope.node.name != null)
         {
           siteName = 'Linkage: ' + $scope.node.name;
            var site = {
      'name':siteName,
      'url':$location.absUrl()
    }

    $scope.$parent.unshiftSiteHistory(site);
        }
        });

    
	$scope.twitterBlurb = encodeURIComponent($location.absUrl());


	if ($scope.node.name != null)
	{
         console.log('node name 2 was: ' + $scope.node.name)
		'Linkage Viewer: ' + $scope.node.name;
	}


    $scope.emailBlurb = encodeURIComponent($location.absUrl());
});