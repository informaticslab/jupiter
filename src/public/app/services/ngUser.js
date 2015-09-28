angular.module('jupiterApp').factory('ngUser',function($resource,$location) {
	var userResource;

	if($location.protocol() == 'https'){
		userResource = $resource('/jupiter/api/getpiv')
		
	}
	else {
		userResource = $resource('/api/users/:id', {_id: "@id"});
	
	}

	// userResource = $resource('/api/users/:id',{_id:"@id"});
	
	userResource.prototype.isLevelThree = function() {
		return this.roles && this.roles.levelThree;

	}

	userResource.prototype.isLevelTwo = function() {
		return this.roles && this.roles.levelTwo;
	}

	userResource.prototype.isLevelOne = function() {
		return this.roles && this.roles.levelOne;
	}

	return userResource;
});