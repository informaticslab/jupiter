angular.module('jupiterApp').controller('uploadCtrl', function($scope, FileUploader,$modal, $modalInstance, nodeId, $http, $route, ngNotifier) {
    
	var uploader = $scope.uploader = new FileUploader({
		url:'/api/fileUpload',
        formData:nodeId
	});

    var uploaderWithDE = $scope.uploaderWithDE = new FileUploader({
        url:'/api/fileUploadWithMetadata',
        formData:nodeId
    });

    uploader.onCompleteAll = function() {
        $scope.ok();
    };

    $scope.ok = function() {
        $modalInstance.close();
         $route.reload();
        ngNotifier.notifySuccess('Successfully uploaded data file.');
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };


});