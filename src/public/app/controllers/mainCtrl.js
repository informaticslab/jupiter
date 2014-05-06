angular.module('apolloApp').controller('mainCtrl', function($scope,$resource){
	$scope.$parent.q = 'home';
    $scope.rays = 'sunshine';

	var portalstats = $resource('/apollo/api/stats', {
	});

	var stats = portalstats.query({
	},function(result,r1){
	if (!result.nullset)
	{
		console.log(r1);
		$scope.statsarr=result;
		result.forEach(function(d) {
		//console.log(d.label[0],d.count);
		});
	}

	});

});