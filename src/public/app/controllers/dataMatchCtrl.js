'use strict';
angular.module('jupiterApp').controller('dataMatchCtrl', function($scope, $http,$modal,mergedData){

	$scope.validDataSets = true;
	$scope.ds1Id = '';
	$scope.ds2Id = '';
	$scope.mergedList = mergedData.getMergedList();
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
	$scope.mergedDatasets = [];
	$scope.valueSets = {};
	$scope.mergedCols = [];
	
	$scope.setDataSet1 = function($item) {

	    $scope.ds1Id = $item.id;
	    $scope.datafile1.dsId = $item.id;
	    // need to verify if the dataset has a file attachment before invoke

	    try {
		    $http.get('/api/getDataFile'+$scope.ds1Id).then(function(res,err) {
		    	if (res.data.ERROR) {
		    		alert('An error has occured, please verify that this is an uploaded dataset!');
		    	}
		    	else {
					$scope.datafile1['data'] = res.data;
					var cols = Object.keys($scope.datafile1.data[0]);
					for(var col in cols) {
						$scope.datafile1['cols'].push(cols[col]);
					}
					console.log('ds 1 cols ', $scope.datafile1.cols);	
				}
			})

		}
		catch(err) {
			alert('An error has occured, pleases contact an administrator!');
		}
     };

     $scope.setDataSet2 = function($item) {
        $scope.ds2Id = $item.id;
        $scope.datafile2.dsId = $item.id;

        $http.get('/api/getDataFile'+$scope.ds2Id).then(function(res) {
        	if (res.data.ERROR) {
		    		alert('An error has occured, please verify that this is an uploaded dataset!');
		    }
		    else {
	       		$scope.datafile2.data = res.data;
	       		
				var cols = Object.keys($scope.datafile2.data[0]);
			//	console.log(cols);
				for(var col in cols) {
					$scope.datafile2.cols.push(cols[col]);
				}	
			}
			
		})
     };

     $scope.resetStatus = function() {
     	$scope.showResults = false;
     };

	$scope.match = function() {

		$http.get('/api/node/getHarmonizeDataSets/'+$scope.ds1Id+'/'+$scope.ds2Id).then(function(res) {
			//console.log(res.data);
			var ds1 = res.data.DS1;
			var ds2 = res.data.DS2;
			var mergedObj = {};
			var unmatchObj = {};

			var conceptList = res.data.concepts;

			$scope.unmatchedList = [];
			$scope.mergedList = [];
			// console.log(ds1);
			// console.log(ds2);

			for(var i = 0; i < conceptList.length; i++) {
				//console.log(conceptList[i].name);
				var ds1Bucket = [];
				var ds2Bucket = [];
				var undefinedBucket = [];
				for(var j=ds1.length-1; j>=0; j--) {
					if(conceptList[i].cui === ds1[j].cui && ds1[j]) {
						ds1Bucket.push(ds1[j]);
						ds1.splice(j,1);
					}
				}
				for(var k=ds2.length-1; k>=0; k--) {
					if(conceptList[i].cui === ds2[k].cui && ds2[k]) {
						ds2Bucket.push(ds2[k]);
						ds2.splice(k,1);
					}
				}
				// for(var j = 0; j < ds1.length; j++) {

				// 	if(conceptList[i].cui === ds1[j].cui && ds1[j]) {
				// 		ds1Bucket.push(ds1[j].dename);
				// 	}
				// }
				// for(var k =0; k < ds2.length; k++) {
				// 	if(conceptList[i].cui === ds2[k].cui) {
				// 		ds2Bucket.push(ds2[k].dename);
				// 	}
				// }
				if(ds1Bucket.length > 0 && ds2Bucket.length > 0 ) {
					// console.log('MATCH');
					mergedObj = {};
					mergedObj.dsDE1 = ds1Bucket;
					mergedObj.dsDE2 = ds2Bucket;
					mergedObj.concept = conceptList[i];
					$scope.mergedList.push(mergedObj);
				
				} else if(ds1Bucket.length > 0 && ds2Bucket <= 0){
					unmatchObj = {};
					unmatchObj.dsDE1 = ds1Bucket;
					unmatchObj.dsDE2 = '';
					unmatchObj.concept = conceptList[i];
					$scope.unmatchedList.push(unmatchObj);
				} else if(ds2Bucket.length > 0 && ds1Bucket <= 0){
					unmatchObj = {};
					unmatchObj.dsDE1= '';
					unmatchObj.dsDE2 = ds2Bucket;
					unmatchObj.concept = conceptList[i];
					$scope.unmatchedList.push(unmatchObj);
				}
				// console.log('concept', conceptList[i].name);
				// console.log('first:',ds1Bucket);
				// console.log('second:',ds2Bucket);
			}

			mergedData.setMergedList($scope.mergedList);
			$scope.showResults = true;

		
			// console.log($scope.unmatchedList);
			// console.log($scope.mergedList);
		});



		
		

		

		
	};

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

     function getValueSet(data,column,reset) {
    	var lookup = {};
		if (reset) {
			$scope.valuesets[column] = null;
		}

		for (var row, i = 0; row = data[i++];) {
		  var value = row[column];

		  if (!(value in lookup)) {
		    lookup[value] = 1;
		  }
		}
		return Object.keys(lookup);
    }

    $scope.merge = function() {
    	var checkedRows = [];
    	var uncheckedRows = [];
    	var rmvIdx = null;
    	$scope.mergedCols = [];
    	$scope.mergedDatasets = [];
    	$scope.valueSets = {};
    	var maxlength = 0;
    	var combinedValueset = [];
    	// build columns from 2 datasets
    	for(var i =0; i < $scope.mergedList.length; i++) {
    		if ($scope.mergedList[i].mergeChecked) {  // row checked for merging
    			// extract value set for each merged columns 
    			  var valueset1 = getValueSet($scope.datafile1.data,$scope.mergedList[i].dsDE1[0].dename,false);
    			  var valueset2 = getValueSet($scope.datafile2.data,$scope.mergedList[i].dsDE2[0].dename,false);
    			// combine valuesets for later processing  
    				
    			  if (valueset1.length >= valueset2.length) {
    			  		maxlength = valueset1.length
    			  }
    			  else {
    			  		maxlength = valueset2.length
    			  } 
    			  combinedValueset = [];
    			  for (var x= 0; x < maxlength ; x++) {
    			  	var oneValueSetRow = {};
    			  	if (valueset1[x]) {
    			  	 	oneValueSetRow['ds1Value'] = valueset1[x];
    			  	 }
    			  	 else {
    			  	 	oneValueSetRow['ds1Value'] = '';
    			  	 }
    			  	if (valueset2[x]) {
    			  	 	oneValueSetRow['ds2Value'] = valueset2[x];
    			  	}
    			  	else {
    			  		oneValueSetRow['ds2Value'] = ''
    			  	}
    			  	combinedValueset.push(oneValueSetRow);
    			  }

    			$scope.mergedCols.push({'sortOrder':0, 'col': $scope.mergedList[i].dsDE1[0].dename+'|'+$scope.mergedList[i].dsDE2[0].dename, 'valuesets': combinedValueset});
    			
    		
    			//remove the merged column from the dataset 1 cols list
    			rmvIdx = $scope.datafile1.cols.indexOf($scope.mergedList[i].dsDE1[0].dename);
    			$scope.datafile1.cols.splice(rmvIdx,1);
    			//remove the merged column from the dataset 1 cols list
    			rmvIdx = $scope.datafile2.cols.indexOf($scope.mergedList[i].dsDE2[0].dename);
    			$scope.datafile2.cols.splice(rmvIdx,1);
    		}
    		else {

    		}
    	}
    	for (var j=0; j< $scope.datafile1.cols.length; j++) {
    			if ($scope.mergedCols.indexOf($scope.datafile1.cols[j]) == -1 ) {
    				$scope.mergedCols.push({'sortOrder':1, 'col': $scope.datafile1.cols[j],'renamedCol': $scope.datafile1.cols[j]+'1', 'ds':1});
    			}
    	}
    	for (var j=0; j< $scope.datafile2.cols.length; j++) {
    			if ($scope.mergedCols.indexOf($scope.datafile2.cols[j]) == -1 ) {
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
    					oneRow[$scope.mergedCols[j].col] = $scope.datafile1.data[i][orgCol[0]];
    				}
    				else {
	    				if (($scope.datafile1.cols.indexOf(orgCol[0]) != -1) && ($scope.mergedCols[j].ds == 1) ){
	    					oneRow[$scope.mergedCols[j].renamedCol] = $scope.datafile1.data[i][orgCol[0]];
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
    				var orgCol = $scope.mergedCols[j].col.split('|')
    				if (orgCol.length > 1) {  // found a merged col
    					oneRow[$scope.mergedCols[j].col] = $scope.datafile2.data[i][orgCol[1]];
    				}
    				else {
    					if (($scope.datafile2.cols.indexOf(orgCol[0]) != -1) && ($scope.mergedCols[j].ds == 2)) {
    						oneRow[$scope.mergedCols[j].renamedCol] = $scope.datafile2.data[i][orgCol[0]];
	    				}
	    				else {
	    					oneRow[$scope.mergedCols[j].renamedCol] = '';
	 	  				} 
	 					//oneRow[$scope.mergedCols[j].col] = $scope.datafile2.data[i][orgCol[0]];
	 				}
    		}
    		$scope.mergedDatasets.push(oneRow);
    	} 	
    	mergedData.setMergedDataset($scope.mergedDatasets);
    	mergedData.setMergedCols($scope.mergedCols);
    	mergedData.setValueSets($scope.valueSets)
    	location.href = "#/dataMatch2";
    	

	}

    function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
	}
  
});