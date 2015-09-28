angular.module('jupiterApp').controller('adminCRQueueCtrl', ['$scope','$modal','$location','$http','nodeAttributeDictionary','ngIdentity',
	function($scope,$modal,$location, $http,nodeAttributeDictionary,ngIdentity) {

    var checkcounter=0;
    var cacheRenew=new Date().getTime();
    $http.get('/api/node/all'+'?'+cacheRenew).then(function(res) {
      $scope.nodeNameallArray=res.data;
      //console.log($scope.nodeNameallArray);
      checkcounter++;
      if(checkcounter==2)
      {
        getSimilarities();
      }
    });



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
    //console.log("test");
    $scope.userFilter="";
    $scope.usersu=false;


    // var location = $location.path();
    // console.log(location);
    
     $scope.isActive = function(route) {
        return route === $location.path();
    }


    $scope.init=function()
    {

        if($scope.identity.currentUser.roles.levelTwo)
        {
            $scope.usersu=true;
            //$scope.userFilter="";
        }
        else
        {
            $scope.usersu=false;
            //$scope.userFilter=$scope.identity.currentUser.displayName;
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
        $http.get('/api/mongo/all'+'?'+cacheRenew).then(function(res) {
            $scope.mongoDocumentsAll=res.data;
            //console.log($scope.mongoDocumentsAll);

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
            checkcounter++;
            if(checkcounter==2)
            {
              getSimilarities();
            }
            
            
        });

        


        //$scope.crAddCount
    }


    $scope.init();

   var getSimilarities = function()
   {

      for(cr in $scope.mongoDocumentsAll)
      {
        
        var crnodename=$scope.mongoDocumentsAll[cr].name;
        var crnodeid=$scope.mongoDocumentsAll[cr].id;
        if(crnodeid==undefined || crnodeid==null || crnodeid=="")
        {
          crnodeid="TBD";
        }
        //console.log("******************",crnodename,"*******************");

        var similarNodes=[];
        //console.log($scope.nodeNameallArray);
        for(n in $scope.nodeNameallArray)
        {
          var neonodename=$scope.nodeNameallArray[n].name;

          var neonodeid=$scope.nodeNameallArray[n].id;
          if(neonodeid==crnodeid)
          {

          }
          else
          {
            if(neonodename != null){
              if(crnodename.toLowerCase()==neonodename.toLowerCase())
              {
                similarNodes.push({neonodename:neonodename,neonodeid:neonodeid,level:1});
              }
              var crnodename1=crnodename.replace(/the|\sa\s|\s/gi, function myFunction(x){return "";});
              var neonodename1=neonodename.replace(/the|\sa\s|\s/gi, function myFunction(x){return "";});
              //if(crnodename1.match(/biosense/))
              //console.log("*************",crnodename1,"**************",neonodename1);
              if(crnodename1.toLowerCase()==neonodename1.toLowerCase())
              {
                var found = false;
                for(i=0;i<similarNodes.length;i++)
                {
                  if(similarNodes[i].neonodeid==neonodeid)
                  {
                    found = true;
                  }
                }
                if(!found)
                {
                  similarNodes.push({neonodename:neonodename,neonodeid:neonodeid,level:2});  
                }
                else
                {
                  //console.log("skipped");
                }
                
              }

              var crnodename2=crnodename1.replace(/system|program|registry|survey|tool|data|dataset|standard|collaborative|element/gi, function myFunction(x){return "";});
              var neonodename2=neonodename1.replace(/system|program|registry|survey|tool|data|dataset|standard|collaborative|element/gi, function myFunction(x){return "";});
              //if(crnodename2.match(/biosense/))
              //console.log("***",crnodename2,"***",neonodename2);
              if(crnodename2.toLowerCase()==neonodename2.toLowerCase())
              {
                //console.log(crnodename2,neonodename2);
                var found = false;
                for(i=0;i<similarNodes.length;i++)
                {
                  if(similarNodes[i].neonodeid==neonodeid)
                  {
                    found = true;
                  }
                }
                if(!found)
                {
                  similarNodes.push({neonodename:neonodename,neonodeid:neonodeid,level:2});  
                }
                else
                {
                  //console.log("skipped");
                }
                
              }
            }
            
          }





        }

        var similarNodesString="Similar to: ";
        for(i=0;i<similarNodes.length;i++)
        {
          similarNodesString=similarNodesString+", "+similarNodes[i].neonodename+" ("+similarNodes[i].neonodeid+")";
        }
        if(similarNodesString=="Similar to: ")
        {
          similarNodesString="Similar to none";
        }
        //console.log(similarNodesString);
        similarNodesString=similarNodesString.replace("Similar to: , ","Similar to: ");
        $scope.mongoDocumentsAll[cr].similarities=similarNodesString;
      }
   }

    $scope.deleteCR = function(id){
        //console.log(id);
        mongoid={mongoid:id};
        mongoid.adminUserId = $scope.identity.currentUser._id;
        mongoid.adminUserDisplayName = $scope.identity.currentUser.displayName;

        $http.post('/api/mongo/deletecr', mongoid).
        //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
          success(function(data, status, headers, config) {
              if(checkcounter==2)
              {
                checkcounter--;
              }
                $scope.init();
          }).error(function(data, status) {
              
        });

    };


}]);

angular.module('jupiterApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance,doc_id) {

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

