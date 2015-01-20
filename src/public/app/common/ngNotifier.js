angular.module('apolloApp').value('ngToastr',toastr);

angular.module('apolloApp').factory('ngNotifier',function(ngToastr) {
	return {
		notify: function(msg) {
			ngToastr.success(msg);
			console.log(msg);
		}
	}
})