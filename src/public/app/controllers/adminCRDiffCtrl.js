angular.module('apolloApp').controller('adminCRDiffCtrl', ['$scope','$modal', '$http','$routeParams','$filter','nodeAttributeDictionary','nodeRelationshipDictionary','ngIdentity',
	function($scope,$modal,$http,$routeParams,$filter,nodeAttributeDictionary,nodeRelationshipDictionary,ngIdentity) {

    $scope.open = function (docid) {

        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {
            doc_id: function () {
              return docid;
            }
          }
        });

        modalInstance.result.then(function (docid) {
            $scope.deleterelrow(docid);
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
          //console.log('Modal dismissed at: ' + new Date(),$scope.selected);
        });
    };


        $scope.openlog = function () {

        var logmodalInstance = $modal.open({
          templateUrl: 'crlog.html',
          controller: 'crlogCtrl',
          size: 'lg',
          resolve: {
            logs: function () {
              return $scope.logs;
            }
          }
        });

        logmodalInstance.result.then(function (docid) {
            $scope.deleterelrow(docid);
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
          //console.log('Modal dismissed at: ' + new Date(),$scope.selected);
        });
    };

        $scope.i=new Date().getTime()+100;
        $scope.crRelArray=[];
        $scope.crDiffValues = [];
        var mongoid=$routeParams.id;
        $scope.mongoid=mongoid;
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



        var init = function()
        {

            //$scope.editCRFlg=false;
            $scope.logs=[];
            $scope.status_show_approved=false;
            $scope.status_show_declined=false;
            $scope.hover=false;
            $scope.relValues=nodeRelationshipDictionary.RelationshipTypes;

            $scope.startnode="";
            $scope.startNodeId="";

            $scope.endnode="";
            $scope.endNodeId="";

            $scope.relCheckBox={};
            $scope.relCheckBox.fromNewNode=false;
            $scope.relCheckBox.toNewNode=false;

            $scope.editCRChk={};
            $scope.editCRChk.yes=false;
            $scope.editCRValues={};

            
            $scope.crDiffValues = [];
            mongoid=$routeParams.id;
            currentneodata={};
            currentreldata=[];

            var cacheRenew=new Date().getTime();

            $http.get('/apollo/api/mongo/'+mongoid+'?'+cacheRenew,{cache:false}).then(function(res) {
                $scope.mongoData=res.data;
                $scope.editCRValues=$scope.mongoData[0];
                console.log($scope.editCRValues);
                
                $scope.nodeId=$scope.mongoData[0].id;
                $scope.nodeType=$scope.mongoData[0].CR_NODE_TYPE;
                $scope.nodeName=$scope.mongoData[0].name;
                $scope.crRequestType=$scope.mongoData[0].CR_REQUEST_TYPE;
                $scope.crStatus=$scope.mongoData[0].CR_STATUS;
                $scope.crNodeType=$scope.mongoData[0].CR_NODE_TYPE;
                //$scope.crDate=$scope.mongoData[0].CR_DATE;
                $scope.crUserCreate=$scope.mongoData[0].CR_USER_CREATE;
                $scope.crUserUpdate=$scope.mongoData[0].CR_USER_UPDATE;
                $scope.crUserApprove=$scope.mongoData[0].CR_USER_APPROVE;
                $scope.crPrev=$scope.mongoData[0].CR_PREVIOUS;
                $scope.crRel=$scope.mongoData[0].rels;
                $scope.crCreateDate=$scope.mongoData[0].CR_DATE_CREATED;
                $scope.crApproveDate=$scope.mongoData[0].CR_DATE_APPROVED;
                $scope.crUpdateDate=$scope.mongoData[0].CR_DATE_UPDATED;

                $http.get('/apollo/api/mongo/log/'+mongoid+'?'+cacheRenew,{cache:false}).then(function(res) {
                    console.log(res.data);
                    $scope.logs=res.data;
                });

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
                        $scope.crDiffValues.push({"key":d,"valueNew":valueNew})
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
                                        $scope.crDiffValues.push({"key":key,"valueOld":valueOld,"valueNew":valueNew,"diff":diff,"diffFlg":diffFlg,"rollback":rollback[key],"rollbackdiff":rollbackdiff})
                                    else
                                        $scope.crDiffValues.push({"key":key,"valueOld":valueOld,"valueNew":valueNew,"diff":diff,"diffFlg":diffFlg})
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


        $scope.mongoData[0].CR_DATE_APPROVED=new Date().getTime();
        $scope.mongoData[0].CR_USER_APPROVE=$scope.identity.currentUser.username;

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

    $scope.saveEditCR = function(){


        console.log($scope.editCRValues.rels);

        var finalCRArray=[];

        $scope.dbcrRelArray.forEach(function(d){
            if(!d.found && d.crdbType=="db")
            {

            }
            else
            {
                finalCRArray.push(d);
            }
        });
        $scope.editCRValues.rels=JSON.stringify(finalCRArray);

        $scope.editCRValues["CR_USER_UPDATE"]=$scope.identity.currentUser.username;
        $scope.editCRValues["CR_DATE_UPDATED"]=new Date().getTime();
        
        console.log($scope.editCRValues);
        $http.post('/apollo/api/mongo/posteditcr', $scope.editCRValues).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) { 
            if(data==("success"))
            {
                init();
                
                //$scope.status_show_declined=true;
            }

          }).error(function(data, status) {
              //console.log("err");
        });


    };
    

    $scope.setRelValue = function(){

        //console.log($scope.relCheckBox.fromNewNode,$scope.relCheckBox.toNewNode);

        if($scope.relCheckBox.toNewNode && $scope.relCheckBox.fromNewNode)
        {

        }
        else if(!$scope.relCheckBox.toNewNode && !$scope.relCheckBox.fromNewNode)
        {
            $scope.startNodeId="";
            $scope.startnode="";
            $scope.toNodeId="";
            $scope.endnode="";
        }
        else if($scope.relCheckBox.fromNewNode && !$scope.relCheckBox.toNewNode)
        {
            $scope.startNodeId=$scope.nodeId;
            $scope.startnode=$scope.nodeName;
            // $scope.toNodeId="";
            // $scope.endnode="";
        }
        else if($scope.relCheckBox.toNewNode && !$scope.relCheckBox.fromNewNode )
        {
            $scope.endNodeId=$scope.nodeId;
            $scope.endnode=$scope.nodeName;
            // $scope.startNodeId="";
            // $scope.startnode="";
        }

        

        //console.log($scope.toNewNode, $scope.fromNewNode);
    }
    $scope.cancelEditCR = function(){

        console.log($scope.editCRValues.rels);
        console.log($scope.relvalues);

        $scope.editCRChk.yes=false;

    };

    $scope.declineCR = function(){


        //console.log($scope.mongoData[0]);

        $scope.mongoData[0].CR_DATE_APPROVED=new Date().getTime();
        $scope.mongoData[0].CR_USER_APPROVE=$scope.identity.currentUser.username;

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

                    $scope.relvalues.forEach(function(d){
                        //$scope.relarray.push({'relid':i,'aid':d.aid,'bid':d.bid,'startid':d.startid,'endid':d.endid,'type':d.reltype});
                        d['relid']=$scope.i;
                        $scope.i++;
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

                $scope.crRelArray=crRelArray;


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

                //console.log(dbRelArray);
                //console.log(crRelArray);
                var dbcrRelArray=[];


                crRelArray.some(function(d){
                    d.found=false;
                    d.crdbType="cr";
                    dbRelArray.some(function(d1){
                        var crstr=d1.startid+d1.reltype+d1.endid+d1.reldesc;
                        var dbstr=d.startid+d.reltype+d.endid+d.reldesc;
                        
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
                        var crstr=d1.startid+d1.reltype+d1.endid+d1.reldesc;
                        var dbstr=d.startid+d.reltype+d.endid+d.reldesc;
                        
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
                var dbstr=d1.startid+d1.reltype+d1.endid+d1.reldesc;
                var crstr=d.startid+d.reltype+d.endid+d.reldesc;
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
                var crstr=d1.startid+d1.reltype+d1.endid+d1.reldesc;
                var dbstr=d.startid+d.reltype+d.endid+d.reldesc;
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

    $scope.deleterelrow=function(id){

        //console.log($scope.relvalues);

        

        var x=arrayObjectIndexOf($scope.dbcrRelArray, id, "relid"); // 1

        //console.log(x);

        //($scope.dbcrRelArray).splice(x,1);
        $scope.dbcrRelArray.forEach(function(d){
            console.log(d);
            if(d.relid==id)
            {
                d.found=false;
                d.crdbType="db";
            }
        });
        //console.log($scope.relvalues);
        
        //$scope.$apply;
    }

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    $scope.startNodeSelected=function($item, $model, $label){
        //console.log("start",$item);
        $scope.startNodeId=$item.id;
        $scope.startnode=$item.displayname;
        //checkNewRel();
    };

    $scope.endNodeSelected=function($item, $model, $label){
        //console.log("end",$item.id);
        $scope.endNodeId=$item.id;
        $scope.endnode=$item.displayname;
        //checkNewRel();
    };

    $scope.addRel = function(){
        console.log($scope.dbcrRelArray);
        //var nextrelid=$scope.i++;
        if(($scope.endNodeId==$scope.nodeId || $scope.startNodeId==$scope.nodeId) && ($scope.endNodeId!="" && $scope.startNodeId!="") && ($scope.relselect!="")&& ($scope.relselect!=null))
        {
            
            console.log($scope.relationshipDescription);
            if($scope.relationshipDescription=="" || $scope.relationshipDescription==undefined)
            {
                $scope.relationshipDescription="n/a";
            }

            if($scope.endNodeId==$scope.nodeId)
            {
                $scope.dbcrRelArray.push({found:false,crdbType:"cr",aname:$scope.nodeName,aid:$scope.nodeId,bname:$scope.startnode,bid:$scope.startNodeId,relid:$scope.i++,reltype:$scope.relselect,startid:$scope.startNodeId,startname:$scope.startnode,endid:$scope.endNodeId,endname:$scope.endnode,reldesc:$scope.relationshipDescription});   
            }
            else
            {
                $scope.dbcrRelArray.push({found:false,crdbType:"cr",aname:$scope.nodeName,aid:$scope.nodeId,bname:$scope.endnode,bid:$scope.endNodeId,relid:$scope.i++,reltype:$scope.relselect,startid:$scope.startNodeId,startname:$scope.startnode,endid:$scope.endNodeId,endname:$scope.endnode,reldesc:$scope.relationshipDescription});
            }

            $scope.startnode="";
            $scope.startNodeId="";

            $scope.endnode="";
            $scope.endNodeId="";

            $scope.relselect="";
            
            $scope.showErrMsg=false;
            //findRelDifference();

        }
        else
        {
            
            $scope.showErrMsg=true;
        }
        console.log($scope.dbcrRelArray);

        
    }

}]);


angular.module('apolloApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance,doc_id) {

  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };
  //console.log(doc_id);
  $scope.ok = function () {
    //$modalInstance.close('ok');
    $scope.$close(doc_id);
  };

  $scope.cancel = function () {
    //$modalInstance.dismiss('cancel');
    $scope.$dismiss();
  };
});

angular.module('apolloApp').controller('crlogCtrl', function ($scope,logs) {

  $scope.logs = logs;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };
  console.log(logs);
  $scope.ok = function () {
    //$modalInstance.close('ok');
    $scope.$close();
  };

  $scope.cancel = function () {
    //$modalInstance.dismiss('cancel');
    $scope.$dismiss();
  };
});

