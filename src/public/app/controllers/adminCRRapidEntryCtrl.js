angular.module('jupiterApp').controller('adminCRRapidEntryCtrl', ['$scope', '$http', '$filter', '$location', 'nodeAttributeDictionary', 'nodeRelationshipDictionary', 'nodeTypeDictionary', 'ngIdentity',
    function($scope, $http, $filter, $location, nodeAttributeDictionary, nodeRelationshipDictionary, nodeTypeDictionary, ngIdentity) {


        $scope.relValues = nodeRelationshipDictionary.RelationshipTypes;
        $scope.nodeTypeValues = nodeTypeDictionary.NodeTypes;

        $scope.identity = ngIdentity;
        $scope.colHeaders = [];
        $scope.nodetypeselect = 'DataElement';
        $scope.oneDataElement = {};
        $scope.showAddDataElement = false;

        $scope.isActive = function(route) {
            return route === $location.path();
        }

        function fetchDataElements() {
            $http.get('/api/node/dataElements/' + $scope.dataElementSelectedId).then(function(res) {
                $scope.dataElementsArray = res.data;

                //$scope.relarray=[];
                //console.log(res.data);
                var i = 1;
                $scope.dataElementsArray.forEach(function(d) {
                    //console.log(d);
                });
                $scope.colHeaders = Object.keys($scope.dataElementsArray[0]);
                if ($scope.dataElementsArray.length == 1 && $scope.dataElementsArray[0].id === '') {
                    $scope.dataElementsArray = [];
                }
                $scope.showAddDataElement = true;


            });
        }


        $scope.saveDataElementsServer = function() {
            var datapacket = {};
            datapacket.dsetid = $scope.dataElementSelectedId;
            datapacket.dearray = $scope.dataElementsArray;
            $http.post('/api/node/save/saveDE/', datapacket).
            success(function(data, status, headers, config) {
                // console.log(data);
            }).error(function(data, status) {
                console.log(data);
            });


        };


        $scope.saveDataElmRow = function(index) {
            var datapacket = {};
            datapacket.dsetid = $scope.dataElementSelectedId;
            datapacket.deObject = $scope.dataElementsArray[index];
            // console.log(datapacket);
            $http.post('/api/node/save/saveDE/', datapacket).
            success(function(data, status, headers, config) {
                // console.log(data);
                $scope.dataElementsArray[index].changed = false;
                alert('Data Element saved');
            }).error(function(data, status) {
                console.log(data);
                alert('Save failed');
            });


        };

        $scope.setDataElement = function($item) {
            $scope.dataElementSelectedId = $item.id;
            $scope.dataElementSelectedName = $item.displayname;

            // console.log($scope.dataElementSelectedId, $scope.dataElementSelectedName);
            fetchDataElements();

        };

        $scope.addDataElement = function() {

            if (Object.keys($scope.oneDataElement).length > 0) {

                $scope.oneDataElement["id"] = null;
                $scope.oneDataElement['changed'] = true;
                $scope.dataElementsArray.push($scope.oneDataElement);
                $scope.oneDataElement = {};
            }
            // console.log($scope.dataElementsArray);
        }
        $scope.deleteDataElmRow = function(index) {

            $scope.dataElementsArray.splice(index, 1);
            // console.log($scope.dataElementsArray);

        }

        $scope.deFieldChanged = function(row, fldIdx) {
            if (!isNaN(row)) {
                $scope.dataElementsArray[row]['changed'] = true;
            } else {
                $scope.oneDataElement['changed'] = true;

            }
        }


        $scope.setDataElement = function($item) {
            $scope.dataElementSelectedId = $item.id;
            $scope.dataElementSelectedName = $item.displayname;

            // console.log($scope.dataElementSelectedId, $scope.dataElementSelectedName);
            fetchDataElements();

        };

        $scope.setConcept = function($item, $model, $label, index) {
            $scope.dataElementsArray[index].cid = $item.id;
            $scope.dataElementsArray[index].cui = $item.cui;
            $scope.dataElementsArray[index].changed = true;
        }

        $scope.setNewDataElmConcept = function($item, $model, $label) {
            $scope.oneDataElement['cui'] = $item.cui;
            $scope.oneDataElement.cid = $item.id;
        }

        $scope.resetConcept = function($item,index) {
            $scope.dataElementsArray[index].cid = null;
            $scope.dataElementsArray[index].cui = null;
            $scope.dataElementsArray[index].changed = true;
        }
    }
]);