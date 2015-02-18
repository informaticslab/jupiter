angular.module('apolloApp').factory('ngIdentity', function($window, ngUser,$location) {
	var currentUser;
	if($location.protocol() == 'https') {
		currentUser = new ngUser();
	}
	else if(!!$window.bootstrappedUserObject) {
		currentUser = new ngUser();
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return{
		currentUser: currentUser,
		isAuthenticated: function() {
			return !!this.currentUser;
		},

		isAuthorized: function(role){
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		},

		dbUserId: function(){
			return this.currentUser._id;
		}
	}
});