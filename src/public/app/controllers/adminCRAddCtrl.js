angular.module('apolloApp').controller('adminCRAddCtrl', ['$scope', '$http','$filter','$location','nodeAttributeDictionary','nodeRelationshipDictionary','nodeTypeDictionary', 'ngIdentity',
    function($scope,$http,$filter,$location,nodeAttributeDictionary,nodeRelationshipDictionary,nodeTypeDictionary,ngIdentity) {



    $scope.cr={};
    $scope.showButtons=false;
    $scope.nodeLabel="";
    $scope.crQueueSuccess=false;
    $scope.crQueueFail=false;
    
    $scope.endNodeId="";
    $scope.startNodeId="";

    $scope.startnode="";
    $scope.endnode="";
    $scope.relationshipDescription="";

    $scope.relselect="";
    $scope.hover=false;
    $scope.showErrMsg=false;

    $scope.relCheckBox={};
    $scope.relvalues=[];

    $scope.nextNodeID="TBD";
    $scope.i=100;

    $scope.highlightMissingTxt=false;

    //.fromNewNode=false;
    //$scope.relCheckBox.toNewNode=false;

    //console.log(nodeRelationshipDictionary.RelationshipTypes);
    $scope.relValues=nodeRelationshipDictionary.RelationshipTypes;
    $scope.nodeTypeValues=nodeTypeDictionary.NodeTypes;
    
    $scope.identity = ngIdentity;
    
 //   	$scope.itemSelected = function($item, $model, $label, id) {
 //            $scope.crQueueSuccess=false;
 //            $scope.crQueueFail=false;
	// 		$scope.nodeId = $item.id;
	// 		//console.log($scope.nodeId,$item,$model,$label);

	//        $location.path('/admin/'+$scope.nodeId);
 //            fetchNodeValues();
 //            fetchRelationshipValues();   
	// };


    // function fetchRelationshipValues(){
    //                 $http.get('/apollo/api/node/relationships/' + $scope.nodeId).then(function(res) {
    //             $scope.relvalues=res.data;
    //             //$scope.relarray=[];

    //             var i=1;
    //             $scope.relvalues.forEach(function(d){
    //                 //$scope.relarray.push({'relid':i,'aid':d.aid,'bid':d.bid,'startid':d.startid,'endid':d.endid,'type':d.reltype});
    //                 d['relid']=i;
    //                 i++;
    //             });
    //             //console.log($scope.relvalues);


    //         });
    // }
    $scope.isActive = function(route) {
        return route === $location.path();
    }

    function fetchNodeValues(){

        $scope.nodeLabel=$scope.nodetypeselect;
        $scope.nodeDictionaryAttributes=$scope.actAttributes[$scope.nodeLabel];
        $scope.highlightMissingTxt=false;
        $scope.cr={};
        $scope.nodeDictionaryAttributes.forEach(function(d){

            $scope.cr[d.attribute]="";

            //console.log(d, nodeData.attributes);
        });
        //$scope.showButtons=true;
        //console.log(nodeData.attributes);

        //nodeData.attributes.forEach(function(d){
            //console.log(d);
        //});
        $scope.showButtons=true
        //console.log($scope.nodeDictionaryAttributes,$scope.cr);


    }


    $scope.loadNodeFields=function(){
        //console.log($scope.nodetypeselect);
        //console.log($scope.actAttributes);
        //console.log($scope.actAttributes[$scope.nodetypeselect]);
        fetchNodeValues();
        //getNextNodeID();
        //console.log(nodeAttributeDictionary[$scope.nodetypeselect].attributeGroups[y].attributes);
    }

    // function getNextNodeID()
    // {

        

    //     $http.get('/apollo/api/neo/nextnodeid/'+$scope.nodetypeselect).then(function(res) {
    //         //console.log(res.data);
    //         var nextNodeIDInt=parseInt(res.data)+1;
            

    //         if($scope.nodeLabel=="Organization")
    //         {
    //             $scope.nextNodeID="O"+nextNodeIDInt.toString();
    //         }
    //         else if($scope.nodeLabel=="Program")
    //         {
    //             $scope.nextNodeID="P"+nextNodeIDInt.toString();
    //         }
    //         else if($scope.nodeLabel=="SurveillanceSystem")
    //         {
    //             $scope.nextNodeID="SS"+nextNodeIDInt.toString();
    //         }
    //         else if($scope.nodeLabel=="Tool")
    //         {
    //             $scope.nextNodeID="TL"+nextNodeIDInt.toString();
    //         }
    //         else if($scope.nodeLabel=="Registry")
    //         {
    //             i$scope.nextNodeID="RG"+nextNodeIDInt.toString();
    //         }
    //         else if($scope.nodeLabel=="HealthSurvey")
    //         {
    //             $scope.nextNodeID="HS"+nextNodeIDInt.toString();
    //         }
    //         else if($scope.nodeLabel=="Collaborative")
    //         {
    //             $scope.nextNodeID="CO"+nextNodeIDInt.toString();
    //         }
    //         else if($scope.nodeLabel=="Dataset")
    //         {
    //             $scope.nextNodeID="DSET"+nextNodeIDInt.toString();
    //         }
    //         else if($scope.nodeLabel=="DataStandard")
    //         {
    //             $scope.nextNodeID="DSTD"+nextNodeIDInt.toString();
    //         }
    //         else if($scope.nodeLabel=="Tag")
    //         {
    //             $scope.nextNodeID="TAG"+nextNodeIDInt.toString();
    //         }

    //         //console.log($scope.nextNodeID);

    //     });

    // }

    $scope.deleterelrow=function(id){

        //console.log($scope.relvalues);

        

        var x=arrayObjectIndexOf($scope.relvalues, id, "relid"); // 1

        //console.log(x);

        ($scope.relvalues).splice(x,1);

        //console.log($scope.relvalues);
        
        //$scope.$apply;
    }


    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    function fetchDictionary()
    {
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
            //console.log($scope.actAttributes);
    }

    fetchDictionary();


    $scope.postaddcr=function(){


        if($scope.cr['name'].trim()=="")
        {
            $scope.highlightMissingTxt=true;
        }
        else
        {
            //var nodeDataString=$scope.nodeKeyValues;//JSON.stringify($scope.nodeKeyValues);
            //console.log($scope.cr, );

            //var currentdate = new Date(); 
            $scope.cr['CR_NODE_TYPE']=$scope.nodeLabel;
            $scope.cr['CR_REQUEST_TYPE']="ADD";
            $scope.cr['CR_STATUS']="PENDING";
            $scope.cr['CR_USER_DN_CREATE']=$scope.identity.currentUser.displayName;
            $scope.cr['CR_USER_ID_CREATE']=$scope.identity.currentUser._id;
            $scope.cr['CR_USER_EMAIL_CREATE']=$scope.identity.currentUser.email;
            $scope.cr['CR_USER_DN_EDIT']="";
            $scope.cr['CR_USER_ID_EDIT']="";
            $scope.cr['CR_USER_EMAIL_EDIT']="";
            $scope.cr['CR_USER_DN_EXECUTE']="";
            $scope.cr['CR_USER_ID_EXECUTE']="";
            $scope.cr['CR_USER_EMAIL_EXECUTE']="";
            $scope.cr['CR_DATE_CREATED']="";
            $scope.cr['CR_DATE_EDITED']="";
            $scope.cr['CR_DATE_EXECUTED']="";

            $scope.cr['id']=$scope.nextNodeID;
            var datapacket={};
            datapacket['attr']=$scope.cr;
            datapacket['rels']=$scope.relvalues;
            $http.post('/apollo/api/mongo/postaddcr', datapacket).
            //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
              success(function(data, status, headers, config) { 
                //console.log("success");
                $scope.node="";
                $scope.showButtons=false;
                $scope.crQueueSuccess=true;
              }).error(function(data, status) {
                  //console.log("err");
                    $scope.node="";
                    $scope.showButtons=false;
                    $scope.crQueueFail=true;
            });
        }


        //console.log(datapacket);

    };

    //     $scope.postdeletecr=function(){



    //     //var nodeDataString=$scope.nodeKeyValues;//JSON.stringify($scope.nodeKeyValues);
    //     //console.log($scope.cr, );

    //     //var currentdate = new Date(); 

    //     $scope.cr['CR_NODE_TYPE']=$scope.nodeLabel;
    //     $scope.cr['CR_USER']="Tom";
    //     $scope.cr['CR_DATE']= new Date().getTime();
    //     $scope.cr['CR_REQUEST_TYPE']="DELETE";
    //     $scope.cr['CR_STATUS']="PENDING";
    //     $scope.cr['CR_DATE_CREATED']=new Date().getTime();

    //     $http.post('/apollo/api/mongo/postdeletecr', $scope.cr).
    //     //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
    //       success(function(data, status, headers, config) { 
    //         //console.log("success");
    //         $scope.node="";
    //         $scope.showButtons=false;
    //         $scope.crQueueSuccess=true;
    //       }).error(function(data, status) {
    //           //console.log("err");
    //           $scope.node="";
    //           $scope.showButtons=false;
    //           $scope.crQueueFail=true;

    //     });

    // };


    $scope.startNodeSelected=function($item){
        //console.log("start",$item.id, $scope.node);
        $scope.startNodeId=$item.id;
        $scope.startnode=$item.displayname;


        //checkNewRel();
    };

    $scope.endNodeSelected=function($item){
        //console.log("end",$item.id);
        $scope.endNodeId=$item.id;
        $scope.endnode=$item.displayname;
        //checkNewRel();
    };



    $scope.addRel = function(){
        
        if(($scope.endNodeId==$scope.nextNodeID || $scope.startNodeId==$scope.nextNodeID) && ($scope.endNodeId!="" && $scope.startNodeId!="") && ($scope.relselect!="")&& ($scope.relselect!=null))
        {
                

            if($scope.relationshipDescription=="")
            {
                $scope.relationshipDescription="n/a";
            }

            if($scope.endNodeId==$scope.nodeId || $scope.endNodeId==$scope.nextNodeID)
            {
                $scope.relvalues.push({aname:$scope.cr.name,aid:$scope.nextNodeID,bname:$scope.startnode,bid:$scope.startNodeId,relid:$scope.i++,reltype:$scope.relselect,startid:$scope.startNodeId,startname:$scope.startnode,endid:$scope.endNodeId,endname:$scope.endnode,reldesc:$scope.relationshipDescription});   
            }
            else
            {
                $scope.relvalues.push({aname:$scope.cr.name,aid:$scope.nextNodeID,bname:$scope.endnode,bid:$scope.endNodeId,relid:$scope.i++,reltype:$scope.relselect,startid:$scope.startNodeId,startname:$scope.startnode,endid:$scope.endNodeId,endname:$scope.endnode,reldesc:$scope.relationshipDescription});
            }

            $scope.startnode="";
            $scope.startNodeId="";

            $scope.endnode="";
            $scope.endNodeId="";

            $scope.relselect="";
            
            $scope.relationshipDescription="";
            $scope.relCheckBox.fromNewNode=false;
            $scope.relCheckBox.toNewNode=false;
            $scope.showErrMsg=false;

        }
        else
        {
            
            $scope.showErrMsg=true;
        }
        //console.log($scope.relvalues);
        
    }

    $scope.setRelValueFrom = function(){


        if($scope.relCheckBox.fromNewNode)
        {
            $scope.startNodeId=$scope.nextNodeID;
            $scope.startnode=$scope.cr['name'];
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
            $scope.endNodeId=$scope.nextNodeID;
            $scope.endnode=$scope.cr['name'];
        }
        else
        {
            $scope.endNodeId="";
            $scope.endnode="";
        }

    }

}]);
