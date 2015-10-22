'use strict';
angular.module('jupiterApp').controller('dataMatchCtrl', function($scope, $http){

	$scope.ds1Id = '';
	$scope.ds2Id = '';
	$scope.mergedList = [];
	 $scope.setDataSet1 = function($item) {
        $scope.ds1Id = $item.id;
     };

     $scope.setDataSet2 = function($item) {
        $scope.ds2Id = $item.id;
     };

	$scope.match = function() {

		$http.get('/api/node/getHarmonizeDataSets/'+$scope.ds1Id+'/'+$scope.ds2Id).then(function(res) {
			console.log(res.data);
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
				for(var j = 0; j < ds1.length; j++) {

					if(conceptList[i].cui === ds1[j].cui && ds1[j]) {
						ds1Bucket.push(ds1[j].dename);
					}
				}
				for(var k =0; k < ds2.length; k++) {
					if(conceptList[i].cui === ds2[k].cui) {
						ds2Bucket.push(ds2[k].dename);
					}
				}
				if(ds1Bucket.length > 0 && ds2Bucket.length > 0 ) {
					// console.log('MATCH');
					mergedObj = {};
					mergedObj.dsDE1 = ds1Bucket;
					mergedObj.dsDE2 = ds2Bucket;
					mergedObj.conceptName = conceptList[i].name;
					$scope.mergedList.push(mergedObj);
				
				} else if(ds1Bucket.length > 0 && ds2Bucket <= 0){
					unmatchObj = {};
					unmatchObj.dsDE1 = ds1Bucket;
					unmatchObj.dsDE2 = '';
					unmatchObj.concept = 'N/A';
					$scope.unmatchedList.push(unmatchObj);
				} else if(ds2Bucket.length > 0 && ds1Bucket <= 0){
					unmatchObj = {};
					unmatchObj.dsDE1= '';
					unmatchObj.dsDE2 = ds2Bucket;
					unmatchObj.concept = 'N/A';
					$scope.unmatchedList.push(unmatchObj);
				}
				// console.log('concept', conceptList[i].name);
				// console.log('first:',ds1Bucket);
				// console.log('second:',ds2Bucket);
			}

			

		
			// console.log($scope.unmatchedList);
			// console.log($scope.mergedList);
		});



		
		

		

		
	};
});