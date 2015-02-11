angular.module('apolloApp').controller('navBarLoginCtrl',function($scope,$http,ngIdentity,ngNotifier,ngAuth,$location,$modal){ 
	$scope.identity = ngIdentity;

	
    // if($scope.identity.isAuthenticated()){

    //   $scope.signInBtn = true;
    // } else if (!$scope.identity.isAuthenticated()){
      
    // $scope.signInBtn = false;
    // $scope.toggleSignInBtn = function() {
    //     $scope.signInBtn = $scope.signInBtn === false ? true: false;
    // };
    // }

	$scope.signin =function(username, password){
		ngAuth.authenticateUser(username,password).then(function(success) {
			if(success) {
				if($scope.identity.currentUser.isAdmin()){
					$location.path('/adminCRQueue');
				}
				else if($scope.identity.currentUser.isSU()){
					$location.path('/adminCREdit');
				}
				console.log($scope.identity.dbUserId());
			} else {
				ngNotifier.notify('Incorrect Username/Password');
			}
		});

		

	}

	$scope.signout = function(){
		ngAuth.logoutUser().then(function() {
			$scope.userName = "";
			$scope.password = "";
			// ngNotifier.notify('You have successfully signed out.');
			$location.path('/');
		})
	}

	$scope.openLogin = function (size) {

      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: 'loginModalContent.html',
        controller: LoginModalInstanceCtrl,
        size: size
      });
    
  	}


});

var LoginModalInstanceCtrl = function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};