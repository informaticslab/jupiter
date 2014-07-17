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

    $scope.showLinkageLoading=false;
    //console.log("routeparams id",id);
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
        $scope.showLinkageLoading=true;
    }

    $scope.itemSelectedA = function($item, $model, $label) {
        $scope.nodeAId = $item.id;
    };
    $scope.itemSelectedB = function($item, $model, $label) {
        $scope.nodeBId = $item.id;
    };

   if(id)
   {
    $scope.stepstatusallcomplete=false;

        $scope.disablestep1 = true;
        $scope.disablestep2 = true;
        $scope.disablestep3 = true;
        $scope.disablestep4 = true;

        $scope.step1status = 0;
        $scope.step2status = 0;
        $scope.step3status = 0;
        $scope.step4status = 0;

        $scope.step1json="NA";
        $scope.step2json="NA";
        $scope.step3json="NA";
        $scope.step4json="NA";

        jsonret = d3.json("/apollo/api/node/advancedSearch/" + $scope.nodeAId + "-" + $scope.nodeBId + "-" + "1", function(error, json) {
            if(error)
            {
                //console.log("1 error");
                $scope.step1status = -1;
                $scope.checkComplete();
            }
            else
            {
                $scope.step1json=json;
                $scope.disablestep1 = false;
                //console.log("1",$scope.disablestep1);
                //$scope.$apply();
                $scope.step1status = 1;
                $scope.checkComplete();
            }
        });
        jsonret = d3.json("/apollo/api/node/advancedSearch/" + $scope.nodeAId + "-" + $scope.nodeBId + "-" + "2", function(error, json) {
            if(error)
            {
                //console.log("2 error");
                $scope.step2status = -1;
                $scope.checkComplete();
            }
            else
            {
                //console.log("2");
                $scope.step2json=json;
                $scope.disablestep2 = false;
                //console.log("2",$scope.disablestep2);
                //$scope.$apply();
                $scope.step2status = 1;
                $scope.checkComplete();
            }
        });
        jsonret = d3.json("/apollo/api/node/advancedSearch/" + $scope.nodeAId + "-" + $scope.nodeBId + "-" + "3", function(error, json) {
            if(error)
            {
                //console.log("3 error");
                $scope.step3status = -1;
                $scope.checkComplete();
            }
            else
            {
                //console.log("3");
                $scope.step3json=json;
                $scope.disablestep3 = false;
                //console.log("3",$scope.disablestep3);
                //$scope.$apply();
                $scope.step3status = 1;
                $scope.checkComplete();
            }
        });
        jsonret = d3.json("/apollo/api/node/advancedSearch/" + $scope.nodeAId + "-" + $scope.nodeBId + "-" + "4", function(error, json) {
            if(error)
            {
                //console.log("4 error");
                $scope.step4status = -1;
                $scope.checkComplete();
            }
            else
            {
                //console.log("4");
                $scope.disablestep4 = false;
                $scope.step4json=json;
                //console.log("4",$scope.disablestep4);
                
                $scope.step4status = 1;
                $scope.checkComplete();

            }
        });

        

    $scope.checkComplete = function() {
        //console.log("check called");
        $scope.$apply();
        //console.log($scope.step1status,$scope.step2status,$scope.step3status,$scope.step4status);
        
        if($scope.step1status != 0 & $scope.step2status !=0 & $scope.step3status !=0 & $scope.step4status !=0 )
        {
            //console.log("COMPLETE");
            //console.log($scope.step1status,$scope.step2status,$scope.step3status,$scope.step4status);
            //console.log("json",$scope.step1json.nodes.length,$scope.step2json.nodes.length,$scope.step3json.nodes.length,$scope.step4json.nodes.length);

            if($scope.step2status==1 & $scope.step1status==1)
            {
                if($scope.step2json.nodes.length==$scope.step1json.nodes.length)
                {
                    $scope.step2status=-1;    
                }
                
            }
            if($scope.step3status==1 & $scope.step2status==1)
            {
                if($scope.step3json.nodes.length==$scope.step2json.nodes.length)
                {
                    $scope.step3status=-1;    
                }
                
            }
            if($scope.step4status==1 & $scope.step3status==1)
            {
                if($scope.step4json.nodes.length==$scope.step3json.nodes.length)
                {
                    $scope.step4status=-1;    
                }
                
            }
            


            //console.log($scope.step1status,$scope.step2status,$scope.step3status,$scope.step4status);
            $scope.stepstatusallcomplete=true;
            $scope.$apply();
        }

    };

}//if ID

});