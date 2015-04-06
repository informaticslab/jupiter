angular.module('apolloApp').controller('mainCtrl', function($scope,$resource,$location,$http){
	$scope.$parent.q = 'home';
    $scope.rays = 'sunshine';
    $scope.latestChanges = [];
    $scope.crType = [];

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


	$http.get('/apollo/api/mongo/latestChanges').then(function(res) {
		$scope.latestChanges = res.data;
		
		//$scope.latestChanges.crdata.CR_REQUEST_TYPE.toLowerCase();
		console.log(res.data);
	})


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

	//set the 1st carousel button as selected by default when the page is loaded.
	$('#carouselBtn1').addClass('active');

    $scope.goToCarousel1 = function(){
    	$scope.carousel1 = "yes";
    	$scope.carousel2 = "no";
    	$scope.carousel3 = "no";
		$scope.carousel4 = "no";

		$('#carouselBtn1').addClass('active');
		$('#carouselBtn2').removeClass('active');
		$('#carouselBtn3').removeClass('active');
		$('#carouselBtn4').removeClass('active');
    }
    
    $scope.goToCarousel2 = function(){
    	$scope.carousel1 = "no";
    	$scope.carousel2 = "yes";
    	$scope.carousel3 = "no";
		$scope.carousel4 = "no";

		$('#carouselBtn1').removeClass('active');
		$('#carouselBtn2').addClass('active');
		$('#carouselBtn3').removeClass('active');
		$('#carouselBtn4').removeClass('active');
    }
    
    $scope.goToCarousel3 = function(){
    	$scope.carousel1 = "no";
    	$scope.carousel2 = "no";
    	$scope.carousel3 = "yes";
		$scope.carousel4 = "no";

		$('#carouselBtn1').removeClass('active');
		$('#carouselBtn2').removeClass('active');
		$('#carouselBtn3').addClass('active');
		$('#carouselBtn4').removeClass('active');
    }

    $scope.goToCarousel4 = function(){
    	$scope.carousel1 = "no";
    	$scope.carousel2 = "no";
    	$scope.carousel3 = "no";
		$scope.carousel4 = "yes";

		$('#carouselBtn1').removeClass('active');
		$('#carouselBtn2').removeClass('active');
		$('#carouselBtn3').removeClass('active');
		$('#carouselBtn4').addClass('active');
    }

    $scope.goForwardInCarousel = function(){
		if ($scope.carousel1 == "yes") {
			
			eval($scope.goToCarousel2());
		}
		else if ($scope.carousel2 == "yes") {
			
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
		else if ($scope.carousel2 == "yes") {
			
			eval($scope.goToCarousel1());
		}
		else if ($scope.carousel3 == "yes") {
    		
    		eval($scope.goToCarousel2());
		}
   		else if ($scope.carousel4 == "yes") {
    		
    		eval($scope.goToCarousel3());
		}
	}
	// var site = {
 //          'name':'Home',
 //          'url':$location.absUrl()
 //        }
	// $scope.$parent.unshiftSiteHistory(site);
	//console.log($scope.$parent.browseHistory)
});
