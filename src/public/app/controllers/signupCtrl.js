angular.module('apolloApp').controller('signupCtrl', function($scope,$location,ngUser,ngNotifier,ngAuth,ngIdentity) {
$scope.identity = ngIdentity;

	$scope.signup = function() {
		var newUserData = {
			email: $scope.email,
			password: $scope.password,
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			adminUserId: $scope.identity.currentUser._id,
			adminUserDisplayName: $scope.identity.currentUser.displayName
		};

		ngAuth.createUser(newUserData).then(function(success) {
			console.log(success);
			if(success){
				ngNotifier.notify('User account created!');
				$location.path('/adminRights'); //may need to redirect elsewhere
			} else {
				ngNotifier.notifyError('Duplicate Account');
			}

			
		});
	}
})