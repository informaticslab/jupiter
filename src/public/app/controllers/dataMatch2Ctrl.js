'use strict';
angular.module('jupiterApp').controller('dataMatch2Ctrl', function($scope, $http,$modal,mergedData){

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
  
 	$scope.columnDefs = [];
	$scope.mergedDatasets = mergedData.getMergedDataset();
	
	$scope.valuesets = [];
	$scope.mergedCols = mergedData.getMergedCols();
  	for (var i = 0; i < $scope.mergedCols.length; i++ ) {
  		var oneColDef = {};

  		if ($scope.mergedCols[i].sortOrder == 0) {
  			oneColDef['field'] = $scope.mergedCols[i].col;
  			oneColDef['headerCellClass'] = 'mergedColor';
  		}
  		else if ($scope.mergedCols[i].sortOrder == 1) { // dataset 1 cols
  			oneColDef['field'] = $scope.mergedCols[i].renamedCol;
  			oneColDef['headerCellClass'] = 'set1Color';
  		}
  		else if ($scope.mergedCols[i].sortOrder == 2) {  // dataset 2 cols
  			oneColDef['field'] = $scope.mergedCols[i].renamedCol;
  			oneColDef['headerCellClass'] = 'set2Color';
  		}
  		$scope.columnDefs.push(oneColDef);
  	}

	
	// $scope.setDataSet1 = function($item) {

	//     $scope.ds1Id = $item.id;
	//     $scope.datafile1.dsId = $item.id;
	//     $http.get('/api/getDataFile'+$scope.ds1Id).then(function(res) {
	// 		$scope.datafile1['data'] = res.data;
	// 		var cols = Object.keys($scope.datafile1.data[0]);
	// 		for(var col in cols) {
	// 			$scope.datafile1['cols'].push(cols[col]);
	// 		}
	// 		console.log('ds 1 cols ', $scope.datafile1.cols);	
	// 	})
 //     };

  //    $scope.setDataSet2 = function($item) {
  //       $scope.ds2Id = $item.id;
  //       $scope.datafile2.dsId = $item.id;
  //       $http.get('/api/getDataFile'+$scope.ds2Id).then(function(res) {
  //      		$scope.datafile2.data = res.data;
       		
		// 	var cols = Object.keys($scope.datafile2.data[0]);
		// //	console.log(cols);
		// 	for(var col in cols) {
		// 		$scope.datafile2.cols.push(cols[col]);
		// 	}	
			
		// })
  //    };

  $scope.showValueSet =  function () {
  		location.href = "#/dataMatch3";
  }
     $scope.resetStatus = function() {
     	$scope.showResults = false;
     };

	$scope.previousPage = function(page) {
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

    function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
	}
  
});