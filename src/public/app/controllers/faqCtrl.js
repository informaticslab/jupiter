angular.module('apolloApp').controller('faqCtrl', function($scope,$location,$window){
    $scope.rayes = 'sunny';
    $scope.$parent.q = 'faq';



        console.log($location.absUrl());
	console.log($location.protocol());

    if($location.protocol()=="http")
    {
    	var absUrl=$location.absUrl();
	    console.log( absUrl,$location.protocol());

	    absUrl=absUrl.replace('http', 'https');
	    absUrl=absUrl.replace('8089', '443');

	    console.log( absUrl);

    	//$location.protocol("https");
    	$window.location.href=absUrl;
    }
    console.log($location.absUrl());
	console.log($location.protocol());

});

