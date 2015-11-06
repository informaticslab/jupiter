angular.module('jupiterApp').controller('linkageCtrl', function($scope, $routeParams, $resource, $location){
	$scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;


    var node = $resource('/api/node/:id', {
        id: '@id'
    });

    var siteName = 'Linkage: ' + $routeParams.id;

    $scope.node = node.get({
        id: $routeParams.id
    }, function() {
        if ($scope.node.name != null)
         {
           siteName = 'Relationships: ' + $scope.node.name;
            var site = {
      'name':siteName,
      'url':$location.absUrl()
    }

    $scope.$parent.unshiftSiteHistory(site);
        }
        });

    
	$scope.twitterBlurb = encodeURIComponent($location.absUrl());



    $scope.emailBlurb = encodeURIComponent($location.absUrl());
  
});