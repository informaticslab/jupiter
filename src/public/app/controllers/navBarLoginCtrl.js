angular.module('apolloApp').controller('navBarLoginCtrl',function($scope,$http,ngIdentity,ngNotifier,ngAuth,$location,$modal,$window){ 
	$scope.identity = ngIdentity;



	$scope.signin = function(email, password){
		ngAuth.authenticateUser(email,password).then(function(success) {
			
			if(success) {
				console.log($scope.identity.currentUser.isAdmin());
				if($scope.identity.currentUser.isAdmin()){
					$location.path('/adminCRQueue');
				}
				else if($scope.identity.currentUser.isSU()){
					$location.path('/adminCREdit');
				}
				console.log($scope.identity.dbUserId());
			} else {
				console.log(success);
				ngNotifier.notify('Incorrect Email/Password');
			}
		});
	}


	
    if($scope.identity.isAuthenticated()){

      $scope.signInBtn = true;
    } else if (!$scope.identity.isAuthenticated()){
      
    $scope.signInBtn = false;
    $scope.toggleSignInBtn = function() {
        $scope.signInBtn = $scope.signInBtn === false ? true: false;
    };
    }

	$scope.pivLogin = function(){   //only function is to kick off the switch to HTTPS for Certificate Authentication
		//todo
	   	var forceSsl = function () {
			$window.location.href = $location.absUrl().replace('http','https').replace('8089','4400');
		 };
		// console.log($location.protocol()); 
		// console.log($location.absUrl());
		var protocol = $location.protocol();
		console.log(protocol);

		if($location.protocol() != 'https'){
			forceSsl();
		}
		// else if($location.protocol() == 'https'){
		// 	$scope.rootCtrl.getPIVinfo();
		// }
		
	}

	$scope.signout = function(){
		ngAuth.logoutUser().then(function() {
			$scope.email = "";
			$scope.password = "";
			// ngNotifier.notify('You have successfully signed out.');
			if($location.protocol()=='https'){
				$window.location = $location.absUrl().replace('https','http').replace('4400','8089');
			}
			else{
				$location.path('/');
			}
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



