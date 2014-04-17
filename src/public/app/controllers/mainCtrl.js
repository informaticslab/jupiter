angular.module('apolloApp').controller('mainCtrl', function($scope){
	$scope.$parent.q = 'home';
    $scope.rays = 'sunshine';
});

angular.module('apolloApp').controller('rootCtrl', function($scope){
    $scope.q = 'explore';
});