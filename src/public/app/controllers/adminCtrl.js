angular.module('apolloApp').controller('adminCtrl', ['$scope','$modal', '$http','$filter','$routeParams','$location','nodeAttributeDictionary','nodeRelationshipDictionary', 'ngIdentity',
	function($scope,$modal,$http,$filter,$routeParams,$location,nodeAttributeDictionary,nodeRelationshipDictionary,ngIdentity) {


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


    $scope.identity = ngIdentity;
    $scope.cr={};
    $scope.showButtons=false;
    $scope.nodeLabel="";
    $scope.crQueueSuccess=false;
    $scope.crQueueFail=false;
    
    $scope.endNodeId="";
    $scope.startNodeId="";
    $scope.relselect="";
    $scope.hover=false;
    $scope.showErrMsg=false;

    $scope.relationshipDescription="";

    //console.log(nodeRelationshipDictionary.RelationshipTypes);
    $scope.relValues=nodeRelationshipDictionary.RelationshipTypes;
    
    if($routeParams.id)
    {
        $scope.nodeId = $routeParams.id;
        $scope.crQueueSuccess=false;
        $scope.crQueueFail=false;

        fetchNodeValues();
        fetchRelationshipValues();
        //$scope.itemSelected();
    }
    
   	$scope.itemSelected = function($item, $model, $label, id) {
            $scope.crQueueSuccess=false;
            $scope.crQueueFail=false;
			$scope.nodeId = $item.id;
			//console.log($scope.nodeId,$item,$model,$label);

	       $location.path('/adminCREdit/'+$scope.nodeId);
            fetchNodeValues();
            fetchRelationshipValues();   
	};


    function fetchRelationshipValues(){
                    $http.get('/apollo/api/node/relationships/' + $scope.nodeId).then(function(res) {
                $scope.relvalues=res.data;
                //$scope.relarray=[];

                var i=1;
                $scope.relvalues.forEach(function(d){
                    //$scope.relarray.push({'relid':i,'aid':d.aid,'bid':d.bid,'startid':d.startid,'endid':d.endid,'type':d.reltype});
                    d['relid']=i;
                    i++;
                });
                //console.log($scope.relvalues);


            });
    }

    function fetchNodeValues(){
        $http.get('/apollo/api/node/' + $scope.nodeId).then(function(res) {
            //console.log(res.data);
            var nodeData = res.data;
            $http.get('/apollo/api/node/'+ $scope.nodeId +'/labels').then(function(res1) {
                $scope.nodeLabel=res1.data[0];
                $scope.nodeDictionaryAttributes=$scope.actAttributes[res1.data[0]];

                //console.log(nodeData.attributes[0].key);
                $scope.nodeKeyValues=[];
                $scope.nodeDictionaryAttributes.forEach(function(d){
                    for(na in nodeData.attributes)
                    {
                        var key = nodeData.attributes[na].key;
                        var value = nodeData.attributes[na].value;
                        if(key==d)
                        {
                            //console.log(value);
                            $scope.nodeKeyValues.push({"key":key,"value":value})
                            $scope.cr[key]=value;
                        }
                        if(key=="name")
                        {
                            $scope.node=value;
                        }
                    }

                    //console.log(d, nodeData.attributes);
                });
                $scope.showButtons=true;
                //console.log(nodeData.attributes);

                //nodeData.attributes.forEach(function(d){
                    //console.log(d);
                //});

            });
            

        });
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
                        $scope.actAttributes[x].push("" + z + "");
                        //for getting attribute names 
                        // var attname=$filter('unCamelCase')(z);
                        // //console.log("x="+x+", z=" + attname + ", des="+nodeAttributeDictionary[x].attributeGroups[y].attributes[z].description);
                    }
                } //$scope.nodeattributes.x
            }
    }

    fetchDictionary();


    $scope.postupdatecr=function(){



        //var nodeDataString=$scope.nodeKeyValues;//JSON.stringify($scope.nodeKeyValues);
        //console.log($scope.cr, );

        //var currentdate = new Date(); 
        $scope.cr['CR_NODE_TYPE']=$scope.nodeLabel;
        $scope.cr['CR_USER']="Tom";
        $scope.cr['CR_DATE']= new Date().getTime();
        $scope.cr['CR_REQUEST_TYPE']="UPDATE";
        $scope.cr['CR_STATUS']="PENDING";
        $scope.cr['CR_DATE_CREATED']=new Date().getTime();

        var datapacket={};
        datapacket['attr']=$scope.cr;
        datapacket['rels']=$scope.relvalues;
        $http.post('/apollo/api/mongo/postupdatecr', datapacket).
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

    };

        $scope.postdeletecr=function(){



        //var nodeDataString=$scope.nodeKeyValues;//JSON.stringify($scope.nodeKeyValues);
        //console.log($scope.cr, );

        //var currentdate = new Date(); 

        $scope.cr['CR_NODE_TYPE']=$scope.nodeLabel;
        $scope.cr['CR_USER']="Tom";
        $scope.cr['CR_DATE']= new Date().getTime();
        $scope.cr['CR_REQUEST_TYPE']="DELETE";
        $scope.cr['CR_STATUS']="PENDING";
        $scope.cr['CR_DATE_CREATED']=new Date().getTime();

        $http.post('/apollo/api/mongo/postdeletecr', $scope.cr).
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

    };


    $scope.startNodeSelected=function($item){
        //console.log("start",$item.id);
        $scope.startNodeId=$item.id;

        //checkNewRel();
    };

    $scope.endNodeSelected=function($item){
        //console.log("end",$item.id);
        $scope.endNodeId=$item.id;
        //checkNewRel();
    };



    $scope.addRel = function(){
        //console.log($scope.relvalues);
        if(($scope.endNodeId==$scope.nodeId || $scope.startNodeId==$scope.nodeId) && ($scope.endNodeId!="" && $scope.startNodeId!="") && ($scope.relselect!="")&& ($scope.relselect!=null))
        {
                
            if($scope.relationshipDescription=="")
            {
                $scope.relationshipDescription="N/A";
            }

            if($scope.endNodeId==$scope.nodeId)
            {
                $scope.relvalues.push({aname:$scope.node,aid:$scope.nodeId,bname:$scope.startnode,bid:$scope.startNodeId,relid:$scope.relvalues.length,reltype:$scope.relselect,startid:$scope.startNodeId,startname:$scope.startnode,endid:$scope.endNodeId,endname:$scope.endnode,reldesc:$scope.relationshipDescription});   
            }
            else
            {
                $scope.relvalues.push({aname:$scope.node,aid:$scope.nodeId,bname:$scope.endnode,bid:$scope.endNodeId,relid:$scope.relvalues.length,reltype:$scope.relselect,startid:$scope.startNodeId,startname:$scope.startnode,endid:$scope.endNodeId,endname:$scope.endnode,reldesc:$scope.relationshipDescription});
            }

            $scope.startnode="";
            $scope.startNodeId="";

            $scope.endnode="";
            $scope.endNodeId="";

            $scope.relselect="";
            
            $scope.showErrMsg=false;

        }
        else
        {
            
            $scope.showErrMsg=true;
        }

        
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
