angular.module('apolloApp').controller('adminRightsCtrl', ['$scope', '$modal','$http','nodeAttributeDictionary','ngIdentity',
	function($scope,$modal,$http,nodeAttributeDictionary,ngIdentity) {


    var cacheRenew=new Date().getTime();
    $http.get('/apollo/api/mongo/users/all'+'?'+cacheRenew).then(function(res) {
            $scope.usersAll=res.data;
            console.log($scope.usersAll);
           
    });

    $scope.updateRights = function(user,right,rightValue)
    {
      console.log(user,right);
      //console.log(test);

      var datapacket={};
      datapacket.user=user;
      datapacket.right=right;
      datapacket.value=rightValue;


      $http.post('/apollo/api/mongo/users/updateRights', datapacket).
        //$http({method: 'Post', url: '/apollo/api/mongo/postcr', data: {greeting: 'hi'}}).
        success(function(data, status, headers, config) { 
            if(data==("success"))
            {

            }

        }).error(function(data, status) {
        //console.log("err");
      });

    }

}]);

