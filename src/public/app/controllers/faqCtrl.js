angular.module('apolloApp').controller('faqCtrl', function($scope,$location,$window){
    $scope.rayes = 'sunny';
    $scope.$parent.q = 'faq';


$http.get('/apollo/api/piv').then(function(res) {
		console.log(res);
	});

});

