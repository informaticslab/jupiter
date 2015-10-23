angular.module('jupiterApp').controller('adminCRRapidEntryCtrl', ['$scope', '$http', '$filter', '$routeParams', '$location', 'nodeAttributeDictionary', 'nodeRelationshipDictionary', 'nodeTypeDictionary', 'ngIdentity',
    function($scope, $http, $filter, $routeParams, $location, nodeAttributeDictionary, nodeRelationshipDictionary, nodeTypeDictionary, ngIdentity) {

        if ($routeParams.id) {
            $scope.dataElementSelectedId = $routeParams.id;
            fetchDataElements();
        }

        $scope.relValues = nodeRelationshipDictionary.RelationshipTypes;
        $scope.nodeTypeValues = nodeTypeDictionary.NodeTypes;

        $scope.identity = ngIdentity;
        $scope.colHeaders = [];
        $scope.nodetypeselect = 'DataElement';
        $scope.colsObject = {};
       
         $scope.oneDataElement = {
                    'name' : '',
                    'description' : '',
                    'possbileValues' : '',
                    'concept' : '',
                    'cui'   : null
                };
        $scope.showAddDataElement = false;

        $scope.isActive = function(route) {
            return route === $location.path();
        }

        function fetchDataElements() {
            $http.get('/api/node/dataElements/' + $scope.dataElementSelectedId).then(function(res) {
                $scope.dataElementsArray = res.data;

                //$scope.relarray=[];
                //console.log(res.data);
                //var i = 1;
                // $scope.dataElementsArray.forEach(function(d) {
                //     //console.log(d);
                // });
                fetchDictionary();
                for (var i = 0; i < $scope.actAttributes['Concept'].length; i++) {
                    if ($scope.actAttributes['Concept'][i].attribute == 'id') {
                        $scope.actAttributes['Concept'][i].attribute = 'cid';   // rename
                    }
                    if ($scope.actAttributes['Concept'][i].attribute == 'name') {
                        $scope.actAttributes['Concept'][i].attribute = 'concept'; //rename
                        $scope.actAttributes['Concept'][i].displayLabel = 'Concept'
                    }
                }
                $scope.nodeDictionaryAttributes = $scope.actAttributes[$scope.nodetypeselect].concat($scope.actAttributes['Concept']);
                //console.log($scope.nodeDictionaryAttributes);
                for (var i = 0; i < $scope.nodeDictionaryAttributes.length; i++) {
                    $scope.colsObject[$scope.nodeDictionaryAttributes[i].attribute] = $scope.nodeDictionaryAttributes[i];  // flatten
                }
                //console.log('col object ',$scope.colsObject);
                for(var attribute in $scope.dataElementsArray[0]) {
                    var oneColHeader = {}
                    if ($scope.colsObject[attribute]) {
                        $scope.colHeaders.push($scope.colsObject[attribute]);
                    }
                }
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
                if (data.newId) {
                    $scope.dataElementsArray[index].id = data.newId;
                }
                $scope.dataElementsArray[index].changed = false;
                alert('Data Element saved');
            }).error(function(data, status) {
                console.log(data);
                alert('Save failed');
            });


        };

        $scope.setDataElement = function($item) {
            $scope.dataElementSelectedId = $item.id;
            //$scope.dataElementSelectedName = $item.displayname;

            // console.log($scope.dataElementSelectedId, $scope.dataElementSelectedName);
            fetchDataElements();

        };

        //   $scope.setDataElement = function($item) {
        //     $scope.dataElementSelectedId = $item.id;
        //     $scope.dataElementSelectedName = $item.displayname;

        //     // console.log($scope.dataElementSelectedId, $scope.dataElementSelectedName);
        //     fetchDataElements();

        // };
        $scope.addDataElement = function() {

            if (Object.keys($scope.oneDataElement).length > 0) {
                $scope.oneDataElement["id"] = null;
                $scope.oneDataElement['changed'] = true;
                $scope.dataElementsArray.push($scope.oneDataElement);
                $scope.oneDataElement = {
                    'name' : '',
                    'description' : '',
                    'possbileValues' : '',
                    'concept' : '',
                    'cui'   : null
                };
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

        $scope.validConcept = function(index){
            var item = $scope.dataElementsArray[index];
           // console.log(item);
            return  (!isEmpty(item.cui) && !isEmpty(item.concept))  || (isEmpty(item.cui) && isEmpty(item.concept)) 
        }

        function isEmpty(item) {
            return (item ==='' || item === null)
        }

         function fetchDictionary() {
            $scope.actAttributes = {};
            for (x in nodeAttributeDictionary) {
                $scope.actAttributes[x] = [];
                for (y in nodeAttributeDictionary[x].attributeGroups) {
                    for (z in nodeAttributeDictionary[x].attributeGroups[y].attributes) {
                        $scope.actAttributes[x].push({
                            attribute: z,
                            description: nodeAttributeDictionary[x].attributeGroups[y].attributes[z].description,
                            displayLabel: nodeAttributeDictionary[x].attributeGroups[y].attributes[z].displayLabel,
                            sortIndex: nodeAttributeDictionary[x].attributeGroups[y].attributes[z].sortIndex
                        });
                    }
                }
            }
        }
 
    }
]);