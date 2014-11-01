angular.module('apolloApp').controller('queryCtrl', ['$scope', '$location', '$resource', '$http', '$routeParams', 'nodeAttributeDictionary',
	function($scope, $location, $resource, $http, $routeParams, nodeAttributeDictionary) {

$scope.reltypes="";
$scope.chkrels={};
$scope.chkactvs={};

$scope.q_actname=false;
// $scope.q_rel=false;
// $scope.q_search=false;
$scope.q_acttypes=false;
$scope.q_results=true;
$scope.nextrelbtndisabled=true;
$scope.nextactbtndisabled=true;
$scope.dissearchbtn=true;
$scope.actnamestatus=false;
$scope.textboxcount=[];
var tbxcount=0;
$scope.txtboxcount=[];
$scope.txtboxval={};
$scope.txtboxval[0]="";
$scope.txtboxcount.push({"tcount":tbxcount});

$scope.totalItems = 0;
$scope.currentPage = 1;
$scope.maxSize = 10;
$scope.itemsPerPage=10;
$scope.tabs={};
//$scope.bigTotalItems = 175;
//$scope.bigCurrentPage = 1;

$scope.isCollapsed=true;
$scope.disadvbtn=true;
var nodeidtracker={};

$scope.lengthdirrel=0;
$scope.lengthindirrel=0;
$scope.lengthrel=0;

$scope.checkModel = {
    direct: false,
    indirect: false
  };

$scope.chkmangedonly=false;


$scope.advs={};

//console.log(nodeAttributeDictionary);
$scope.actAttributes={};
for(x in nodeAttributeDictionary)
{
	//console.log("**"+x);
	$scope.actAttributes[x]=[];
	for(y in nodeAttributeDictionary[x].attributeGroups)
	{
		for(z in nodeAttributeDictionary[x].attributeGroups[y].attributes)
		{
			$scope.actAttributes[x].push(""+z+"");
		}
	}	//$scope.nodeattributes.x
}

//console.log($scope.actAttributes);
//$scope.nodeAttributes[]

$scope.itemSelected = function($item, $model, $label,id) {

        $scope.nodeId = $item.id;
        //console.log(id,$scope.nodeId+'**'+$item+'**'+ $model+'**'+ $label);
        nodeidtracker[id]=$item.id;
        $scope.q_actname=true;
        $scope.checksearchbtnstatus();
};

$scope.adhocAttrSelected = function($item, $model, $label,id) {

        $scope.nodeId = $item.id;
        //console.log(id,$scope.nodeId+'**'+$item+'**'+ $model+'**'+ $label);
        nodeidtracker[id]=$item.id;
        $scope.q_actname=true;
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




// $scope.values=function(){
		
// 		var nodeid=$scope.nodeId;
// 		var ndtypes="";
// 		var retypes="";
// 		var ndnames="";

// 		for (var key in $scope.chkrels) {
// 			if($scope.chkrels[key])
// 		  	{
// 		  		//console.log(key, $scope.chkrels[key]);
		  		
// 		  		retypes=retypes+"-"+key+"|";
// 		  	}
// 		}

// 		retypes=retypes.replace(/(^\|)|(\|$)/g, "");

// 		for (var key in $scope.chkactvs) {
// 			if($scope.chkactvs[key])
// 		  	{
// 		  		//console.log(key, $scope.chkactvs[key]);
// 		  		ndtypes=ndtypes+"'"+key+"',";
// 		  	}
// 		}
// 		ndtypes=ndtypes.replace(/(^,)|(,$)/g, "");

// 		var ndids="";
// 		$scope.txtboxcount.forEach(function(d,i){
			


// 			var ndid=nodeidtracker["stxt_"+d.tcount];

// 			if(ndid.trim()=="")
// 			{

// 			}
// 			else
// 			{
// 				ndids=ndids+"'"+ndid+"',";
// 			}
			
		
// 		});

// 		ndids=ndids.replace(/(^,)|(,$)/g, "");

// 		//console.log(nodeid+"+"+ndtypes+"+"+retypes);

// 		var queryresults = $resource('/apollo/api/adhoc/'+ndids+"+"+ndtypes+"+"+retypes, {
// 		});

// 		var q = queryresults.query({
// 		},function(result){
// 		if (!result.nullset)
// 		{
// 			//console.log(result);
// 			// if(result.trim()=="")
// 			console.label(result.length);
// 			$scope.adhocresults=result;
// 			$scope.q_results=false;

			


// 			// result.forEach(function(d){
//    //              //console.log(d.bname,d.bid,d.rel);
//    //          });    
			
// 		}
// 	});



// 	}


$scope.setactivitytypestatus=function(){
	$scope.q_acttypes=false;
	$scope.tabs={};
	for (var key in $scope.chkactvs) {
		//console.log(key,$scope.chkactvs[key]);
		if($scope.chkactvs[key])
	  	{
	  		$scope.q_acttypes=true;
	  		$scope.disadvbtn=false;
	  		$scope.tabs[key]=true;
	  		
	  	}
	}

	if(!$scope.q_acttypes)
		$scope.isCollapsed=true;
	$scope.checksearchbtnstatus();
	//console.log("chkmangedonly",$scope.chkmangedonly);
	//console.log("set q_acttypes="+$scope.q_acttypes,$scope.tabs,$scope.chkactvs);

}



$scope.checksearchbtnstatus=function(){
	if($scope.q_actname && $scope.q_acttypes)
  	{
  		$scope.dissearchbtn=false;
  		
  	}
  	else
  	{
  		$scope.dissearchbtn=true;
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

		var adsstring="";	
		for(key in $scope.advs)
		{
			var acttype=key.split("_")[0];
			//console.log("act type from field name "+key, acttype);
			var acttypechecked=false;

			for (var key1 in $scope.tabs) {
				//console.log("act type from tabs enabled",key1,"ac type from field="+ acttype, acttypechecked);
				if(acttype==key1)
			  	{
			  		var acttypechecked=true;
			  		break;
			  		
			  	}
			}
			//console.log("AFTER CALCS act type from tabs enabled",key1,"ac type from field="+ acttype, acttypechecked);
			//console.log(acttypechecked);
			if($scope.advs[key].trim()!="" && acttypechecked)
		  	{
		  		var attname=key.split("_");
		  		adsstring=adsstring+attname[1]+'='+$scope.advs[key].toLowerCase()+",";
		  		
		  	}
		}
		adsstring = adsstring.replace(/(,$)/g, "");
		if(adsstring.trim()=="")
		{
			adsstring="NA";
		}

		
		//console.log('/apollo/api/adhoc/relatednoodetypes/'+ndids+"+"+ndtypes+"+"+adsstring);

		//console.log(nodeid+"+"+ndtypes+"+"+retypes);

		if($scope.chkmangedonly)
		{
			adsstring=adsstring+"+MO";
		}
		else
		{
			adsstring==adsstring+"+NO";
		}

		var queryresults = $resource('/apollo/api/adhoc/relatednoodetypes/'+ndids+"+"+ndtypes+"+"+adsstring, {
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
			$scope.lengthrel=$scope.adhocresults.length;
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

			console.log(result.length);
			console.log($scope.adhocresultsdirect.length);
			$scope.lengthdirrel=$scope.adhocresultsdirect.length;
			console.log($scope.adhocresultsindirect.length);
			$scope.lengthindirrel=$scope.adhocresultsindirect.length;

			// result.forEach(function(d){
   //              //console.log(d.pathlinks);
   //          });    
			
		}
		$scope.isCollapsed=true;
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
    $scope.totalItems=$scope.adhocresultsactve.length;
    $scope.adhocresultspag=[];

    for(i=($scope.currentPage-1)*10;(i<(($scope.currentPage-1)*10)+$scope.itemsPerPage) && (i<$scope.totalItems);i++)
    {
    	//console.log(i,$scope.adhocresults[i]);
    	$scope.adhocresultspag.push($scope.adhocresultsactve[i]);
    }
    
  };

  $scope.filterresults = function() {
  	console.log($scope.checkModel);
  	if($scope.checkModel.direct && $scope.checkModel.indirect )
  	{
  		$scope.adhocresultsactve=$scope.adhocresults;
  	}
  	else if($scope.checkModel.direct && !$scope.checkModel.indirect )
  	{
  		$scope.adhocresultsactve=$scope.adhocresultsdirect;
  	}
  	else if(!$scope.checkModel.direct && $scope.checkModel.indirect )
  	{
  		$scope.adhocresultsactve=$scope.adhocresultsindirect;
  	}
  	else
  	{
  		$scope.adhocresultsactve=$scope.adhocresults;
  	}
  	$scope.currentPage=1;
	$scope.pageChanged();

  };
  

  $scope.getAttributeValues = function(likeval,attr) {
  	//console.log(likeval,attr);

  	var attrarr=attr.split("_");

  	var val=attrarr[1]+"+"+attrarr[0]+"+"+likeval;
    return $http.get('/apollo/api/attributes/getValues/' + val).then(function(res) {
        var nodes = [];
        angular.forEach(res.data, function(item) {
            nodes.push(item);
        });
        return nodes;
    });
};

}]);//angular


