angular.module('jupiterApp').factory('ngIdentity', function($window, ngUser,$location) {
	var currentUser;
	// if($location.protocol() == 'https') {
	// 	currentUser = new ngUser();
	// }
	// else if(!!$window.bootstrappedUserObject) {
	// 	currentUser = new ngUser();
	// 	angular.extend(currentUser, $window.bootstrappedUserObject);
	// }
	if (!!$window.bootstrappedUserObject) {
		currentUser = new ngUser();
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return{
		currentUser: currentUser,
		isAuthenticated: function() {
			return !!this.currentUser;
		},

		isAuthorized: function(role){

			if (role == 'levelThree') {
				return !!this.currentUser && this.currentUser.roles.levelThree;
			}
			if (role == 'levelTwo') {
				return !!this.currentUser && this.currentUser.roles.levelTwo;
			}
			if (role == 'levelOne') {
				return !!this.currentUser && this.currentUser.roles.levelOne;
			}
			if (role == 'levelTwoOrThree') {
				return !!this.currentUser && (this.currentUser.roles.levelThree || this.currentUser.roles.levelTwo);
			}
			
		},

		dbUserId: function(){
			return this.currentUser._id;
		}
	}
});