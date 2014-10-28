angular.module('apolloApp').controller('queryCtrl', function($scope,$resource,$location,$http,$routeParams,$timeout){

$scope.reltypes="";
$scope.chkrels={};
$scope.chkactvs={};

$scope.q_actname=false;
$scope.q_rel=false;
$scope.q_search=false;
$scope.q_acttypes=false;
$scope.q_results=true;
$scope.nextrelbtndisabled=true;
$scope.nextactbtndisabled=true;
$scope.searchbtndisabled=true;
$scope.actnamestatus=false;
$scope.textboxcount=[];
var tbxcount=0;
$scope.txtboxcount=[];
$scope.txtboxval={};
$scope.txtboxcount.push({"tcount":tbxcount});

$scope.totalItems = 0;
$scope.currentPage = 1;
$scope.maxSize = 10;
$scope.itemsPerPage=10;
//$scope.bigTotalItems = 175;
//$scope.bigCurrentPage = 1;

var nodeidtracker={};


//$scope.textboxcount.push({"1"});



$scope.itemSelected = function($item, $model, $label,id) {

        $scope.nodeId = $item.id;
        //console.log(id,$scope.nodeId+'**'+$item+'**'+ $model+'**'+ $label);
        nodeidtracker[id]=$item.id;
        $scope.actnamestatus=true;
        $scope.checksearchbtnstatus();

        //console.log(nodeidtracker);



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
		var ndnames="";

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

		var ndids="";
		$scope.txtboxcount.forEach(function(d,i){
			


			var ndid=nodeidtracker["stxt_"+d.tcount];

			if(ndid.trim()=="")
			{

			}
			else
			{
				ndids=ndids+"'"+ndid+"',";
			}
			
		
		});

		ndids=ndids.replace(/(^,)|(,$)/g, "");

		//console.log(nodeid+"+"+ndtypes+"+"+retypes);

		var queryresults = $resource('/apollo/api/adhoc/'+ndids+"+"+ndtypes+"+"+retypes, {
		});

		var q = queryresults.query({
		},function(result){
		if (!result.nullset)
		{
			//console.log(result);
			// if(result.trim()=="")
			console.label(result.length);
			$scope.adhocresults=result;
			$scope.q_results=false;

			


			// result.forEach(function(d){
   //              //console.log(d.bname,d.bid,d.rel);
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
	//console.log($scope.nextactbtndisabled ,$scope.nextrelbtndisabled , $scope.actnamestatus)
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
	tbxcount=tbxcount+1;
	$scope.txtboxcount.push({"tcount":tbxcount});

}

$scope.removetxtbox=function(id){
	$scope.txtboxcount.forEach(function(d,i){
		if(d.tcount==id)
		$scope.txtboxcount.splice(i,1);
	});

}

$scope.getrelatedactivitytypes=function(){
		
		var nodeid=$scope.nodeId;
		var ndtypes="";
		var retypes="";
		var ndnames="";



		for (var key in $scope.chkactvs) {
			if($scope.chkactvs[key])
		  	{
		  		//console.log(key, $scope.chkactvs[key]);
		  		ndtypes=ndtypes+"'"+key+"',";
		  	}
		}
		ndtypes=ndtypes.replace(/(^,)|(,$)/g, "");

		var ndids="";
		$scope.txtboxcount.forEach(function(d,i){
			


			var ndid=nodeidtracker["stxt_"+d.tcount];

			if(ndid.trim()=="")
			{

			}
			else
			{
				ndids=ndids+"'"+ndid+"',";
			}
			
		
		});

		ndids=ndids.replace(/(^,)|(,$)/g, "");

		//console.log(nodeid+"+"+ndtypes+"+"+retypes);

		var queryresults = $resource('/apollo/api/adhoc/relatednoodetypes/'+ndids+"+"+ndtypes, {
		});

		var q = queryresults.query({
		},function(result){
		if (!result.nullset)
		{
			//console.log(result);
			// if(result.trim()=="")
			//	console.label("No Results");
			$scope.q_results=false;

			$scope.adhocresults=result;
			$scope.adhocresultsactve=$scope.adhocresults;
			$scope.totalItems=$scope.adhocresultsactve.length;
			$scope.currentPage=1;
			$scope.pageChanged();
			$scope.adhocresultsdirect=[];
			$scope.adhocresultsindirect=[];
			for(i=0;i<result.length;i++)
		    {
		    	if($scope.adhocresults[i].pathlinks.length==1)
		    		$scope.adhocresultsdirect.push($scope.adhocresults[i]);
		    	else
		    		$scope.adhocresultsindirect.push($scope.adhocresults[i]);
		    }

			//console.log(result.length);


			// result.forEach(function(d){
   //              console.log(d.pathlinks);
   //          });    
			
		}
	});



	}


$scope.showdirect=function(){
	$scope.adhocresultsactve=[];
	$scope.adhocresultsactve=$scope.adhocresultsdirect;
	$scope.totalItems=$scope.adhocresultsactve.length;
	$scope.currentPage=1;
	$scope.pageChanged();
}


$scope.showindirect=function(){
	$scope.adhocresultsactve=[];
	$scope.adhocresultsactve=$scope.adhocresultsindirect;
	$scope.totalItems=$scope.adhocresultsactve.length;
	$scope.currentPage=1;
	$scope.pageChanged();
}

  $scope.pageChanged = function() {
    //console.log('Page changed to: ' + $scope.currentPage, $scope.totalItems);

    $scope.adhocresultspag=[];

    for(i=($scope.currentPage-1)*10;(i<(($scope.currentPage-1)*10)+$scope.itemsPerPage) && (i<$scope.totalItems);i++)
    {
    	//console.log(i,$scope.adhocresults[i]);
    	$scope.adhocresultspag.push($scope.adhocresultsactve[i]);
    }
    



  };

  

});//angular


