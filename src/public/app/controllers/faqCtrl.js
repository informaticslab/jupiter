angular.module('apolloApp').controller('faqCtrl', function($scope){
    $scope.rayes = 'sunny';
    $scope.$parent.q = 'faq';

	var site = {
      'name':'FAQ',
      'url':$location.absUrl()
    }
    $scope.$parent.unshiftSiteHistory(site);
});

