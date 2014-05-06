angular.module('apolloApp').controller('mainCtrl', function($scope,$resource){
	$scope.$parent.q = 'home';
    $scope.rays = 'sunshine';



	var portalstats = $resource('/apollo/api/stats', {
	});


	var stats = portalstats.query({
	},function(result){
	if (!result.nullset)
	{
		$scope.statsarr=result;
	}

	});

});