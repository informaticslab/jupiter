angular.module('jupiterApp').controller('adminCRRapidEntryCtrl', ['$scope', '$http','$filter','$location','nodeAttributeDictionary','nodeRelationshipDictionary','nodeTypeDictionary', 'ngIdentity',
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
    $scope.colHeaders = [];
    $scope.nodetypeselect = 'DataElement';
    $scope.oneDataElement = {};
    
 //   	$scope.itemSelected = function($item, $model, $label, id) {
 //            $scope.crQueueSuccess=false;
 //            $scope.crQueueFail=false;
	// 		$scope.nodeId = $item.id;
	// 		//console.log($scope.nodeId,$item,$model,$label);

	//        $location.path('/admin/'+$scope.nodeId);
 //            fetchNodeValues();
 //            fetchRelationshipValues();   
	// };


    function fetchDataElements(){
                $http.get('/api/node/dataElements/' + $scope.dataElementSelectedId).then(function(res) {
                $scope.dataElementsArray=res.data;

                //$scope.relarray=[];
                console.log(res.data);
                var i=1;
                $scope.dataElementsArray.forEach(function(d){
                    console.log(d);
                });
                $scope.colHeaders=Object.keys($scope.dataElementsArray[0]);
                if ($scope.dataElementsArray.length == 1 && $scope.dataElementsArray[0].id === '') {
                    $scope.dataElementsArray = [];
                }

                //$scope.dataElementsArray;
       
                //fetchNodeValues();
                // for (var i = 0; i < $scope.nodeDictionaryAttributes.length; i++) {
                //     if ($scope.nodeDictionaryAttributes[i].attribute !== 'id') {
                //         $scope.colHeaders.push({'displayLabel': $scope.nodeDictionaryAttributes[i].displayLabel});
                //     }
                // }
                // $scope.colHeaders.push({'displayLabel':'Concept'});
                // $scope.colHeaders.push({'displayLabel':'CUI'});
                //console.log($scope.relvalues);


            });
    }
    $scope.isActive = function(route) {
        return route === $location.path();
    }

    function fetchNodeValues(){

        $scope.nodeLabel=$scope.nodetypeselect;
        $scope.nodeDictionaryAttributes=$scope.actAttributes[$scope.nodeLabel];
        //console.log($scope.nodeDictionaryAttributes);
        $scope.nodeGroups=[];
        for(a in nodeAttributeDictionary[$scope.nodeLabel].attributeGroups)
        {
            $scope.nodeGroups.push(nodeAttributeDictionary[$scope.nodeLabel].attributeGroups[a]);
        }

        //$scope.nodeGroups=nodeAttributeDictionary[$scope.nodeLabel].attributeGroups;

        $scope.nodeGroupAttributes={};
        for(group in $scope.nodeGroups)
        {
            //console.log($scope.nodeGroups[group]);
            var heading=$scope.nodeGroups[group].heading;
            $scope.nodeGroupAttributes[heading]=[];
            for(attribute in $scope.nodeGroups[group].attributes)
            {
                //console.log(group,$scope.nodeGroups[group].attributes[attribute]);
                //console.log(attribute,$scope.nodeGroups[group]);
        
                $scope.nodeGroupAttributes[heading].push({attributes:$scope.nodeGroups[group].attributes[attribute],attributeName:attribute});
            }
            //$scope.nodeGroups[group].heading
            
        }
        //console.log($scope.nodeGroupAttributes);

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
  //      $scope.showButtons=true
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
            $http.post('/api/mongo/postaddcr', datapacket).
            //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
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




    $scope.setDataElement=function($item){
        //console.log("start",$item.id, $scope.node);
        $scope.dataElementSelectedId=$item.id;
        $scope.dataElementSelectedName=$item.displayname;

        console.log($scope.dataElementSelectedId,$scope.dataElementSelectedName);
        fetchDataElements();

        //checkNewRel();
    };

    $scope.addDataElement = function() {
        if (Object.keys($scope.oneDataElement).length > 0) {
            $scope.dataElementsArray.push($scope.oneDataElement);
            $scope.oneDataElement= {};
        }
    }
    $scope.deleteDataElmRow = function(index) {

        $scope.dataElementsArray.splice(index,1);

    }

    $scope.postaddcrNew=function(){


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
            $http.post('/api/mongo/postaddcr', datapacket).
            //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
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

}]);
