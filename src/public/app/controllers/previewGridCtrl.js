angular.module('jupiterApp').controller('previewGridCtrl', function($scope,$modal, $modalInstance, nodeId, $http) {
	$scope.previewData;
	$scope.datasetId = nodeId;
	$scope.gridOptions = {
		columnDefs : [],
		enableGridMenu: true,
		enableSelectAll: true
	};
	$http.get('/api/getDataFile'+nodeId).then(function(res) {
		$scope.previewData = res.data;
		var cols = Object.keys($scope.previewData[0]);
		for(col in cols) {
				console.log(col);
				var oneCol = {};
				oneCol.name = cols[col];
				oneCol.width = '*';
				console.log(oneCol);
				$scope.gridOptions.columnDefs.push(oneCol);
			
		}
		
		$scope.gridOptions.data = $scope.previewData;

	});

	 $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});