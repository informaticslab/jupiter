'use strict';
angular.module('jupiterApp').controller('dataMatch2Ctrl', function($scope, $http,$modal,$timeout,mergedData){

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
	$scope.valueCount = 0;
	$scope.gridOptions = {
	    enableSorting: true,
	    enableFiltering: true,
  	    columnDefs: [],
	    data : [],
	    enableGridMenu: true,
	    enableColumnResizing:true, 
	    enableVerticalScrollbar:2, 
	    enableHorizontalScrollbar:2
	};
  
 	$scope.columnDefs = [];
 	$scope.previewDataset = [];
 	$scope.previewMode = false;
 	$scope.selectedCol = null;

	$scope.mergedDatasets = mergedData.getMergedDataset();
	$scope.mergedCols = mergedData.getMergedCols();
	//console.log($scope.mergedCols);
	$timeout(function() {
		buildColDefs();
		$scope.gridOptions.data = $scope.mergedDatasets;
		$scope.gridOptions.columnDefs = $scope.columnDefs; 
	});

	function buildColDefs() { 
  		for (var i = 0; i < $scope.mergedCols.length; i++ ) {
	  		var oneColDef = {};
	  		oneColDef['minWidth'] = '100';
	  		oneColDef['width'] = '130';
	  		if ($scope.mergedCols[i].sortOrder == 0) {
	  			oneColDef['field'] = $scope.mergedCols[i].col;
	  			oneColDef['headerCellClass'] = 'mergedColor';
	  			
	  			// oneColDef['cellClass'] =  function(grid, row, col, rowRenderIndex, colRenderIndex) {
			      //   if (grid.getCellValue(row ,col).toLowerCase() === 'male') {
			      //     return 'red';
			      //   }
			      //}

	  		}
	  		else if ($scope.mergedCols[i].sortOrder == 1) { // dataset 1 cols
	  			oneColDef['field'] = $scope.mergedCols[i].renamedCol;
	  			oneColDef['headerCellClass'] = 'set1Color';
	  			oneColDef['enableFiltering'] = false;
	  		}
	  		else if ($scope.mergedCols[i].sortOrder == 2) {  // dataset 2 cols
	  			oneColDef['field'] = $scope.mergedCols[i].renamedCol;
	  			oneColDef['headerCellClass'] = 'set2Color';
	  			oneColDef['enableFiltering'] = false;

	  		}
	  		$scope.columnDefs.push(oneColDef);
  		}
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

    function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
	}
	
	$scope.scrollTo = function( rowIndex, colIndex ) {
      $scope.gridApi.core.scrollTo( $scope.gridOptions.data[rowIndex], $scope.gridOptions.columnDefs[colIndex]);
    };
 

	$scope.getTableHeight = function(grid,id) {
       var rowHeight = 30; // your row height
       var headerHeight = 30; // your header height
       $('.ui-grid-viewport').height("100%")
       //console.log(grid,id);
       //if (id.split('_')[1] ==='0') {
          return {
              //height: ((grid.dailyData.length+1) * rowHeight + headerHeight-12) + "px"
              height: ((grid.dailyData.length * rowHeight)+38)+"px"
            };
       //}
       // else {
       // return {
       //    height: (grid.dailyData.length * rowHeight + headerHeight) + "px" };
       // }
    };

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

    $scope.colSelected = function() {
    	//console.log($scope.selectedCol);
    }


    $scope.getValueCount = function() {
    	var count = 0;
    	for(var i = 0; i< $scope.mergedDatasets.length; i++) {
    		if ($scope.mergedDatasets[i][$scope.selectedCol.col] == $scope.searchValue) {
    			count++
    		}
    	}
    	$scope.valueCount = count;
    }

    function getColIdx(colName) {
    	for(var i = 0; i < $scope.columnDefs.length; i++) {
    		if ($scope.columnDefs[i].field === colName) {
    			break;
    		}
    	}
    	return i;
    }

    $scope.previewUpdateColValue = function(col,oldValue,newValue) {
    	var rowIndex = 0;
    	var colIndex = getColIdx(col);
    	var previewDataset = [];
    	var tempColdefs =  angular.copy($scope.columnDefs);
    	for (var i=0; i < $scope.mergedDatasets.length; i++) {
    		if ($scope.mergedDatasets[i][col] === oldValue) {
    			 var oneRow = angular.copy($scope.mergedDatasets[i]);
    			 oneRow[col] = oldValue + ' -> ' + newValue;
    			 previewDataset.push(oneRow);
    		}
    	}
    	tempColdefs[colIndex]['cellClass'] = 'valueChangedColor';
    	$scope.gridOptions.columnDefs = tempColdefs;
    	$scope.gridOptions.data = previewDataset;
    }

    $scope.setNewValues = function() {
    	var searchObj = {};
    	searchObj[$scope.selectedCol.col] = $scope.searchValue;
    	var mylist = _.where($scope.mergedDatasets, searchObj);
    	for (var i=0; i < mylist.length; i++) {
    		mylist[i][$scope.selectedCol.col] = $scope.newValue;
    	}
    	// save current data just in case user goes back to previous screen for more merge
    	mergedData.setMergedDataset($scope.mergedDatasets);
    	$scope.gridOptions.columnDefs = $scope.columnDefs;
    	$scope.gridOptions.data = $scope.mergedDatasets;
    	resetSearchParms();
    	$scope.previewMode = false;

    }

    $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope
      $scope.gridApi = gridApi;
      
      
    };

    $scope.showPreviewValues = function() {
    	$scope.previewMode = true;
    	$scope.previewUpdateColValue($scope.selectedCol.col,$scope.searchValue,$scope.newValue);
    }

    $scope.cancelPreviewValues = function() {
    	$scope.previewMode = false;
    	$scope.gridOptions.columnDefs = $scope.columnDefs;
    	$scope.gridOptions.data = $scope.mergedDatasets;
    }

    $scope.valuesFilled = function() {
    	return (!_.isEmpty($scope.selectedCol) && !_.isEmpty($scope.searchValue) && !_.isEmpty($scope.newValue));
   }

   function resetSearchParms() {
   	 $scope.selectedCol = null;
   	 $scope.searchValue = '';
   	 $scope.newValue = ''
   }
    
});