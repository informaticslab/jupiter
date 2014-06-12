angular.module('apolloApp').controller('advancedSearchCtrl', function($scope, $http, $routeParams, $resource) {
    $scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;
    $scope.showImage = true;
    $scope.getNodes = function(val) {
        return $http.get('/apollo/api/node/searchByName/' + val).then(function(res) {
            var nodes = [];
            angular.forEach(res.data, function(item) {
                nodes.push(item);
            });
            return nodes;
        });
    };
    var id = $routeParams.id;
    if (id) {
        var queryVals = id.split("-");
        if (queryVals.length) {
            $http.get('/apollo/api/node/name/' + id.split("-")[0]).then(function(res) {
                $scope.nodeA = res.data;
            });
            $http.get('/apollo/api/node/name/' + id.split("-")[1]).then(function(res) {
                $scope.nodeB = res.data;
            });
            $scope.nodeAId = id.split("-")[0];
            $scope.nodeBId = id.split("-")[1];
            $scope.hops = id.split("-")[2];
        }
        $scope.showImage = false;
    }

    $scope.itemSelectedA = function($item, $model, $label) {
        $scope.nodeAId = $item.id;
    };
    $scope.itemSelectedB = function($item, $model, $label) {
        $scope.nodeBId = $item.id;
    };
});