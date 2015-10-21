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
			var conceptList = res.data.concepts;
			$scope.mergedList = [];
			console.log(ds1);
			console.log(ds2);

			for(var i = 0; i < conceptList.length; i++) {
				//console.log(conceptList[i].name);
				for(var j = 0; j < ds1.length; j++) {
					if(conceptList[i].cui === ds1[j].cui && conceptList[i].cui !== '0000') {
						var mergedObj = {};
						mergedObj.conceptName = conceptList[i].name;
						mergedObj.dsDE1 = ds1[j].dename;
						//$scope.mergedList.push(mergedObj);
						for(var k =0; k < ds2.length; k++) {
							if(conceptList[i].cui === ds2[k].cui && ds2[k].cui === ds1[j].cui && conceptList[i].cui !== '0000') {
								mergedObj.dsDE2 = ds2[k].dename;
								$scope.mergedList.push(mergedObj);
							}
						}
					}
				}
			}
			console.log($scope.mergedList);
		});



		
		

		

		
	};
});