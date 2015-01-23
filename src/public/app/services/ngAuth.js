angular.module('apolloApp').factory('ngAuth', function($http, ngIdentity, $q, ngUser) {
	return{
		authenticateUser: function(username,password){
			var dfd = $q.defer();
			$http.post('/apollo/login',{username:username, password: password}).then(function(response) {
			//console.log(userName);
			console.log(response.data.success)
			if(response.data.success) {
				var user = new ngUser();
				angular.extend(user, response.data.user);
				ngIdentity.currentUser = user;
				dfd.resolve(true);

			} else {
				dfd.resolve(false);
			}
		});

		return dfd.promise;

		},
		logoutUser: function(){
			var dfd = $q.defer();
			$http.post('/apollo/logout', {logout:true}).then(function() { 
				ngIdentity.currentUser = undefined;
				dfd.resolve();
			});
		return dfd.promise;
		},

		authorizeCurrentUserForRoute: function(role){
			if(ngIdentity.isAuthorized(role)) {
                return true;
              } else {
                return $q.reject('not authorized');
              }
		}
	}
})