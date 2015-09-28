angular.module('jupiterApp').controller('adminRightsCtrl', ['$scope', '$modal','$location','$http','nodeAttributeDictionary','ngIdentity','ngNotifier',
	function($scope,$modal,$location,$http,nodeAttributeDictionary,ngIdentity,ngNotifier) {
    $scope.identity = ngIdentity;

    var init = function(){

    $scope.RightsBtnLabl="Right";
    $scope.ProviderBtnLabl="User Type";

    

    var cacheRenew=new Date().getTime();
    $http.get('/api/mongo/users/all'+'?'+cacheRenew).then(function(res) {
            $scope.usersAll=res.data;
            //console.log($scope.usersAll);

            for(user in $scope.usersAll)
            {
              //console.log($scope.usersAll[user].roles);
            }
           
    });

    $scope.isActive = function(route) {
        return route === $location.path();
    };

    $scope.updateRights = function(user,right,rightValue)
    {
      //console.log(user,right,rightValue);
      //console.log(test);

      var datapacket={};
      datapacket.user=user;
      datapacket.right=right;
      datapacket.value=rightValue;
      datapacket.adminUserId = $scope.identity.currentUser._id;
      datapacket.adminUserDisplayName = $scope.identity.currentUser.displayName;
      

      var cacheRenew=new Date().getTime();
      $http.post('/api/mongo/users/updateRights', datapacket).
        //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
        success(function(data, status, headers, config) { 
            //console.log(data);
            if(data=="success")
            {
              ngNotifier.notify('Rights updated');
              //init();
            }
            else if(data=="no change")
            {
              ngNotifier.notify('No change was made to rights of this user');
            }
            else
            {
              ngNotifier.notify('Could not update rights. Please try again later.');
              init();
            }

        }).error(function(data, status) {
        //console.log("err");
      });

    }

  }//init function


  init();

  $scope.setFilterProvider=function(provider)
  {
    if(provider=="")
    {
      $scope.filterProvider=undefined;
    }
    $scope.filterProvider=provider;

  }

  $scope.setFilterRight=function(right)
  {
    $scope.filterRight={};
    
    if(right=="")
    {
      $scope.filterRight=undefined;
    }
    else
    {
      $scope.filterRight[right]=true;
    }

    //console.log($scope.filterRight);
  }


}]);

