angular.module('apolloApp').controller('navBarLoginCtrl',function($scope,$http,ngIdentity,ngNotifier,ngAuth,$location){ 
	$scope.identity = ngIdentity;
	$scope.signin =function(username, password){
		ngAuth.authenticateUser(username,password).then(function(success) {
			if(success) {
				if($scope.identity.currentUser.isAdmin()){
					$location.path('/adminCRQueue');
				}
				else if($scope.identity.currentUser.isSU()){
					$location.path('/adminCRAdd');
				}
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
});