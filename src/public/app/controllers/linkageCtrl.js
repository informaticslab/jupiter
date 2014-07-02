angular.module('apolloApp').controller('linkageCtrl', function($scope, $routeParams, $resource, $location){
	$scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;

    //console.log("linkageCtrl",$scope.showOrganization);

    var node = $resource('/apollo/api/node/:id', {
        id: '@id'
    });

    var siteName = 'Linkage: ' + $routeParams.id;

    $scope.node = node.get({
        id: $routeParams.id
    }, function() {
        //console.log('node name was: ' + $scope.node.name)
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