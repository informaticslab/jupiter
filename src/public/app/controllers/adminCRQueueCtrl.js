angular.module('apolloApp').controller('adminCRQueueCtrl', ['$scope', '$http','nodeAttributeDictionary',
	function($scope,$http,nodeAttributeDictionary) {

    
    
    

    
    $scope.init=function()
    {

        $scope.mongoDocumentsAll=[];
        $scope.crtSelect="";
        $scope.crtOpen=false;
        $scope.crFilterModel='';
        $scope.crStatusModel='PENDING';
        $scope.crAddCount=0;
        $scope.crDeleteCount=0;
        $scope.crUpdateCount=0;
        $scope.hover=false;

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

    $scope.deleteCR = function(id){
        console.log(id);
        mongoid={mongoid:id};

        $http.post('/apollo/api/mongo/deletecr', mongoid).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) { 
                $scope.init();
          }).error(function(data, status) {
              
        });

    };


}]);


