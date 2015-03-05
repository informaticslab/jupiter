angular.module('apolloApp').controller('adminRightsCtrl', ['$scope', '$modal','$http','nodeAttributeDictionary','ngIdentity','ngNotifier',
	function($scope,$modal,$http,nodeAttributeDictionary,ngIdentity,ngNotifier) {


    var init = function(){

    var cacheRenew=new Date().getTime();
    $http.get('/apollo/api/mongo/users/all'+'?'+cacheRenew).then(function(res) {
            $scope.usersAll=res.data;
            //console.log($scope.usersAll);

            for(user in $scope.usersAll)
            {
              //console.log($scope.usersAll[user].roles);
            }
           
    });

    $scope.updateRights = function(user,right,rightValue)
    {
      //console.log(user,right,rightValue);
      //console.log(test);

      var datapacket={};
      datapacket.user=user;
      datapacket.right=right;
      datapacket.value=rightValue;

      var cacheRenew=new Date().getTime();
      $http.post('/apollo/api/mongo/users/updateRights', datapacket).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
        success(function(data, status, headers, config) { 
            console.log(data);
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
}]);

