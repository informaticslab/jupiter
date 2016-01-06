angular.module('jupiterApp').controller('sankey2Ctrl', function($scope, $http, $routeParams, $resource) {
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
    if (id) {
        var queryVals = id.split("-");
        if (queryVals.length) {
            if (id.split("-")[0] != '' && id.split("-")[0] != undefined) {
                $http.get('/api/node/name/' + id.split("-")[0]).then(function(res) {
                    $scope.nodeA = res.data;
                });
            }
            if (id.split("-")[1] != '' && id.split("-")[1] != undefined) {
                $http.get('/api/node/name/' + id.split("-")[1]).then(function(res) {
                    $scope.nodeB = res.data;
                });
            }
            $scope.nodeAId = id.split("-")[0];
            $scope.nodeBId = id.split("-")[1];
            $scope.hops = id.split("-")[2];
        }
        $scope.showImage = false;
        $scope.showLinkageLoading = true;
        
    }

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

    if (id) {
        $scope.stepstatusallcomplete = false;

        $scope.disablestep1 = true;
        $scope.disablestep2 = true;
        $scope.disablestep3 = true;
        $scope.disablestep4 = true;

        $scope.step1status = 0;
        $scope.step2status = 0;
        $scope.step3status = 0;
        $scope.step4status = 0;

        $scope.step1json = "NA";
        $scope.step2json = "NA";
        $scope.step3json = "NA";
        $scope.step4json = "NA";

        
        jsonret = d3.json("/api/node/getSankeyNodes/" + $scope.nodeAId + "/" + $scope.nodeBId, function(error, json) {
            if (error) {
                $scope.step4status = -1;
                $scope.checkComplete();
            } else {
                $scope.disablestep4 = false;
                step4len = json.nodes.length;
                $scope.step4json = json;

                $scope.step4status = 1;
            //    $scope.checkComplete();

                $scope.stepstatusallcomplete = true;
                $scope.$apply();

            }
        });



        $scope.checkComplete = function() {
            $scope.$apply();

            if ($scope.step1status != 0 & $scope.step2status != 0 & $scope.step3status != 0 & $scope.step4status != 0) {

                if (step2len == step1len) {
                    $scope.step2status = -1;
                }



                if (step3len == step2len) {
                    $scope.step3status = -1;
                }



                if (step4len == step3len) {
                    $scope.step4status = -1;
                }



                $scope.stepstatusallcomplete = true;
                $scope.$apply();
            }

        };

    } //if ID

});