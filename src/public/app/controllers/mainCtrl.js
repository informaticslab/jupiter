angular.module('apolloApp').controller('mainCtrl', function($scope){
	$scope.$parent.q = 'home';
    $scope.rays = 'sunshine';
});

angular.module('apolloApp').controller('rootCtrl', function($scope, $http){
    $scope.q = 'home';
    $scope.loginuser = 'guest';
     $http.get('build.json')
       .then(function(res){
       	
       	var build = res.data
       	console.log(res.data);
          $scope.buildNumber = res.data.buildNumber;              
        });
});