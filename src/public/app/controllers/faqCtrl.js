angular.module('apolloApp').controller('faqCtrl', function($scope,$location,$window){
    $scope.rayes = 'sunny';
    $scope.$parent.q = 'faq';



    console.log("before",$location.absUrl());
	console.log("before",$location.protocol());

    if($location.protocol()=="http")
    {
    	var protocol=$location.protocol();
    	var absUrl=$location.absUrl();
    	var host=$location.host();
    	var port = $location.port();
    	var path = $location.path();


    	var redirectUrl="https://"+host+":4400/apollo/#"+path;
	    
	    console.log( absUrl,redirectUrl);

	    //absUrl=absUrl.replace('http', 'https');
	    //absUrl=absUrl.replace('8089', '4400');

	    //console.log( absUrl);

    	//$location.protocol("https");
    	$window.location.href=redirectUrl;
    }
    console.log("after",$location.absUrl());
	console.log("after",$location.protocol());

});

