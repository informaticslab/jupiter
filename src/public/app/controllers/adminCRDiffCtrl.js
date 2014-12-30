angular.module('apolloApp').controller('adminCRDiffCtrl', ['$scope', '$http','$routeParams','$filter','nodeAttributeDictionary',
	function($scope,$http,$routeParams,$filter,nodeAttributeDictionary) {

        $scope.crDiffValues = [];
        var mongoid=$routeParams.id;
        var currentneodata={};
        var rollback;
        $scope.labelclass="";
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

        $scope.status_show_approved=false;
        $scope.status_show_declined=false;

        var init = function()
        {

            
            $scope.crDiffValues = [];
            mongoid=$routeParams.id;
            currentneodata={};

            $http.get('/apollo/api/mongo/'+mongoid).then(function(res) {
                $scope.mongoData=res.data;
                console.log($scope.mongoData);
                
                $scope.nodeId=$scope.mongoData[0].id;
                $scope.nodeType=$scope.mongoData[0].CR_NODE_TYPE;
                $scope.nodeName=$scope.mongoData[0].name;
                $scope.crRequestType=$scope.mongoData[0].CR_REQUEST_TYPE;
                $scope.crStatus=$scope.mongoData[0].CR_STATUS;
                $scope.crNodeType=$scope.mongoData[0].CR_NODE_TYPE;
                $scope.crDate=$scope.mongoData[0].CR_DATE;
                $scope.crUser=$scope.mongoData[0].CR_USER;
                $scope.crPrev=$scope.mongoData[0].CR_PREVIOUS;

                if($scope.crRequestType=="UPDATE")
                {
                    $scope.labelclass="label-warning";
                }
                
                if($scope.crRequestType=="DELETE")
                {
                    $scope.labelclass="label-danger";
                }

                if($scope.crRequestType=="ADD")
                {
                    $scope.labelclass="label-success";
                }


                if($scope.crPrev != null && $scope.crPrev != "")
                {
                    rollback = JSON.parse($scope.crPrev);
                    $scope.rollback=rollback;
                }



                console.log();

                $http.get('/apollo/api/node/' + $scope.nodeId).then(function(res) {
                    console.log(res.data);
                    $scope.nodeData = res.data;


                    
                    $scope.nodeDictionaryAttributes=$scope.actAttributes[$scope.nodeType];
                    
                    $scope.nodeDictionaryAttributes.forEach(function(d){

                        
                        for(na in $scope.nodeData.attributes)
                        {
                            var key = $scope.nodeData.attributes[na].key;

                            var valueOld = $scope.nodeData.attributes[na].value;
                            var valueNew = $scope.mongoData[0][d];
                            var diffFlg=false;
                            if(key==d)
                            {
                                //console.log(value);
                                var diff=diffString(valueOld,valueNew);
                                var rollbackdiff;
                                if($scope.crPrev != null && $scope.crPrev != "")
                                {
                                    rollbackdiff=diffString(valueOld,rollback[key]);
                                }
                                //console.log(diff);
                                
                                if(diff.indexOf("<ins>")>-1)
                                {
                                    diffFlg=true;
                                }
                                if(diff.indexOf("<del>")>-1)
                                {
                                    diffFlg=true;
                                }
                                if($scope.crPrev != null && $scope.crPrev != "")
                                    $scope.crDiffValues.push({"key":$filter("unCamelCase")(key),"valueOld":valueOld,"valueNew":valueNew,"diff":diff,"diffFlg":diffFlg,"rollback":rollback[key],"rollbackdiff":rollbackdiff})
                                else
                                    $scope.crDiffValues.push({"key":$filter("unCamelCase")(key),"valueOld":valueOld,"valueNew":valueNew,"diff":diff,"diffFlg":diffFlg})
                                currentneodata[key]=valueOld;
                                //$scope.cr[key]=value;

                            }
                        }
                            
                            //console.log(d, nodeData.attributes);
                        
                    });

                   
                    console.log("currentneodata=",currentneodata); 
                }); //http get



            });//http get

            
        };
        
        init();
    $scope.approveCR = function(){


        console.log($scope.mongoData[0]);
        datapacket={};
        datapacket.approved=$scope.mongoData[0];
        datapacket.prev=currentneodata;
        datapacket.type=$scope.mongoData[0].CR_REQUEST_TYPE;
        $http.post('/apollo/api/mongo/postapprovecr', datapacket).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) { 
            if(data==("success"))
            {
                init();
                $scope.status_show_approved=true;
            }

          }).error(function(data, status) {
              console.log("err");
        });


    };

    $scope.declineCR = function(){


        console.log($scope.mongoData[0]);
        $http.post('/apollo/api/mongo/postdeclinecr', $scope.mongoData[0]).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) { 
            if(data==("success"))
            {
                init();
                
                $scope.status_show_declined=true;
            }

          }).error(function(data, status) {
              console.log("err");
        });


    };

    $scope.rollbackCR = function(){


        datapacket={};
        datapacket.rollback=$scope.rollback;
        datapacket.mongoid=mongoid;
        $http.post('/apollo/api/mongo/postrollbackcr', datapacket).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) { 
            if(data==("success"))
            {
                init();
                
                $scope.status_show_declined=true;
            }

          }).error(function(data, status) {
              console.log("err");
        });


    };


}]);


