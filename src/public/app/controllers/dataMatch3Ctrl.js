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
	//console.log($scope.mergedDatasets);
	//console.log($scope.mergedCols);
  	
  
  	$scope.getColValues = function(data,col) {
  		var values = [];
  		values = _.pluck(data,col).sort();
  		// trim values before get unique.  there could be a more efficient way to do this.
  // 		String[] trimmedArray = new String[values.length];
		// for (int i = 0; i < values.length; i++) {
  //   		trimmedArray[i] = values[i].trim();
  //   	}
  		values = _.uniq(values);
  		return values;
  	};

  	//$scope.colValues = $scope.getColValues($scope.mergedDatasets,'State|State');
    
    $scope.resetStatus = function() {
     	$scope.showResults = false;
     };

	$scope.previousPage = function(page) {
		mergedData.setPreviousLoc(location.href);
    	location.href = page;
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