angular.module('jupiterApp').controller('quickGuideCtrl', function($scope, $location, $anchorScroll, $routeParams){
    $scope.$parent.q = 'explore';


    $scope.goToSection = function(anchorId){
    	
    	$location.hash(anchorId);
    	$anchorScroll();
    }
    
    $scope.twitterBlurb = encodeURIComponent($location.absUrl());
    var name = 'QuickGuide';
    if ($routeParams.topic!= null)
    {
        name = name + ': ' + $scope.$parent.toCapitalizedWords($routeParams.topic) ;
    }
    var site = {
  'name':name,
  'url':$location.absUrl()
}

$scope.$parent.unshiftSiteHistory(site);
$scope.emailBlurb = encodeURIComponent($location.absUrl());

});

function goBack()
{
  window.history.back();
}




