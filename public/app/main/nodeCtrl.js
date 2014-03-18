angular.module('app').controller('nodeCtrl', function($scope, $http, $routeParams){
    $http.get('/api/node/' + $routeParams.id)
        .success(function(data){
            $scope.node = data;
        })
        .error(function(data){
            console.error(data);
        });
});