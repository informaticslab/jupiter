angular.module('jupiterApp').factory('ngAuth', function($http, ngIdentity, $q, ngUser, $location) {
	return{
		authenticateUser: function(email,password){
			var dfd = $q.defer();
			$http.post('/login',{email:email, password: password}).then(function(response) {
			//console.log(userName);
			//console.log(response.data.success)
			if(response.data.success) {
				var user = new ngUser();
				
				angular.extend(user, response.data.user);
				//console.log(user);
				ngIdentity.currentUser = user;
				dfd.resolve(true);

			} else {
				dfd.resolve(false);
			}
		});

		return dfd.promise;

		},

		createUser: function(newUserData) {
			var newUser = new ngUser(newUserData);
			var dfd = $q.defer();

			$http.post('/api/saveUser',newUser).then(function(res) {
				if(res.data.success){
					dfd.resolve(true);
				} else {
					dfd.resolve(false);
				}
				
			});

			return dfd.promise;
		},

		logoutUser: function(){
			var dfd = $q.defer();
			$http.post('/logout', {logout:true}).then(function() { 
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
		},
		autheticateUserPiv : function(){
			var dfd = $q.defer();
			$http.get('/api/getpiv').then(function(res){
				if(res.data.success) {

					var user = new ngUser();
					angular.extend(user, res.data.user);
					//console.log(res.data.success);
					//console.log(user);

					ngIdentity.currentUser = user;
					
					//console.log(res);
					//console.log(ngIdentity.currentUser.isLevelThree());
					dfd.resolve(true);
					// if(res != null){

	    //       		$location.path('/adminCRQueue');
	    //     		}
				}
				else {
					dfd.resolve(false);
				}
				
			});
			return dfd.promise;
		}
	}
})