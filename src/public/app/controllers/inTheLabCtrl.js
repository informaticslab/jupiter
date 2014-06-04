angular.module('apolloApp').controller('inTheLabCtrl', function($scope){
    $scope.rayes = 'sunny';
    $scope.$parent.q = 'explore';

	var site = {
      'name':'In The lab',
      'url':$location.absUrl()
    }
    $scope.$parent.browseHistory.sites.push(site);
});

