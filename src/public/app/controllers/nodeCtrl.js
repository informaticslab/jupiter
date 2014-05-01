angular.module('apolloApp').controller('nodeCtrl', function($scope, $resource, $http, $routeParams) {
    $scope.contentLoading = true;
    
    $scope.$parent.q = 'explore';
    var node = $resource('/apollo/api/node/:id', {
        id: '@id'
    });

    var labels = $http.get('/apollo/api/node/' + $routeParams.id + '/labels')
        .success(function(data){
            $scope.labels = data;
        });

    var relations = $resource('/apollo/api/node/:id/relations', {
        id: '@id'
    });

    // $scope.node = node.get({
    //     id: $routeParams.id
    // });

    var splitArr1 = [];
    var splitArr2 = [];
    var nodeDetails = $http.get('/apollo/api/node/' + $routeParams.id)
        .success(function(data){
            $scope.node = data;
            // window.alert("The total number of attributes are:"+$scope.node.attributes.length);
           
            var len = $scope.node.attributes.length;
            for (var i = 0; i< len; i++) {
                if(i%2 == 0){
                    splitArr1.push($scope.node.attributes[i]);
                }
                else{
                    splitArr2.push($scope.node.attributes[i]);
                }
            };

            $scope.splitArr1 = splitArr1.slice(0);
            $scope.splitArr2 = splitArr2;
            // window.alert("The len of splitArr1 is:"+$scope.splitArr1.length);
            // window.alert("The len of splitArr2 is:"+$scope.splitArr2.length);

            window.alert("Test printing one of the values from splitArr1. The ID is:"+$scope.splitArr1);


        });

   
    $scope.relations = relations.query({
        id: $routeParams.id
    },function(){
        $scope.contentLoading = false;
    });

    $scope.nodeId = $routeParams.id
});
