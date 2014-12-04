angular.module('apolloApp').controller('adminCtrl', ['$scope', '$http','nodeAttributeDictionary',
	function($scope,$http,nodeAttributeDictionary) {


    $scope.cr={};
    $scope.showButtons=false;
    $scope.nodeLabel="";
    $scope.crQueueSuccess=false;
    $scope.crQueueFail=false;
   	$scope.itemSelected = function($item, $model, $label, id) {
            $scope.crQueueSuccess=false;
            $scope.crQueueFail=false;
			$scope.nodeId = $item.id;
			console.log($scope.nodeId,$item,$model,$label);

		    $scope.actAttributes = {};
			for (x in nodeAttributeDictionary) {
				//console.log("**"+x);
				$scope.actAttributes[x] = [];
				for (y in nodeAttributeDictionary[x].attributeGroups) {
					for (z in nodeAttributeDictionary[x].attributeGroups[y].attributes) {
						$scope.actAttributes[x].push("" + z + "");
					}
				} //$scope.nodeattributes.x
			}

			$http.get('/apollo/api/node/' + $scope.nodeId).then(function(res) {
                console.log(res.data);
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


            
	};




    $scope.postcr=function(){



        //var nodeDataString=$scope.nodeKeyValues;//JSON.stringify($scope.nodeKeyValues);
        //console.log($scope.cr, );

        //var currentdate = new Date(); 
        $scope.cr['CR_NODE_TYPE']=$scope.nodeLabel;
        $scope.cr['CR_USER']="Tom";
        $scope.cr['CR_DATE']= new Date().getTime();
        $scope.cr['CR_REQUEST_TYPE']="UPDATE";
        $scope.cr['CR_STATUS']="PENDING";

        $http.post('/apollo/api/mongo/postcr', $scope.cr).
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

        $scope.deletecr=function(){



        //var nodeDataString=$scope.nodeKeyValues;//JSON.stringify($scope.nodeKeyValues);
        //console.log($scope.cr, );

        //var currentdate = new Date(); 

        $scope.cr['CR_NODE_TYPE']=$scope.nodeLabel;
        $scope.cr['CR_USER']="Tom";
        $scope.cr['CR_DATE']= new Date().getTime();
        $scope.cr['CR_REQUEST_TYPE']="DELETE";
        $scope.cr['CR_STATUS']="PENDING";


        $http.post('/apollo/api/mongo/deletecr', $scope.cr).
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


