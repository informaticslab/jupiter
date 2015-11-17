'use strict';
angular.module('jupiterApp').controller('dataMatchCtrl', function($scope, $http,$modal){

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
	$scope.mergedDatasets = [];
	$scope.valuesets = [];
	$scope.mergedCols = [];
	
	$scope.setDataSet1 = function($item) {

	    $scope.ds1Id = $item.id;
	    $scope.datafile1.dsId = $item.id;
	    $http.get('/api/getDataFile'+$scope.ds1Id).then(function(res) {
			$scope.datafile1['data'] = res.data;
			var cols = Object.keys($scope.datafile1.data[0]);
			for(var col in cols) {
				$scope.datafile1['cols'].push(cols[col]);
			}
			console.log('ds 1 cols ', $scope.datafile1.cols);	
		})
     };

     $scope.setDataSet2 = function($item) {
        $scope.ds2Id = $item.id;
        $scope.datafile2.dsId = $item.id;
        $http.get('/api/getDataFile'+$scope.ds2Id).then(function(res) {
       		$scope.datafile2.data = res.data;
       		
			var cols = Object.keys($scope.datafile2.data[0]);
		//	console.log(cols);
			for(var col in cols) {
				$scope.datafile2.cols.push(cols[col]);
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

    $scope.getValueSet = function(data,column,reset) {
    	var lookup = {};
		var items = json.data;
		if (reset) {
			$scope.valuesets[column] = null;
		}

		for (var item, i = 0; item = items[i++];) {
		  var value = item[column];

		  if (!(value in lookup)) {
		    lookup[value] = 1;
		    $scope.valuesets[column].push(value);
		  }
		}
    };

    $scope.merge = function() {
    	var checkedRows = [];
    	var uncheckedRows = [];
    	var rmvIdx = null;
    	$scope.mergedCols = [];
    	$scope.mergedDatasets = [];
    	// build columns from 2 datasets
    	for(var i =0; i < $scope.mergedList.length; i++) {
    		if ($scope.mergedList[i].mergeChecked) {  // row checked for merging
    			$scope.mergedCols.push({'sortOrder':0, 'col': $scope.mergedList[i].dsDE1[0].dename+'|'+$scope.mergedList[i].dsDE2[0].dename});
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
    				$scope.mergedCols.push({'sortOrder':1, 'col': $scope.datafile1.cols[j],'renamedCol': $scope.datafile1.cols[j]+'1', 'ds':1});
    			}
    	for (var j=0; j< $scope.datafile2.cols.length; j++) {
    				$scope.mergedCols.push({'sortOrder':2, 'col': $scope.datafile2.cols[j],'renamedCol': $scope.datafile2.cols[j]+'2', 'ds':2})
    			}
    			
    
    	
    	// for(var i =0; i < $scope.unmatchedList.length; i++) {
    	// 	for (var j=0; j< $scope.unmatchedList[i].dsDE1.length; j++) {
    	// 			$scope.mergedCols.push({'sortOrder':2, 'col': $scope.unmatchedList[i].dsDE1[j].dename});
    	// 		}
    	// 	for (var j=0; j< $scope.unmatchedList[i].dsDE1.length; j++) {
    	// 			$scope.mergedCols.push({'sortOrder':4, 'col': $scope.unmatchedList[i].dsDE2[j].dename});
    	// 		}
    	// }
    	$scope.mergedCols = sortByKey($scope.mergedCols, 'sortOrder');
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
    					
    				}
    		}
    		$scope.mergedDatasets.push(oneRow);
    	} 	
    	console.log($scope.mergedDatasets);
    	

	}

    function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
	}
  
});