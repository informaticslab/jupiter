angular.module('apolloApp').controller('advancedSearchCtrl', function($scope, $http, $routeParams, $resource){
	$scope.$parent.q = 'explore';
    $scope.nodeId = $routeParams.id;
    
	$scope.getNodes = function(val) {
	    return $http
	    	.get('/apollo/api/node/searchByName/' + val)
		    .then(function(res){
	      		var nodes = [];
		      	angular.forEach(res.data, function(item){
		        	nodes.push(item);
		      	});
		      return nodes; 
		    });
  	};

  	$scope.itemSelectedA = function($item, $model, $label)
  	{
		$scope.nodeAId = $item.id;
  	};
  	
	$scope.itemSelectedB = function($item, $model, $label)
  	{
		$scope.nodeBId = $item.id;
  	};
});