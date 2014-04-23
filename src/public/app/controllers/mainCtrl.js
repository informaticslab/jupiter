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
         $scope.buildNumber = res.data.buildNumber;              
       });
    $scope.toCapitalizedWords  = function toCapitalizedWords(name) {
    //var words = name.match(/[A-Za-z][a-z]*/g);
    var words = name.match(/^[a-z]+|[A-Z][a-z]*/g);
    return words.map(capitalize).join(" ");
    };

    function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
    }

});