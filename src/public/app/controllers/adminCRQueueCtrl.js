angular.module('apolloApp').controller('adminCRQueueCtrl', ['$scope', '$http','nodeAttributeDictionary',
	function($scope,$http,nodeAttributeDictionary) {

    $scope.mongoDocumentsAll=[];
    $scope.crtSelect="";
    $scope.crtOpen=false;
    $scope.crFilterModel='';
    $scope.crStatusModel='PENDING';
    $scope.crAddCount=0;
    $scope.crDeleteCount=0;
    $scope.crUpdateCount=0;
    $scope.hover=false;
    
    

    
    $scope.init=function()
    {
        $http.get('/apollo/api/mongo/all').then(function(res) {
            $scope.mongoDocumentsAll=res.data;
            //console.log($scope.mongoDocumentsAll.length);

            for (var i=0;i<$scope.mongoDocumentsAll.length;i++)
            {
                console.log($scope.mongoDocumentsAll[i].CR_REQUEST_TYPE);
                if($scope.mongoDocumentsAll[i].CR_REQUEST_TYPE=="ADD" && $scope.mongoDocumentsAll[i].CR_STATUS=="PENDING")
                {
                    $scope.crAddCount++;
                }
                else if($scope.mongoDocumentsAll[i].CR_REQUEST_TYPE=="DELETE" && $scope.mongoDocumentsAll[i].CR_STATUS=="PENDING")
                {
                    $scope.crDeleteCount++;
                }
                else if($scope.mongoDocumentsAll[i].CR_REQUEST_TYPE=="UPDATE" && $scope.mongoDocumentsAll[i].CR_STATUS=="PENDING")
                {
                    $scope.crUpdateCount++;
                }
            }

        });

        


        //$scope.crAddCount
    }


    $scope.init();


}]);


