angular.module('jupiterApp').controller('previewGridCtrl', function($scope,$modal, $modalInstance, nodeId, $http) {
	$scope.previewData;

	$http.get('/api/getDataFile'+nodeId).then(function(res) {
	    if(res.data!="empty")
	    {
	        $scope.csvData = res.data;
	    }

	});

	 $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});