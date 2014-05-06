angular.module('apolloApp').controller('mainCtrl', function($scope,$resource){
	$scope.$parent.q = 'home';
    $scope.rays = 'sunshine';

   	var nodestotal=0;

	var portalstatsnodes = $resource('/apollo/api/stats/nodes', {
	});

	statsarr={};


	var stats = portalstatsnodes.query({
	},function(result){
	if (!result.nullset)
	{
		//$scope.statsarr=result;
		//console.log(result);
		result.forEach(function(d) {
		statsarr[d.label[0]]=d.count;
		nodestotal=nodestotal+d.count;
		}
		);

	
		$scope.statsarr=statsarr;
		$scope.nodestotal=nodestotal;

	}

	});


	var portalstatsrelations = $resource('/apollo/api/stats/relations', {
	});

	var stats = portalstatsrelations.query({
	},function(result){
	if (!result.nullset)
	{
		$scope.statsarrrel=result[0]['count'];

	}

	});

});