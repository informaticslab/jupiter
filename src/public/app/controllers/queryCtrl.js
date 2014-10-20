angular.module('apolloApp').controller('queryCtrl', function($scope,$resource,$location,$http,$routeParams,$timeout){

$scope.reltypes="";
$scope.chkrels={};
$scope.chkactvs={};


$scope.itemSelected = function($item, $model, $label) {
        $scope.nodeId = $item.id;
        console.log($scope.nodeId);

};



var relationships = $resource('/apollo/api/relationships/all', {
});

var rels = relationships.query({
},function(result){
if (!result.nullset)
{
	$scope.reltypes=result;
	result.forEach(function(d) {
		//console.log(d);
		$scope.chkrels[d.relname]=false;
	}
	);

	//console.log("1",$scope.validatedarr,$scope.statsarr);
}

});

var nodetypes = $resource('/apollo/api/activitytypes/all', {
});

var nt = nodetypes.query({
},function(result){
if (!result.nullset)
{
	$scope.activitytypes=result;
	result.forEach(function(d) {
		$scope.chkactvs[d.nodetypes]=false;
	});
	
}

});


$scope.values=function(){
		for (var key in $scope.chkactvs) {
			//if($scope.chkactvs[key])
		  console.log(key, $scope.chkactvs[key]);
		}

		for (var key in $scope.chkrels) {
			//if($scope.chkactvs[key])
		  console.log(key, $scope.chkrels[key]);
		}

	}

});


