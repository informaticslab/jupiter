angular.module('jupiterApp').controller('dashboardCtrl', function($scope,$resource,$location,$http,$routeParams,$timeout){

   	var nodestotal=0;
   	$scope.hideNodeStatus=false;
   	$scope.showAll=true;
   	$scope.showVSTableLoading=true;
   	$scope.nodedetailspresent=false;
   	$scope.hideReturnLink=true;

   	$scope.nodeId = $routeParams.id;
   	$scope.nodeNm="Overall Summary";

   	$scope.nodetype="";
   	$scope.nodesearch="";
   	//var nodestotal=0;
   	//console.log("nodis",$scope.nodeId);
   	$scope.readytoload=false;
   	

	var statsarr={};
	var validatedarr={};

	statsarr['Organization'] = 0;
	statsarr['Program'] = 0;
	statsarr['SurveillanceSystem'] = 0;
	statsarr['Tool'] = 0;
	statsarr['Registry'] = 0;
	statsarr['HealthSurvey'] = 0;
	statsarr['Collaborative'] = 0;
	statsarr['Dataset'] = 0;
	statsarr['DataStandard'] = 0;
	statsarr['Tag'] = 0;

	validatedarr['Organization'] = 0;
	validatedarr['Program'] = 0;
	validatedarr['SurveillanceSystem'] = 0;
	validatedarr['Tool'] = 0;
	validatedarr['Registry'] = 0;
	validatedarr['HealthSurvey'] = 0;
	validatedarr['Collaborative'] = 0;
	validatedarr['Dataset'] = 0;
	validatedarr['DataStandard'] = 0;
	validatedarr['Tag'] = 0;

		if($routeParams.id)
		{
			var nodeDetails = $http.get('/api/node/' + $routeParams.id).success(function(data) {
            //console.log(data.name);
            $scope.nodeNm=data.name;
            $scope.hideReturnLink=false;

        });
		}
	
getnodestatsdata=function(){
	var portalstatsnodes = $resource('/api/stats/nodes/'+$scope.nodeId, {
	});

	var stats = portalstatsnodes.query({
	},function(result){
	if (!result.nullset)
	{
		result.forEach(function(d) {
		statsarr[d.label[0]]=d.count;
		}
		);

		$scope.statsarr=statsarr;

		//console.log(statsarr);

		$scope.checkcomplete();

		//console.log("1",$scope.validatedarr,$scope.statsarr);
	}

	});

}

getnodestatsdatavalidated=function(){
	var portalstatsrelations = $resource('/api/stats/nodesvalidated/'+$scope.nodeId, {
	});

	var stats = portalstatsrelations.query({
	},function(result){
	if (!result.nullset)
	{
		result.forEach(function(d) {
		validatedarr[d.label[0]]=d.count;
		//nodestotal=nodestotal+d.count;
		}
		);
		
		$scope.validatedarr=validatedarr;

		//console.log(validatedarr);
		$scope.checkcomplete();

		
		//console.log("2",$scope.validatedarr,$scope.statsarr);

	}

	});

}
	$scope.checkcomplete=function(){

		//console.log("checkcomplete");
		
		if($scope.validatedarr!=undefined & $scope.statsarr!=undefined)
		{
			//console.log("in checkcomplete");
			//console.log("if checkcomplete");
			var totvalidatearr={};
		   	totvalidatearr['Organization'] = 0;
			totvalidatearr['Program'] = 0;
			totvalidatearr['SurveillanceSystem'] = 0;
			totvalidatearr['Tool'] = 0;
			totvalidatearr['Registry'] = 0;
			totvalidatearr['HealthSurvey'] = 0;
			totvalidatearr['Collaborative'] = 0;
			totvalidatearr['Dataset'] = 0;
			totvalidatearr['DataStandard'] = 0;
			totvalidatearr['Tag'] = 0;
			
			for(d in statsarr)
			{
				//console.log(d,statsarr[d],validatedarr[d],totvalidatearr[d]);
				
				if(statsarr[d]==0)
				{

				}
				else
				{
					totvalidatearr[d]=Math.round(((statsarr[d]-validatedarr[d])/statsarr[d])*100);
				}
				//console.log("total",d,totvalidatearr[d]);
			}

			$scope.validatedarr=validatedarr;
			$scope.totvalidatearr=totvalidatearr;

			//$scope.readytoload=false;
			$scope.readytoload=true;
			//console.log("3",$scope.statsarr, $scope.validatedarr,$scope.totvalidatearr);
			//console.log("readytoload",$scope.readytoload);
			//$timeout(loadvalidaationdata, 800);
			
			

			
		}
	}



        



	loadvalidaationdata=function(){

	var validationStatus = $resource('/api/dashboard/validationStatus/'+$scope.nodeId, {
	});

	var stats = validationStatus.query({
	},function(result){
	if (!result.nullset)
	{
		
		$scope.validationresults=result;
		$scope.showVSTableLoading=false;

	}

	});

	$timeout(getnodestatsdata, 10);
	$timeout(getnodestatsdatavalidated, 10);
	

}

$scope.itemSelected = function($item, $model, $label) {
        $scope.nodeId = $item.id;
        //console.log($item);//.nodeId);
		//console.log($model);
		//console.log($label);
        //window.location =  '/#/dashboard/' + $scope.nodeId;
        $location.path('/dashboard/' + $scope.nodeId);
        //loaddata($scope.nodeId);
};

$scope.exporttable= function()
{

	//console.log('/api/export/csv/' + $scope.nodeId+'/'+'ntype-'+$scope.nodetype+',nname='+$scope.nodesearch+',orderby='+$scope.orderByField+',asc='+$scope.reverse);
	//console.log($scope.orderByField,$scope.reverse);
	window.location =  '/api/export/csv/' + $scope.nodeId+'/'+'ntype='+$scope.nodetype+',nname='+$scope.nodesearch+',orderby='+$scope.orderByField+',asc='+$scope.reverse;
}


$scope.loadvsdata=function(id){
	//console.log(id);
	$location.path('/dashboard/' + id);
}

loadvalidaationdata();


// $scope.fetchvsdetails=function(val){

// 	//console.log(val);
// 	//var vsdetails = $http.get('/api/dashboard/validationStatusDetails/'+val, {
// 	return $http.get('/api/dashboard/validationStatusDetails/'+val).then(function(res) {
//             var nodes = [];
//             angular.forEach(res.data, function(item) {
//                 nodes.push(item);
//             });
//             $scope.nodedetails=nodes;
//             $scope.nodedetailspresent=true;
//             //console.log(nodes);
//             //return nodes;
// 	});
// };

// $scope.getNodes = function(val) {
//         return $http.get('/api/node/searchSysTreeByName/' + val).then(function(res) {
//             var nodes = [];
//             angular.forEach(res.data, function(item) {
//                 nodes.push(item);
//             });
//             return nodes;
//         });
//     };

});


