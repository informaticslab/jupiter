angular.module('apolloApp').value('ngToastr',toastr);

angular.module('apolloApp').factory('ngNotifier',function(ngToastr) {
	return {
		notifyError: function(msg) {
			ngToastr.options = {
				'positionClass':'toast-top-full-width',
				'timeOut' : '1800'
			};
			ngToastr.error(msg);
			//console.log(msg);
		},
		notify: function(msg) {
			ngToastr.options = {
				'positionClass':'toast-top-right',
				'timeOut' : '3000'
			};
			ngToastr.success(msg);
			//console.log(msg);
		}
	}
})