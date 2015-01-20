angular.module('apolloApp').controller('navBarLoginCtrl',function($scope,$http,ngIdentity,ngNotifier,ngAuth,$location){ 
	$scope.identity = ngIdentity;
	$scope.signin =function(username, password){
		ngAuth.authenticateUser(username,password).then(function(success) {
			if(success) {
				ngNotifier.notify('You have successfully signed in!');
			} else {
				ngNotifier.notify('Username/password combination incorrect');
			}
		});
	}
	$scope.signout = function(){
		ngAuth.logoutUser().then(function() {
			$scope.username = "";
			$scope.password = "";
			ngNotifier.notify('You have successfully signed out.');
			$location.path('/');
		})
	}
});