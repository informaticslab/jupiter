angular.module('apolloApp').controller('adminCRQueueCtrl', ['$scope', '$http','nodeAttributeDictionary',
	function($scope,$http,nodeAttributeDictionary) {

    $scope.mongoDocumentsAll=null;
    $scope.crtSelect="";
    $scope.crtOpen=false;

    $http.get('/apollo/api/mongo/all').then(function(res) {
        $scope.mongoDocumentsAll=res.data;



    });

    



}]);


