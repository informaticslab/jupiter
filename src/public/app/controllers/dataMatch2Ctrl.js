'use strict';
angular.module('jupiterApp').controller('dataMatch2Ctrl', function($scope, $http,$modal,$timeout,mergedData,$location){

	$scope.validDataSets = true;
	$scope.ds1Id = '';
	$scope.ds2Id = '';
	$scope.isCollapsed = true;
	$scope.showResults = false;
	$scope.mergedList = mergedData.getMergedList();
	$scope.datafile1 =  mergedData.getMergedDataset('dset1');
	$scope.datafile2 =  mergedData.getMergedDataset('dset2');
	$scope.replacedList = mergedData.getValue('replacedList') || [];
	$scope.mergedDatasets = [];
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
 	$scope.mergedCols = [];
	//$scope.mergedDatasets = mergedData.getMergedDataset();
	//$scope.mergedCols = mergedData.getMergedCols();
	//console.log($scope.mergedCols);
	$timeout(function() {
		$scope.merge();
		buildColDefs();
		$scope.gridOptions.data = $scope.mergedDatasets;
		$scope.gridOptions.columnDefs = $scope.columnDefs; 
	});

	  $scope.merge = function() {
    	var checkedRows = [];
    	var uncheckedRows = [];
    	var rmvIdx = null;
    	$scope.mergedCols = [];
    	$scope.valueSets = {};
    	var maxlength = 0;
    	var combinedValueset = [];
        var excluded1 = [];
        var excluded2 = [];
        if($scope.previousLoc) {
            //$scope.mergedDatasets = mergedData.getMergedDataset();
        }

    	// build columns from 2 datasets
    	for(var i =0; i < $scope.mergedList.length; i++) {
    		if ($scope.mergedList[i].mergeChecked) {  // row checked for merging
    			// extract value set for each merged columns 
    			  var valueset1 = getValueSet($scope.datafile1.data,$scope.mergedList[i].dsDE1[0].dename,false);
    			  var valueset2 = getValueSet($scope.datafile2.data,$scope.mergedList[i].dsDE2[0].dename,false);
                  combinedValueset = _.uniq(valueset1.concat(valueset2)).sort(); // combine valuesets for later processing  
             		
       		// 	  if (valueset1.length >= valueset2.length) {
    			  // 		maxlength = valueset1.length
    			  // }
    			  // else {
    			  // 		maxlength = valueset2.length
    			  // } 
    			  // combinedValueset = [];
    			  // for (var x= 0; x < maxlength ; x++) {
    			  // 	var oneValueSetRow = {};
    			  // 	if (valueset1[x]) {
    			  // 	 	oneValueSetRow['ds1Value'] = valueset1[x];
    			  // 	 }
    			  // 	 else {
    			  // 	 	oneValueSetRow['ds1Value'] = '';
    			  // 	 }
    			  // 	if (valueset2[x]) {
    			  // 	 	oneValueSetRow['ds2Value'] = valueset2[x];
    			  // 	}
    			  // 	else {
    			  // 		oneValueSetRow['ds2Value'] = ''
    			  // 	}
    			  // 	combinedValueset.push(oneValueSetRow);
    			  // }

    			$scope.mergedCols.push({'sortOrder':0, 'col': $scope.mergedList[i].dsDE1[0].dename+' | '+$scope.mergedList[i].dsDE2[0].dename, 'valuesets': combinedValueset});
    			excluded1.push($scope.mergedList[i].dsDE1[0].dename); //remove the merged column from the dataset 1 cols list
          		excluded2.push($scope.mergedList[i].dsDE2[0].dename); //remove the merged column from the dataset 2 cols list
          	}
    		else {

    		}
    	}
    	for (var j=0; j< $scope.datafile1.cols.length; j++) {

    			if ($scope.mergedCols.indexOf($scope.datafile1.cols[j]) == -1 && excluded1.indexOf($scope.datafile1.cols[j])==-1 ) {
    				$scope.mergedCols.push({'sortOrder':1, 'col': $scope.datafile1.cols[j],'renamedCol': $scope.datafile1.cols[j]+'1', 'ds':1});
    			}
    	}
    	for (var j=0; j< $scope.datafile2.cols.length; j++) {
    			if ($scope.mergedCols.indexOf($scope.datafile2.cols[j]) == -1 && excluded2.indexOf($scope.datafile2.cols[j])==-1 ) {
    				$scope.mergedCols.push({'sortOrder':2, 'col': $scope.datafile2.cols[j],'renamedCol': $scope.datafile2.cols[j]+'2', 'ds':2})
    			}
    	}
    			
    
    	
    	// for(var i =0; i < $scope.unmatchedList.length; i++) {
    	// 	for (var j=0; j< $scope.unmatchedList[i].dsDE1.length; j++) {
    	// 			$scope.mergedCols.push({'sortOrder':2, 'col': $scope.unmatchedList[i].dsDE1[j].dename});
    	// 		}
    	// 	for (var j=0; j< $scope.unmatchedList[i].dsDE1.length; j++) {
    	// 			$scope.mergedCols.push({'sortOrder':4, 'col': $scope.unmatchedList[i].dsDE2[j].dename});
    	// 		}
    	// }
    	//$scope.mergedCols = sortByKey($scope.mergedCols, 'sortOrder');
    //	console.log($scope.mergedCols);
    	for (var i = 0; i < $scope.datafile1.data.length; i++) {
    		var oneRow = {};
    		for (var j = 0; j < $scope.mergedCols.length; j++) {
    				var orgCol = $scope.mergedCols[j].col.split('|')
    				if (orgCol.length > 1) {  // found a merged col
    					oneRow[$scope.mergedCols[j].col] = $scope.datafile1.data[i][orgCol[0].trim()];
    				}
    				else {
	    				if (($scope.datafile1.cols.indexOf(orgCol[0].trim()) != -1) && ($scope.mergedCols[j].ds == 1) ){
	    					oneRow[$scope.mergedCols[j].renamedCol] = $scope.datafile1.data[i][orgCol[0].trim()];
	    				}
	    				else {
	    					oneRow[$scope.mergedCols[j].renamedCol] = '';
	    				} 
	    				//	oneRow[$scope.mergedCols[j].col] = $scope.datafile1.data[i][orgCol[0]];
	    			}
    		}
    		$scope.mergedDatasets.push(oneRow);
    	}
    	for (var i = 0; i < $scope.datafile2.data.length; i++) {
    		var oneRow = {};
    		for (var j = 0; j < $scope.mergedCols.length; j++) {
    				var orgCol = $scope.mergedCols[j].col.split('|');
    				if (orgCol.length > 1) {  // found a merged col
    					oneRow[$scope.mergedCols[j].col] = $scope.datafile2.data[i][orgCol[1].trim()];
    				}
    				else {
    					if (($scope.datafile2.cols.indexOf(orgCol[0].trim()) != -1) && ($scope.mergedCols[j].ds == 2)) {
    						oneRow[$scope.mergedCols[j].renamedCol] = $scope.datafile2.data[i][orgCol[0].trim()];
	    				}
	    				else {
	    					oneRow[$scope.mergedCols[j].renamedCol] = '';
	 	  				} 
	 					//oneRow[$scope.mergedCols[j].col] = $scope.datafile2.data[i][orgCol[0]];
	 				}
    		}
    		$scope.mergedDatasets.push(oneRow);
    	} 	
   // 	mergedData.setMergedDataset($scope.mergedDatasets);
   // 	mergedData.setMergedCols($scope.mergedCols);
    //	mergedData.setValueSets($scope.valueSets)
    //	location.href = "#/dataMatch2";
    	

	}
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
  		$location.path('/dataMatch3');
  }
     $scope.resetStatus = function() {
     	$scope.showResults = false;
     };

	$scope.previousPage = function(page) {
		mergedData.setPreviousLoc($location.path());
		$location.path(page);
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
    	var searchObj1 = {};
    	var searchObj2 = {};
    	var searchObj = {};
    	// since this is a merged col, need to split the col to first and second cols
    	var col1 = $scope.selectedCol.col.split('|')[0];
    	var col2 = $scope.selectedCol.col.split('|')[1];
    	searchObj1[col1]  = $scope.searchValue;
    	searchObj2[col2]  = $scope.searchValue;
    	searchObj[$scope.selectedCol.col] = $scope.searchValue;
      	// update dataset 1
    	var mylist = _.where($scope.datafile1.data, searchObj1);
    	for (var i=0; i < mylist.length; i++) {
    		mylist[i][col1] = $scope.newValue;
    	}
    	mergedData.setMergedDataset($scope.datafile1,'dset1');  // save updated values
    	// update dataset 2
    	var mylist = _.where($scope.datafile2.data, searchObj2);
    	for (var i=0; i < mylist.length; i++) {
    		mylist[i][col2] = $scope.newValue;
    	}
    	mergedData.setMergedDataset($scope.datafile2,'dset2');  // save updated values 
    	var mylist = _.where($scope.mergedDatasets, searchObj);
    	for (var i=0; i < mylist.length; i++) {
    		mylist[i][$scope.selectedCol.col] = $scope.newValue;
    	}
    	
    	$scope.replacedList.push({'column' : $scope.selectedCol.col, 'oldValue' : $scope.searchValue, 'newValue': $scope.newValue }); // save replaced entry
    	mergedData.setValue($scope.replacedList,'replacedList');
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
   	 //$scope.selectedCol = null;
   	 $scope.searchValue = '';
   	 $scope.newValue = ''
   }

    function getValueSet(data,column,reset) {
		var lookup = {};
		if (reset) {
			$scope.valuesets[column] = null;
		}

		for (var row, i = 0; row = data[i++];) {
		  var value = row[column].trim();

		  if (!(value in lookup)) {
		    lookup[value] = 1;
		  }
		}
		return Object.keys(lookup);
	}
});