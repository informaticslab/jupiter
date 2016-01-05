angular.module('jupiterApp').controller('sankeyCtrl', function($scope, $http, $routeParams, $resource) {
    $scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;
    $scope.showImage = true;
    $scope.getNodes = function(val) {
        return $http.get('/api/node/searchByName/' + val).then(function(res) {
            var nodes = [];
            angular.forEach(res.data, function(item) {
                nodes.push(item);
            });
            return nodes;
        });
    };
    var id = $routeParams.id;
    var step1len = 0,
        step2len = 0,
        step3len = 0,
        step4len = 0;

    $scope.showLinkageLoading = false;
    $scope.nodeAId = 'O84';
    $http.get('/api/node/name/' + $scope.nodeAId).then(function(res) {
                $scope.nodeA = res.data;
            });
    // $http.get('/api/node/name/' + id.split("-")[1]).then(function(res) {
    //             $scope.nodeB = res.data;
    // });

    $scope.itemSelectedA = function($item, $model, $label) {
        $scope.nodeAId = $item.id;
    };
    $scope.itemSelectedB = function($item, $model, $label) {
        $scope.nodeBId = $item.id;
    };
    $scope.resetItemB = function($item){
        if ($item == '' || $item == undefined) {
            $scope.nodeBId =  undefined;
        }
        else {
         $scope.nodeBId =  $item.id;
        }
    }
    $scope.resetItemA = function($item){
        if ($item == '' || $item == undefined) {
             $scope.nodeAId = undefined;
        }
        else {
           $scope.nodeAId = $item.id;
        }
       
    }
});