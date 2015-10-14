angular.module('jupiterApp').controller('previewGridCtrl', function($scope,$modal, $modalInstance, nodeId, $http) {
	$scope.previewData;
	console.log(nodeId);

	$http.get('/api/getDataFile'+nodeId).then(function(res) {
		$scope.previewData = res.data;

	});

	 $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});