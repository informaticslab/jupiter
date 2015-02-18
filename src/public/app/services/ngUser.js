angular.module('apolloApp').factory('ngUser',function($resource,$location) {
	var userResource;

	if($location.protocol() == 'https'){
		userResource = $resource('/apollo/api/getpiv')
		
	}
	else {
		userResource = $resource('/api/users/:id', {_id: "@id"});
	
	}

	// userResource = $resource('/api/users/:id',{_id:"@id"});
	
	userResource.prototype.isAdmin = function() {
		return this.roles && this.roles.indexOf('admin') > -1;

	}

	userResource.prototype.isSU = function() {
		return this.roles && this.roles.indexOf('su') > -1;
	}


	return userResource;
});