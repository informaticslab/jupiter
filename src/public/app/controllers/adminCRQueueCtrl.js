angular.module('apolloApp').controller('adminCRQueueCtrl', ['$scope', '$modal','$http','nodeAttributeDictionary','ngIdentity',
	function($scope,$modal,$http,nodeAttributeDictionary,ngIdentity) {

    $scope.open = function (docid) {

        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {
            doc_id: function () {
              return docid;
            }
          }
        });

        modalInstance.result.then(function (docid) {
            $scope.deleteCR(docid);
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
          //console.log('Modal dismissed at: ' + new Date(),$scope.selected);
        });
  };
    
    $scope.crStatusModel='PENDING';
    console.log("test");
    $scope.userFilter="";
    $scope.usersu=false;

    $scope.init=function()
    {

        if($scope.identity.currentUser.roles.indexOf("su")>=0)
        {
            $scope.usersu=true;
            $scope.userFilter="";
        }
        else
        {
            $scope.usersu=false;
            $scope.userFilter=$scope.identity.currentUser.username;
        }

        $scope.mongoDocumentsAll=[];
        $scope.crtSelect="";
        $scope.crtOpen=false;
        $scope.crFilterModel='';
        
        $scope.sortval="CR_DATE_CREATED";

        $scope.crAddCount=0;
        $scope.crDeleteCount=0;
        $scope.crUpdateCount=0;
        $scope.hover=false;
        $scope.reverse = true;
        var cacheRenew=new Date().getTime();
        $http.get('/apollo/api/mongo/all'+'?'+cacheRenew).then(function(res) {
            $scope.mongoDocumentsAll=res.data;
            //console.log($scope.mongoDocumentsAll.length);

            for (var i=0;i<$scope.mongoDocumentsAll.length;i++)
            {
                //console.log($scope.mongoDocumentsAll[i].CR_REQUEST_TYPE);
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

            // if(!$scope.$$phase) {
            //   $scope.$apply();
            // }
            

        });

        


        //$scope.crAddCount
    }


    $scope.init();

    $scope.deleteCR = function(id){
        //console.log(id);
        mongoid={mongoid:id};

        $http.post('/apollo/api/mongo/deletecr', mongoid).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) { 
                $scope.init();
          }).error(function(data, status) {
              
        });

    };


}]);

angular.module('apolloApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance,doc_id) {

  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };
  //console.log(doc_id);
  $scope.ok = function () {
    //$modalInstance.close('ok');
    $scope.$close(doc_id);
  };

  $scope.cancel = function () {
    //$modalInstance.dismiss('cancel');
    $scope.$dismiss();
  };
});

