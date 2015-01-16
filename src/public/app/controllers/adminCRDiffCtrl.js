angular.module('apolloApp').controller('adminCRDiffCtrl', ['$scope', '$http','$routeParams','$filter','nodeAttributeDictionary',
	function($scope,$http,$routeParams,$filter,nodeAttributeDictionary) {

        $scope.crDiffValues = [];
        var mongoid=$routeParams.id;
        var currentneodata={};
        var currentreldata={};
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
                    // //console.log("x="+x+", z=" + attname + ", des="+nodeAttributeDictionary[x].attributeGroups[y].attributes[z].description);
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
            currentreldata=[];

            var cacheRenew=new Date().getTime();

            $http.get('/apollo/api/mongo/'+mongoid+'?'+cacheRenew,{cache:false}).then(function(res) {
                $scope.mongoData=res.data;
                //console.log($scope.mongoData);
                
                $scope.nodeId=$scope.mongoData[0].id;
                $scope.nodeType=$scope.mongoData[0].CR_NODE_TYPE;
                $scope.nodeName=$scope.mongoData[0].name;
                $scope.crRequestType=$scope.mongoData[0].CR_REQUEST_TYPE;
                $scope.crStatus=$scope.mongoData[0].CR_STATUS;
                $scope.crNodeType=$scope.mongoData[0].CR_NODE_TYPE;
                $scope.crDate=$scope.mongoData[0].CR_DATE;
                $scope.crUser=$scope.mongoData[0].CR_USER;
                $scope.crPrev=$scope.mongoData[0].CR_PREVIOUS;
                $scope.crRel=$scope.mongoData[0].rels;
                $scope.crCreateDate=$scope.mongoData[0].CR_DATE_CREATED;
                $scope.crApproveDate=$scope.mongoData[0].CR_DATE_APPROVED;



                //console.log($scope.mongoData);
                //console.log($scope.crStatus);
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


                if($scope.crRequestType=="ADD")
                {
                    $scope.nodeDictionaryAttributes=$scope.actAttributes[$scope.nodeType];


                    $scope.nodeDictionaryAttributes.forEach(function(d){
                        var valueNew = $scope.mongoData[0][d];
                        $scope.crDiffValues.push({"key":$filter("unCamelCase")(d),"valueNew":valueNew})
                    });

                    fetchRelationshipValues();
                }
                else
                {//console.log();
                    var cacheRenew=new Date().getTime();
                    $http.get('/apollo/api/node/' + $scope.nodeId+'?'+cacheRenew).then(function(res) {
                        //console.log("mongo and node datat",res.data,$scope.mongoData);
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

                       
                        //console.log("currentneodata=",currentneodata); 
                        fetchRelationshipValues();
                    }); //http get

                }

            });//http get

            
        };
        
        init();
    $scope.approveCR = function(){


        //$scope.mongoData[0].CR_DATE_APPROVED=new Date().getTime();
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
              //console.log("err");
        });


    };

    $scope.declineCR = function(){


        //console.log($scope.mongoData[0]);
        $http.post('/apollo/api/mongo/postdeclinecr', $scope.mongoData[0]).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) { 
            if(data==("success"))
            {
                init();
                
                $scope.status_show_declined=true;
            }

          }).error(function(data, status) {
              //console.log("err");
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
              //console.log("err");
        });


    };


    function fetchRelationshipValues(){

            var cacheRenew=new Date().getTime();

            if($scope.crRequestType=="ADD")
            {
                findRelDifference();
            }
            else
            {


                $http.get('/apollo/api/node/relationships/' + $scope.nodeId+'?'+cacheRenew).then(function(res) {
                    $scope.relvalues=res.data;
                    currentreldata=res.data;
                    currentneodata["rels"]=JSON.stringify(currentreldata);
                    //console.log(currentneodata);

                    //$scope.relarray=[];

                    var i=1;
                    $scope.relvalues.forEach(function(d){
                        //$scope.relarray.push({'relid':i,'aid':d.aid,'bid':d.bid,'startid':d.startid,'endid':d.endid,'type':d.reltype});
                        d['relid']=i;
                        i++;
                    });
                    //console.log($scope.relvalues, $scope.crRel);
                    if($scope.crStatus=="APPROVED")
                    {
                        findRelDifferencePrev();
                    }
                    else
                    {
                        findRelDifference();
                    }
                    
                });
            }
    }

    function findRelDifference(){
                   
        if($scope.crRequestType=="ADD") //console.log($scope.crRel);
        {

                var crRelArray=eval($scope.crRel);


                var dbcrRelArray=[];


                crRelArray.some(function(d){
                    d.crdbType="cr";
                    d.found=false;
                    dbcrRelArray.push(d);
                });

                $scope.dbcrRelArray=dbcrRelArray;
        }
        else
        {      
                var dbRelArray=$scope.relvalues;

                var crRelArray=eval($scope.crRel);

                console.log(dbRelArray);
                console.log(crRelArray);
                var dbcrRelArray=[];


                crRelArray.some(function(d){
                    d.found=false;
                    d.crdbType="cr";
                    dbRelArray.some(function(d1){
                        var dbstr=d1.startid+d1.reltype+d1.endid;
                        var crstr=d.startid+d.reltype+d.endid;
                        
                        //console.log("111111",crstr,dbstr);
                        if(dbstr==crstr)
                        {
                            d.found=true;
                            dbcrRelArray.push(d);
                            //console.log("pushed",d.found,d);
                            return true;
                        }

                    });
                    //console.log(d.found);
                    if(!d.found)
                    {
                        dbcrRelArray.push(d);
                        //console.log("pushed",d.found,d);
                    }
                });


                dbRelArray.some(function(d){
                    d.found=false;
                    d.crdbType="db";
                    crRelArray.some(function(d1){   
                        var crstr=d1.startid+d1.reltype+d1.endid;
                        var dbstr=d.startid+d.reltype+d.endid;
                        
                        //console.log("22222",dbstr,crstr);
                        if(dbstr==crstr)
                        {
                            d.found=true;
                            return true;
                        }

                    });

                    if(!d.found)
                    {
                        dbcrRelArray.push(d);
                        //console.log("pushed",d.found,d);
                    }
                });

                 //console.log(dbRelArray);
                 //console.log(crRelArray);
                 //console.log(dbcrRelArray);

                 $scope.dbcrRelArray=dbcrRelArray;
        }

         // if(!$scope.$$phase)
         // {
         //      $scope.$apply();
         // }


    }


    function findRelDifferencePrev(){
                   
        //console.log($scope.crRel);
        var dbRelArray=$scope.relvalues;

        //var crRelArray=eval($scope.crRel);

        var dbprevRelArray=eval(JSON.parse($scope.crPrev).rels);
        
        //console.log(dbprevRelArray);

        var dbcrRelArray=[];
        //var dbprevdbRelArray=[];

        dbprevRelArray.some(function(d){
            
            dbRelArray.some(function(d1){
                var dbstr=d1.startid+d1.reltype+d1.endid;
                var crstr=d.startid+d.reltype+d.endid;
                d.found=false;
                d.crdbType="db";
                //console.log("111111",crstr,dbstr);
                if(dbstr==crstr)
                {
                    d.found=true;
                    dbcrRelArray.push(d);
                    //console.log("pushed",d.found,d);
                    return true;
                }

            });
            //console.log(d.found);
            if(!d.found)
            {
                dbcrRelArray.push(d);
                //console.log("pushed",d.found,d);
            }
        });


        dbRelArray.some(function(d){
            
            dbprevRelArray.some(function(d1){
                var crstr=d1.startid+d1.reltype+d1.endid;
                var dbstr=d.startid+d.reltype+d.endid;
                d.found=false;
                d.crdbType="cr";
                //console.log("22222",dbstr,crstr);
                if(dbstr==crstr)
                {
                    d.found=true;
                    return true;
                }

            });

            if(!d.found)
            {
                dbcrRelArray.push(d);
                //console.log("pushed",d.found,d);
            }
        });

         //console.log(dbRelArray);
         //console.log(crRelArray);
         //console.log(dbcrRelArray);

         $scope.dbcrRelArray=dbcrRelArray;

         //console.log($scope.dbRelArray);

         // if(!$scope.$$phase)
         // {
         //      $scope.$apply();
         // }


    }


}]);


