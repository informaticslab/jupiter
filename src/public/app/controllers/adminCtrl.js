angular.module('apolloApp').controller('adminCtrl', ['$scope', '$http','$filter','nodeAttributeDictionary',
	function($scope,$http,$filter,nodeAttributeDictionary) {


    $scope.cr={};
    $scope.showButtons=false;
    $scope.nodeLabel="";
    $scope.crQueueSuccess=false;
    $scope.crQueueFail=false;
   	$scope.itemSelected = function($item, $model, $label, id) {
            $scope.crQueueSuccess=false;
            $scope.crQueueFail=false;
			$scope.nodeId = $item.id;
			//console.log($scope.nodeId,$item,$model,$label);

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


            $http.get('/apollo/api/node/relationships/' + $scope.nodeId).then(function(res) {
                $scope.relvalues=res.data;
                //$scope.relarray=[];

                var i=1;
                $scope.relvalues.forEach(function(d){
                    //$scope.relarray.push({'relid':i,'aid':d.aid,'bid':d.bid,'startid':d.startid,'endid':d.endid,'type':d.reltype});
                    d['relid']=i;
                    i++;
                });
                console.log($scope.relvalues);


            });


            
	};



    $scope.deleterelrow=function(id){

        console.log($scope.relvalues);

        

        var x=arrayObjectIndexOf($scope.relvalues, id, "relid"); // 1

        console.log(x);

        ($scope.relvalues).splice(x,1);

        console.log($scope.relvalues);
        
        //$scope.$apply;
    }


    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }


    $scope.postupdatecr=function(){



        //var nodeDataString=$scope.nodeKeyValues;//JSON.stringify($scope.nodeKeyValues);
        //console.log($scope.cr, );

        //var currentdate = new Date(); 
        $scope.cr['CR_NODE_TYPE']=$scope.nodeLabel;
        $scope.cr['CR_USER']="Tom";
        $scope.cr['CR_DATE']= new Date().getTime();
        $scope.cr['CR_REQUEST_TYPE']="UPDATE";
        $scope.cr['CR_STATUS']="PENDING";

        var datapacket={};
        datapacket['attr']=$scope.cr;
        datapacket['rels']=$scope.relvalues;
        $http.post('/apollo/api/mongo/postupdatecr', datapacket).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) { 
            console.log("success");
            $scope.node="";
            $scope.showButtons=false;
            $scope.crQueueSuccess=true;
          }).error(function(data, status) {
              console.log("err");
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


        $http.post('/apollo/api/mongo/postdeletecr', $scope.cr).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) { 
            console.log("success");
            $scope.node="";
            $scope.showButtons=false;
            $scope.crQueueSuccess=true;
          }).error(function(data, status) {
              console.log("err");
              $scope.node="";
              $scope.showButtons=false;
              $scope.crQueueFail=true;

        });

    };

}]);


