angular.module('jupiterApp').controller('advancedSearchCtrl', function($scope, $http, $routeParams, $resource) {
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
            $http.get('/api/node/name/' + id.split("-")[0]).then(function(res) {
                $scope.nodeA = res.data;
            });
            $http.get('/api/node/name/' + id.split("-")[1]).then(function(res) {
                $scope.nodeB = res.data;
            });
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

        jsonret = d3.json("/api/node/advancedSearch/" + $scope.nodeAId + "-" + $scope.nodeBId + "-" + "1", function(error, json) {
            if (error) {
                $scope.step1status = -1;
                $scope.checkComplete();
            } else {
                $scope.step1json = json;
                step1len = json.nodes.length;
                $scope.disablestep1 = false;
                $scope.step1status = 1;
                $scope.checkComplete();
            }
        });
        jsonret = d3.json("/api/node/advancedSearch/" + $scope.nodeAId + "-" + $scope.nodeBId + "-" + "2", function(error, json) {
            if (error) {
                $scope.step2status = -1;
                $scope.checkComplete();
            } else {
                $scope.step2json = json;
                step2len = json.nodes.length;
                $scope.disablestep2 = false;
                $scope.step2status = 1;
                $scope.checkComplete();
            }
        });
        jsonret = d3.json("/api/node/advancedSearch/" + $scope.nodeAId + "-" + $scope.nodeBId + "-" + "3", function(error, json) {
            if (error) {
                $scope.step3status = -1;
                $scope.checkComplete();
            } else {
                $scope.step3json = json;
                step3len = json.nodes.length;
                $scope.disablestep3 = false;
                $scope.step3status = 1;
                $scope.checkComplete();
            }
        });
        jsonret = d3.json("/api/node/advancedSearch/" + $scope.nodeAId + "-" + $scope.nodeBId + "-" + "4", function(error, json) {
            if (error) {
                $scope.step4status = -1;
                $scope.checkComplete();
            } else {
                $scope.disablestep4 = false;
                step4len = json.nodes.length;
                $scope.step4json = json;

                $scope.step4status = 1;
                $scope.checkComplete();

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