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

    $scope.splitArr1 = [];
    $scope.splitArr2 = [];
    $scope.splitArr3 = [];
   
    var nodeDetails = $http.get('/apollo/api/node/' + $routeParams.id)
        .success(function(data){
            $scope.node = data;
            
            var len = $scope.node.attributes.length;
            var tmpArr = [];
            for (var i = 0; i< len; i++) {
               
                if ($scope.node.attributes[i].value == '') {}
                else if(($scope.node.attributes[i].key == 'name') || ($scope.node.attributes[i].key == 'id') || ($scope.node.attributes[i].key == 'fullNameCIO') || ($scope.node.attributes[i].key == 'fullName') || ($scope.node.attributes[i].key == 'purpose')) {
                    // do nothing
                    if($scope.node.attributes[i].key == 'purpose'){
                        $scope.splitArr3.push($scope.node.attributes[i]);
                    }
                }
                else{
                    tmpArr.push($scope.node.attributes[i]);
                }
            };
            for (var i = 0; i< tmpArr.length; i++) {
               if(i%2 == 0){
                    $scope.splitArr1.push(tmpArr[i]);
               }
               else{
                    $scope.splitArr2.push(tmpArr[i]);
               }
            };

        });

   
    $scope.relations = relations.query({
        id: $routeParams.id
    },function(data){
        for (var i = 0; i < data.length; i++)
        {
            if (data[i].name == 'Tag')
            {
                $scope.nodeTags = data[i].relTypes[0].nodes;
                $scope.hasTags = true;
            }
        }
        $scope.contentLoading = false;
    });

    $scope.nodeId = $routeParams.id
});
