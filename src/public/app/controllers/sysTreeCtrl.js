angular.module('apolloApp').controller('sysTreeCtrl', function($scope, $routeParams, $resource, $location, $http){
	$scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;

    // var node = $resource('/apollo/api/node/managed/:id', {
    //     id: '@id'
    // });

    var siteName = 'SysTree: ' + $routeParams.id;

    var nodeDetails = $http.get('/apollo/api/node/managed/' + $routeParams.id).success(function(data) {
        $scope.node = data;
    if ($scope.node != null && $scope.node.length >0 && $scope.node[0].name != null && $scope.node[0].name.length >0)
         {
            console.log('node name was: ' + $scope.node[0].name[0])
           siteName = 'SysTree: ' + $scope.node[0].name[0];
            var site = {
              'name':siteName,
              'url':$location.absUrl()
            }
            $scope.$parent.unshiftSiteHistory(site);
        }
    });

$scope.itemSelected = function($item, $model, $label) {
        window.location =  '/apollo/#/sysTree/' + $item.id;
        $scope.queryString = null;
    };

$scope.getNodes = function(val) {
      return $http.get('/apollo/api/node/searchSysTreeByName/' + val).then(function(res) {
          var nodes = [];
          angular.forEach(res.data, function(item) {
              nodes.push(item);
          });
          return nodes;
      });
  };
$scope.twitterBlurb = encodeURIComponent($location.absUrl());



    $scope.emailBlurb = encodeURIComponent($location.absUrl());
});