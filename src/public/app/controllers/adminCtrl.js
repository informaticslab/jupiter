angular.module('apolloApp').controller('adminCtrl', ['$scope', '$http','nodeAttributeDictionary',
	function($scope,$http,nodeAttributeDictionary) {
   	$scope.itemSelected = function($item, $model, $label, id) {

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
		               		}
                		}

                		//console.log(d, nodeData.attributes);
                	});

                	//console.log(nodeData.attributes);

                	//nodeData.attributes.forEach(function(d){
                		//console.log(d);
                	//});

            	});
            	

            });
	};

}]);


