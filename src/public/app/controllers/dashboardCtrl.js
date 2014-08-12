angular.module('apolloApp').controller('dashboardCtrl', function($scope,$resource,$location){

   	var nodestotal=0;
   	//var nodestotal=0;

	var portalstatsnodes = $resource('/apollo/api/stats/nodes', {
	});

	statsarr={};
	validatedarr={};


	var stats = portalstatsnodes.query({
	},function(result){
	if (!result.nullset)
	{
		result.forEach(function(d) {
		statsarr[d.label[0]]=d.count;
		}
		);

		$scope.statsarr=statsarr;

		$scope.checkcomplete();

		//console.log("1",$scope.validatedarr,$scope.statsarr);
	}

	});


	var portalstatsrelations = $resource('/apollo/api/stats/nodesvalidated', {
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
		$scope.checkcomplete();

		//console.log("2",$scope.validatedarr,$scope.statsarr);
	}

	});


	$scope.checkcomplete=function(){

		var totvalidatearr={};

		if($scope.validatedarr!=undefined & $scope.statsarr!=undefined)
		{
			


			for(d in statsarr)
			{
				totvalidatearr[d]=Math.round(((statsarr[d]-validatedarr[d])/statsarr[d])*100);
			}

			$scope.totvalidatearr=totvalidatearr;

			//console.log("3",totvalidatearr);
		}
	}



	



});
