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


	//Display teh appropriate content in the carousel depending on the carousel button selections
	$scope.carousel1 = "yes";
	$scope.carousel2 = "no";
	$scope.carousel3 = "no";
	$scope.carousel4 = "no";
	//function for displaying the selected carousel
    $scope.goToCarousel1 = function(){
    	$scope.carousel1 = "yes";
    	$scope.carousel2 = "no";
    	$scope.carousel3 = "no";
		$scope.carousel4 = "no";
    }
    
    $scope.goToCarousel2 = function(){
    	$scope.carousel1 = "no";
    	$scope.carousel2 = "yes";
    	$scope.carousel3 = "no";
		$scope.carousel4 = "no";
    }
    
    $scope.goToCarousel3 = function(){
    	$scope.carousel1 = "no";
    	$scope.carousel2 = "no";
    	$scope.carousel3 = "yes";
		$scope.carousel4 = "no";
    }

    $scope.goToCarousel4 = function(){
    	$scope.carousel1 = "no";
    	$scope.carousel2 = "no";
    	$scope.carousel3 = "no";
		$scope.carousel4 = "yes";
    }

    $scope.goForwardInCarousel = function(){
		if ($scope.carousel1 == "yes") {
			
			eval($scope.goToCarousel2());
		}
		if ($scope.carousel2 == "yes") {
			
			eval($scope.goToCarousel3());
		}
		else if ($scope.carousel3 == "yes") {
    		
    		eval($scope.goToCarousel4());
		}
   		else if ($scope.carousel4 == "yes") {
    		
    		eval($scope.goToCarousel1());
		}
	}

	$scope.goBackwardInCarousel = function(){
		if ($scope.carousel1 == "yes") {
			
			eval($scope.goToCarousel4());
		}
		if ($scope.carousel2 == "yes") {
			
			eval($scope.goToCarousel1());
		}
		else if ($scope.carousel3 == "yes") {
    		
    		eval($scope.goToCarousel2());
		}
   		else if ($scope.carousel4 == "yes") {
    		
    		eval($scope.goToCarousel3());
		}
	}
});
