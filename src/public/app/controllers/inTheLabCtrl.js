angular.module('apolloApp').controller('inTheLabCtrl', function($scope, $routeParams, $resource, $location){
    $scope.rayes = 'sunny';
    $scope.$parent.q = 'explore';

   	var site = {
      'name':'In The lab',
      'url':$location.absUrl()
    }
    $scope.$parent.browseHistory.sites.push(site);

    // $.getScript("/apollo/app/d3/d3-edgearc.js");
    // $.getScript("/apollo/app/d3/d3-edgeBundle.js");
});