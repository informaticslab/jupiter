angular.module('jupiterApp').controller('adminCRDiffCtrl', ['$scope','$modal', '$http','$routeParams','$filter','nodeAttributeDictionary','nodeRelationshipDictionary','ngIdentity',
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


        $scope.actAttributes = {};
        for (x in nodeAttributeDictionary) {
            //console.log("***********************"+x);
            $scope.actAttributes[x] = [];
            for (y in nodeAttributeDictionary[x].attributeGroups) {
                for (z in nodeAttributeDictionary[x].attributeGroups[y].attributes) {
                    //$scope.actAttributes[x].push("" + z + "");
                    $scope.actAttributes[x].push({
                        attribute:z,
                        description:nodeAttributeDictionary[x].attributeGroups[y].attributes[z].description,
                        displayLabel:nodeAttributeDictionary[x].attributeGroups[y].attributes[z].displayLabel,                        
                        sortIndex:nodeAttributeDictionary[x].attributeGroups[y].attributes[z].sortIndex
                    });
                    
                    //for getting attribute names 
                    // var attname=$filter('unCamelCase')(z);
                    // //console.log("x="+x+", z=" + attname + ", des="+nodeAttributeDictionary[x].attributeGroups[y].attributes[z].description);
                }
            } //$scope.nodeattributes.x
        }


        var crPrevEval;
        var init = function()
        {

            //$scope.editCRFlg=false;

            //console.log($scope.usersu);
            $scope.dbcrRelArray=[];
            $scope.usersu=false;
            $scope.i=new Date().getTime()+100;
            $scope.crRelArray=[];
            $scope.crDiffValues = [];
            var mongoid=$routeParams.id;
            $scope.mongoid=mongoid;
            //var currentneodata={};
            //var currentreldata={};
            var rollback;
            $scope.labelclass="";

            $scope.relationshipDescription="";
            $scope.logs=[];
            $scope.status_show_approved=false;
            $scope.status_show_declined=false;
            $scope.hover=false;
            $scope.relTypeValues=nodeRelationshipDictionary.RelationshipTypes;
            //console.log("UK $scope.relvalues",$scope.relvalues);

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


            // ///console.log($scope.identity.currentUser.roles.levelTwo);
            if($scope.identity.currentUser.roles.levelTwo)
            {
                $scope.usersu=true;
            }

            $http.get('/api/mongo/'+mongoid+'?'+cacheRenew,{cache:false}).then(function(res) {
                $scope.mongoData=res.data;
                $scope.editCRValues=$scope.mongoData[0];
                

                //console.log("********************CR DATE*****************",$scope.mongoData);
                
                $scope.nodeId=$scope.mongoData[0].id;
                $scope.nodeType=$scope.mongoData[0].CR_NODE_TYPE;
                $scope.nodeName=$scope.mongoData[0].name;
                $scope.crRequestType=$scope.mongoData[0].CR_REQUEST_TYPE;
                $scope.crStatus=$scope.mongoData[0].CR_STATUS;
                $scope.crNodeType=$scope.mongoData[0].CR_NODE_TYPE;
                //$scope.crDate=$scope.mongoData[0].CR_DATE;
                $scope.crUserCreate=$scope.mongoData[0].CR_USER_DN_CREATE;
                $scope.crUserUpdate=$scope.mongoData[0].CR_USER_DN_EDIT;
                $scope.crUserApprove=$scope.mongoData[0].CR_USER_DN_EXECUTE;
                $scope.crPrev=$scope.mongoData[0].CR_PREVIOUS;
                $scope.crRel=$scope.mongoData[0].rels;
                $scope.crCreateDate=$scope.mongoData[0].CR_DATE_CREATED;
                $scope.crApproveDate=$scope.mongoData[0].CR_DATE_EXECUTED;
                $scope.crUpdateDate=$scope.mongoData[0].CR_DATE_EDITED;

                $scope.getAttributesAndGroups($scope.nodeType);

                $http.get('/api/mongo/log/'+mongoid+'?'+cacheRenew,{cache:false}).then(function(res) {
                    //console.log(res.data);
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

                        var obj={};
                            obj.key=d.attribute;
                            obj.sortIndex=d.sortIndex;
                            obj.description=d.description;
                            obj.displayLabel=d.displayLabel;
                        
                        if($scope.mongoData[0][obj.key]==undefined)
                        {
                            obj.valueNew="";
                        }
                        else
                        {
                            obj.valueNew=$scope.mongoData[0][obj.key];
                            //console.log($scope.mongoData[0][obj.key]);
                        }

                        if(obj.valueNew.trim()=="")
                        {
                            obj.diffFlg=false;
                        }
                        else
                        {
                            obj.diffFlg=true;
                        }


                        $scope.crDiffValues.push(obj);
                    });

                    //console.log($scope.crDiffValues);
                    fetchRelationshipValues();
                }
                else if($scope.crRequestType=="UPDATE")
                {
                    var cacheRenew=new Date().getTime();
                    $http.get('/api/node/' + $scope.nodeId+'?'+cacheRenew).then(function(res) {
                        //console.log("mongo and node datat",res.data,$scope.mongoData);
                        $scope.nodeData = res.data;

                        // //console.log($scope.nodeData);
                        
                        $scope.nodeDictionaryAttributes=$scope.actAttributes[$scope.nodeType];
                        
                        $scope.nodeDictionaryAttributes.forEach(function(d){
                            var obj={};
                            obj.key=d.attribute;
                            obj.sortIndex=$scope.nodeAllGroupAttributes[obj.key].sortIndex;
                            obj.groupHeading=$scope.nodeAllGroupAttributes[obj.key].groupHeading;
                            //obj.sortIndex=d.sortIndex;
                            obj.description=d.description;
                            obj.displayLabel=d.displayLabel;

                            var nodeAttrFound=false;
                            for(na in $scope.nodeData.attributes)
                            {

                                if($scope.nodeData.attributes[na].key==obj.key)
                                {
                                    obj.valueOld=$scope.nodeData.attributes[na].value;
                                    nodeAttrFound=true;
                                    
                                }
                            }
                            if(!nodeAttrFound)
                            {
                                obj.valueOld="";
                            }


                            if($scope.mongoData[0][obj.key]==undefined)
                            {
                                obj.valueNew="";
                            }
                            else
                            {
                                obj.valueNew=$scope.mongoData[0][obj.key];
                                //console.log($scope.mongoData[0][obj.key]);
                            }
                            var diff=diffString(obj.valueOld,obj.valueNew);
                            // //console.log(diff);

                            obj.diff=diff;
                            var rollbackdiff,rollbackdiffreverse;
                            
                            if($scope.crPrev != null && $scope.crPrev != "")
                            {
                                
                                if(rollback[obj.key]==undefined)
                                {
                                    rollback[obj.key]="";

                                }
                                obj.rollback=rollback[obj.key];
                                obj.rollbackdiff=diffString(obj.valueOld,obj.rollback);
                                obj.rollbackdiffreverse=diffString(obj.rollback,obj.valueOld);
                                if(obj.rollbackdiff.indexOf("<ins>")>-1)
                                {
                                    obj.rollbackdiffFlg=true;
                                }
                                if(obj.rollbackdiff.indexOf("<del>")>-1)
                                {
                                    obj.rollbackdiffFlg=true;
                                }
                            }
                            //console.log(diff);
                            
                            if(diff.indexOf("<ins>")>-1)
                            {
                                obj.diffFlg=true;
                            }
                            if(diff.indexOf("<del>")>-1)
                            {
                                obj.diffFlg=true;
                            }

                            $scope.crDiffValues.push(obj);

                            currentneodata[obj.key]=obj.valueOld;
                            
                        });

                       
                        //console.log("$scope.crDiffValues=",$scope.crDiffValues); 
                        fetchRelationshipValues();
                    }); //http get

                }
                else
                {
                    //console.log($scope.crPrev);
                    crPrevEval=JSON.parse($scope.crPrev);
                    //console.log(crPrevEval);

                    $scope.nodeDictionaryAttributes=$scope.actAttributes[$scope.nodeType];


                    $scope.nodeDictionaryAttributes.forEach(function(d){

                        //console.log(d);

                        var obj={};
                            obj.key=d.attribute;
                            obj.sortIndex=d.sortIndex;
                            obj.description=d.description;
                            obj.displayLabel=d.displayLabel;
                        
                        if(crPrevEval[obj.key]==undefined)
                        {
                            obj.valueOld="";
                        }
                        else
                        {
                            obj.valueOld=crPrevEval[obj.key];
                            //console.log(crPrevEval[obj.key]);
                        }

                        if(obj.valueOld.trim()=="")
                        {
                            obj.diffFlg=false;
                        }
                        else
                        {
                            obj.diffFlg=true;
                        }


                        $scope.crDiffValues.push(obj);
                    });

                    //console.log($scope.crDiffValues);
                    fetchRelationshipValues();
                }

            });//http get

            
        };
        
        init();
    $scope.approveCR = function(){

        //console.log($scope.identity.currentUser.username);
        // $scope.mongoData[0].CR_DATE_APPROVED=new Date().getTime();
        // $scope.mongoData[0].CR_USER_APPROVE=$scope.identity.currentUser.username;

        // $scope.cr['CR_NODE_TYPE']=$scope.nodeLabel;
        // $scope.cr['CR_REQUEST_TYPE']="ADD";
        // $scope.cr['CR_STATUS']="PENDING";
        // $scope.cr['CR_USER_DN_CREATE']=$scope.identity.currentUser.displayName;
        // $scope.cr['CR_USER_ID_CREATE']=$scope.identity.currentUser.id;
        // $scope.cr['CR_USER_EMAIL_CREATE']=$scope.identity.currentUser.email;
        // $scope.cr['CR_USER_DN_EDIT']="";
        // $scope.cr['CR_USER_ID_EDIT']="";
        // $scope.cr['CR_USER_EMAIL_EDIT']="";
        $scope.mongoData[0].CR_USER_DN_EXECUTE=$scope.identity.currentUser.displayName;
        $scope.mongoData[0].CR_USER_ID_EXECUTE=$scope.identity.currentUser._id;
        $scope.mongoData[0].CR_USER_EMAIL_EXECUTE=$scope.identity.currentUser.email;
        // $scope.cr['CR_DATE_CREATED']=new Date().getTime();
        // $scope.cr['CR_DATE_EDITED']="";
        //$scope.mongoData[0]['CR_DATE_EXECUTED']=new Date().getTime();
        datapacket={};

        datapacket.approved=$scope.mongoData[0];
        //console.log(currentneodata);
        datapacket.prev=currentneodata;

        datapacket.type=$scope.mongoData[0].CR_REQUEST_TYPE;
        //console.log(datapacket);
        $http.post('/api/mongo/postapprovecr', datapacket).
        //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
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

    $scope.getAttributesAndGroups = function(nodeLabel)
    {
        $scope.nodeGroups=[];
        for(a in nodeAttributeDictionary[nodeLabel].attributeGroups)
        {
            $scope.nodeGroups.push(nodeAttributeDictionary[nodeLabel].attributeGroups[a]);
        }

        //$scope.nodeGroups=nodeAttributeDictionary[nodeLabel].attributeGroups;
        $scope.nodeAllGroupAttributes={};
        $scope.nodeGroupAttributes={};
        for(group in $scope.nodeGroups)
        {
            var heading=$scope.nodeGroups[group].heading;
            var groupSortIndex=$scope.nodeGroups[group].sortIndex;
            $scope.nodeGroupAttributes[heading]=[];
            for(attribute in $scope.nodeGroups[group].attributes)
            {
                //console.log(group,$scope.nodeGroups[group].attributes[attribute]);
        
                //$scope.nodeGroupAttributes[heading].push($scope.nodeGroups[group].attributes[attribute]);
                $scope.nodeGroupAttributes[heading].push({attributes:$scope.nodeGroups[group].attributes[attribute],attributeName:attribute});
                $scope.nodeAllGroupAttributes[attribute]={attributeName:attribute,groupHeading:heading,sortIndex:groupSortIndex+''+$scope.nodeGroups[group].attributes[attribute].sortIndex};

            }
            //$scope.nodeGroups[group].heading
            
        }
        // //console.log($scope.nodeGroups);
        // //console.log($scope.nodeAllGroupAttributes);
    }

    $scope.saveEditCR = function(){


        //console.log($scope.editCRValues.rels);

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

        // $scope.editCRValues["CR_USER_UPDATE"]=$scope.identity.currentUser.username;
        // $scope.editCRValues["CR_DATE_UPDATED"]=new Date().getTime();

        //$scope.cr['CR_NODE_TYPE']=$scope.nodeLabel;
        // $scope.cr['CR_REQUEST_TYPE']="ADD";
        // $scope.cr['CR_STATUS']="PENDING";
        // $scope.cr['CR_USER_DN_CREATE']=$scope.identity.currentUser.displayName;
        // $scope.cr['CR_USER_ID_CREATE']=$scope.identity.currentUser.id;
        // $scope.cr['CR_USER_EMAIL_CREATE']=$scope.identity.currentUser.email;
        $scope.editCRValues.CR_USER_DN_EDIT=$scope.identity.currentUser.displayName;
        $scope.editCRValues.CR_USER_ID_EDIT=$scope.identity.currentUser._id;
        $scope.editCRValues.CR_USER_EMAIL_EDIT=$scope.identity.currentUser.email;
        // $scope.cr['CR_DATE_CREATED']=new Date().getTime();
        //$scope.editCRValues['CR_DATE_EDITED']=new Date().getTime();
        
        //console.log($scope.editCRValues);
        $http.post('/api/mongo/posteditcr', $scope.editCRValues).
        //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
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
    

    $scope.setRelValueFrom = function(){


        if($scope.relCheckBox.fromNewNode)
        {
            $scope.startNodeId=$scope.nodeId;
            $scope.startnode=$scope.editCRValues['name'];
        }
        else
        {
            $scope.startNodeId="";
            $scope.startnode="";
        }

    }

    $scope.setRelValueTo = function(){

        if($scope.relCheckBox.toNewNode)
        {
            $scope.endNodeId=$scope.nodeId;
            $scope.endnode=$scope.editCRValues['name'];
        }
        else
        {
            $scope.endNodeId="";
            $scope.endnode="";
        }

    }

    $scope.cancelEditCR = function(){

        //console.log($scope.editCRValues.rels);
        //console.log($scope.relvalues);

        $scope.editCRChk.yes=false;
        init();

    };

    $scope.declineCR = function(){


        //console.log($scope.mongoData[0]);

        // $scope.mongoData[0].CR_DATE_APPROVED=new Date().getTime();
        // $scope.mongoData[0].CR_USER_APPROVE=$scope.identity.currentUser.username;

        $scope.mongoData[0].CR_USER_DN_EXECUTE=$scope.identity.currentUser.displayName;
        $scope.mongoData[0].CR_USER_ID_EXECUTE=$scope.identity.currentUser._id;
        $scope.mongoData[0].CR_USER_EMAIL_EXECUTE=$scope.identity.currentUser.email;
        // $scope.cr['CR_DATE_CREATED']=new Date().getTime();
        // $scope.cr['CR_DATE_EDITED']="";
        //$scope.mongoData[0]['CR_DATE_EXECUTED']=new Date().getTime();

        $http.post('/api/mongo/postdeclinecr', $scope.mongoData[0]).
        //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
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

    // $scope.rollbackCR = function(){


    //     datapacket={};
    //     datapacket.rollback=$scope.rollback;
    //     datapacket.mongoid=mongoid;
    //     $http.post('/api/mongo/postrollbackcr', datapacket).
    //     //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
    //       success(function(data, status, headers, config) { 
    //         if(data==("success"))
    //         {
    //             init();
                
    //             $scope.status_show_declined=true;
    //         }

    //       }).error(function(data, status) {
    //           //console.log("err");
    //     });


    // };


    function fetchRelationshipValues(){

            var cacheRenew=new Date().getTime();

            if($scope.crRequestType=="ADD")
            {
                findRelDifference();
            }
            else if($scope.crRequestType=="UPDATE")
            {


                $http.get('/api/node/relationships/' + $scope.nodeId+'?'+cacheRenew).then(function(res) {
                    $scope.relvalues=res.data;
                    //console.log("$scope.relvalues",$scope.relvalues);
                    currentreldata=res.data;
                    //console.log(currentreldata);
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
            else
            {
                findRelDifference();
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
        else if($scope.crRequestType=="UPDATE")
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
        else
        {

            
            if($scope.crStatus=="APPROVED")
            {
                $scope.dbcrRelArray=eval(crPrevEval.rels);
                //console.log();
            }
            else
            {
                $scope.dbcrRelArray=$scope.relvalues;
            }

        }

        //console.log($scope.dbcrRelArray);


    }


    function findRelDifferencePrev(){
                   
        //console.log($scope.crRel);
        var dbRelArray=$scope.relvalues;
        //console.log(dbRelArray);
        //var crRelArray=eval($scope.crRel);

        var dbprevRelArray=eval(JSON.parse($scope.crPrev).rels);
        
        //console.log(dbprevRelArray);

        var dbcrRelArray=[];
        //var dbprevdbRelArray=[];

        dbprevRelArray.some(function(d){
            d.found=false;
            d.crdbType="db";
            dbRelArray.some(function(d1){
                var dbstr=d1.startid+d1.reltype+d1.endid+d1.reldesc;
                var crstr=d.startid+d.reltype+d.endid+d.reldesc;
                
                
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
            d.crdbType="cr";
            dbprevRelArray.some(function(d1){
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
            //console.log(d);
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
        //console.log($scope.dbcrRelArray);
        //var nextrelid=$scope.i++;
        if(($scope.endNodeId==$scope.nodeId || $scope.startNodeId==$scope.nodeId) && ($scope.endNodeId!="" && $scope.startNodeId!="") && ($scope.relselect!="")&& ($scope.relselect!=null))
        {
            
            //console.log($scope.relationshipDescription);
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
            $scope.relationshipDescription="";
            $scope.relCheckBox.fromNewNode=false;
            $scope.relCheckBox.toNewNode=false;
            //findRelDifference();

        }
        else
        {
            
            $scope.showErrMsg=true;
        }
        //console.log($scope.dbcrRelArray);

        
    }

}]);


angular.module('jupiterApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance,doc_id) {

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

angular.module('jupiterApp').controller('crlogCtrl', function ($scope,logs) {

  $scope.logs = logs;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };
  //console.log(logs);
  $scope.ok = function () {
    //$modalInstance.close('ok');
    $scope.$close();
  };

  $scope.cancel = function () {
    //$modalInstance.dismiss('cancel');
    $scope.$dismiss();
  };
});

