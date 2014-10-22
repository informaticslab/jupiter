angular.module('apolloApp').controller('queryCtrl', function($scope,$resource,$location,$http,$routeParams,$timeout){

$scope.reltypes="";
$scope.chkrels={};
$scope.chkactvs={};

$scope.q_actname=true;
$scope.q_rel=true;
$scope.q_search=true;
$scope.q_acttypes=false;
$scope.q_results=true;
$scope.nextrelbtndisabled=true;
$scope.nextactbtndisabled=true;
$scope.searchbtndisabled=true;
$scope.actnamestatus=false;
$scope.textboxcount=[];
var txtboxcount=1;

$scope.textboxcount.push({"txtboxcount":txtboxcount});
//$scope.textboxcount.push({"1"});



$scope.itemSelected = function($item, $model, $label) {
        $scope.nodeId = $item.id;
        console.log($scope.nodeId);
        $scope.actnamestatus=true;
        $scope.checksearchbtnstatus();

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
		
		var nodeid=$scope.nodeId;
		var ndtypes="";
		var retypes="";

		for (var key in $scope.chkrels) {
			if($scope.chkrels[key])
		  	{
		  		//console.log(key, $scope.chkrels[key]);
		  		
		  		retypes=retypes+"-"+key+"|";
		  	}
		}

		retypes=retypes.replace(/(^\|)|(\|$)/g, "");

		for (var key in $scope.chkactvs) {
			if($scope.chkactvs[key])
		  	{
		  		//console.log(key, $scope.chkactvs[key]);
		  		ndtypes=ndtypes+"'"+key+"',";
		  	}
		}
		ndtypes=ndtypes.replace(/(^,)|(,$)/g, "");

		

		//console.log(nodeid+"+"+ndtypes+"+"+retypes);

		var queryresults = $resource('/apollo/api/adhoc/'+nodeid+"+"+ndtypes+"+"+retypes, {
		});

		var q = queryresults.query({
		},function(result){
		if (!result.nullset)
		{
			//console.log(result);
			// if(result.trim()=="")
			// 	console.label("No Results");
			$scope.adhocresults=result;


			// result.forEach(function(d){
   //              console.log(d.bname,d.bid,d.rel);
   //          });    
			
		}
	});



	}


$scope.nextrels=function(){
	$scope.q_rel=false;

}

$scope.nextactname=function(){
	$scope.q_actname=false;
}

$scope.checkrelbtnstatus=function(){
	$scope.nextrelbtndisabled=true;
	for (var key in $scope.chkactvs) {
		//console.log(key,$scope.chkactvs[key]);
		if($scope.chkactvs[key])
	  	{
	  		$scope.nextrelbtndisabled=false;
	  		
	  	}
	}
	$scope.checksearchbtnstatus();
	
}


$scope.checkactbtnstatus=function(){
	$scope.nextactbtndisabled=true;
	for (var key in $scope.chkrels) {
		//console.log(key,$scope.chkrels[key]);
		if($scope.chkrels[key])
	  	{
	  		$scope.nextactbtndisabled=false;
	  		
	  	}
	}
	$scope.checksearchbtnstatus();
}

$scope.checksearchbtnstatus=function(){
	//$scope.nextsearchbtndisabled=true;
	console.log($scope.nextactbtndisabled ,$scope.nextrelbtndisabled , $scope.actnamestatus)
	if(!$scope.nextactbtndisabled && !$scope.nextrelbtndisabled && $scope.actnamestatus)
  	{
  		$scope.searchbtndisabled=false;
  		
  	}
  	else
  	{
  		$scope.searchbtndisabled=true;
  	}
	
}

$scope.addtxtbox=function(){
	//$scope.nextsearchbtndisabled=true;
	txtboxcount=txtboxcount+1;
	$scope.textboxcount.push({"txtboxcount":txtboxcount});
	
}



});//angular


