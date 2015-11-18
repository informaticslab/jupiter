'use strict';
angular.module('jupiterApp').controller('dataMatch3Ctrl', function($scope, $http,$modal,mergedData){

	$scope.validDataSets = true;
	$scope.ds1Id = '';
	$scope.ds2Id = '';
	$scope.mergedList = [];
	$scope.isCollapsed = true;
	$scope.showResults = false;
	$scope.datafile1 = {
		dsId : '',
		data: '',
		cols: []
	};
	$scope.datafile2 = {
		dsId : '',
		data: '',
		cols: []
	}

	
	// $scope.gridOptions = {
	//     enableSorting: true,
	//     columnDefs: [],
	//     data : [];
	//     onRegisterApi: function( gridApi ) {
	//       $scope.gridApi = gridApi;
	//       $scope.gridApi.core.on.sortChanged( $scope, function( grid, sort ) {
	//         $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
	//       })
	//     }
 //  	};
  
 	$scope.mergedList = mergedData.getMergedList();
 	$scope.mergedDatasets = mergedData.getMergedDataset();
	$scope.mergedCols = mergedData.getMergedCols();
  	
  
     $scope.resetStatus = function() {
     	$scope.showResults = false;
     };

	$scope.backToMatch2 = function() {
		location.href = "#/dataMatch2";
	}
	$scope.openGridModal = function(nodeId) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/previewGrid',
                controller: 'previewGridCtrl',
                //size: 'lg',
                windowClass : 'preview-modal',
                resolve: {
                    nodeId: function() {
                        return nodeId;
                    }
                }
            });
    };



  //   function getValueSet(data,column,reset) {
  //   	var lookup = {};
		// if (reset) {
		// 	$scope.valuesets[column] = null;
		// }

		// for (var row, i = 0; row = data[i++];) {
		//   var value = row[column];

		//   if (!(value in lookup)) {
		//     lookup[value] = 1;
		//   }
		// }
		// $scope.valuesets[column] = Object.keys(lookup);
  //   }

    function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
	}
  
});