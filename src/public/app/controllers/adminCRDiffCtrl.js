angular.module('apolloApp').controller('adminCRDiffCtrl', ['$scope', '$http','$routeParams','nodeAttributeDictionary',
	function($scope,$http,$routeParams,nodeAttributeDictionary) {

        $scope.crDiffValues = [];
        var mongoid=$routeParams.id;
        console.log(mongoid);

        $scope.actAttributes = {};
        for (x in nodeAttributeDictionary) {
            //console.log("***********************"+x);
            $scope.actAttributes[x] = [];
            for (y in nodeAttributeDictionary[x].attributeGroups) {
                for (z in nodeAttributeDictionary[x].attributeGroups[y].attributes) {
                    $scope.actAttributes[x].push("" + z + "");
                    //for getting attribute names 
                    // var attname=$filter('unCamelCase')(z);
                    // console.log("x="+x+", z=" + attname + ", des="+nodeAttributeDictionary[x].attributeGroups[y].attributes[z].description);
                }
            } //$scope.nodeattributes.x
        }


        $http.get('/apollo/api/mongo/'+mongoid).then(function(res) {
            $scope.mongoData=res.data;
            console.log($scope.mongoData);
            
            $scope.nodeId=$scope.mongoData[0].id;
            $scope.nodeType=$scope.mongoData[0].CR_NODE_TYPE;

            $http.get('/apollo/api/node/' + $scope.nodeId).then(function(res) {
                console.log(res.data);
                $scope.nodeData = res.data;


                
                $scope.nodeDictionaryAttributes=$scope.actAttributes[$scope.nodeType];
                
                $scope.nodeDictionaryAttributes.forEach(function(d){
                    for(na in $scope.nodeData.attributes)
                    {
                        var key = $scope.nodeData.attributes[na].key;
                        var value = $scope.nodeData.attributes[na].value;
                        if(key==d)
                        {
                            //console.log(value);
                            var diff=diffString(value,$scope.mongoData[0][d]);
                            //console.log(diff);
                            $scope.crDiffValues.push({"key":key,"valueOld":value,"valueNew":$scope.mongoData[0][d],"diff":diff})
                            //$scope.cr[key]=value;

                        }
                    }

                        //console.log(d, nodeData.attributes);
                });

               console.log($scope.crDiffValues); 

            });
        });

        
        



}]);


