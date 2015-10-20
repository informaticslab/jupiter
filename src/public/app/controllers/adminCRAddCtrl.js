angular.module('jupiterApp').controller('adminCRAddCtrl', ['$scope', '$http', '$filter', '$location', 'nodeAttributeDictionary', 'nodeRelationshipDictionary', 'nodeTypeDictionary', 'ngIdentity',
    function($scope, $http, $filter, $location, nodeAttributeDictionary, nodeRelationshipDictionary, nodeTypeDictionary, ngIdentity) {



        $scope.cr = {};
        $scope.showButtons = false;
        $scope.nodeLabel = "";
        $scope.crQueueSuccess = false;
        $scope.crQueueFail = false;

        $scope.endNodeId = "";
        $scope.startNodeId = "";

        $scope.startnode = "";
        $scope.endnode = "";
        $scope.relationshipDescription = "";

        $scope.relselect = "";
        $scope.hover = false;
        $scope.showErrMsg = false;

        $scope.relCheckBox = {};
        $scope.relvalues = [];

        $scope.nextNodeID = "TBD";
        $scope.i = 100;

        $scope.highlightMissingTxt = false;
        $scope.datasetSelected = '';
        $scope.dataSet = {};
        $scope.undefinedConcept = {
            'displayname'  : 'undefined',
            'id'    : 'CN00'
        }




        $scope.relValues = nodeRelationshipDictionary.RelationshipTypes;
        $scope.nodeTypeValues = nodeTypeDictionary.NodeTypes;

        $scope.identity = ngIdentity;


        $scope.isActive = function(route) {
            return route === $location.path();
        }

        function fetchNodeValues() {

            $scope.nodeLabel = $scope.nodetypeselect;
            if ($scope.nodeLabel != 'DataElement') {
                $scope.dataSet = {};
                $scope.datasetSelected = '';
            }
            $scope.nodeDictionaryAttributes = $scope.actAttributes[$scope.nodeLabel];

            $scope.nodeGroups = [];
            for (a in nodeAttributeDictionary[$scope.nodeLabel].attributeGroups) {
                $scope.nodeGroups.push(nodeAttributeDictionary[$scope.nodeLabel].attributeGroups[a]);
            }


            $scope.nodeGroupAttributes = {};
            for (group in $scope.nodeGroups) {
                var heading = $scope.nodeGroups[group].heading;
                $scope.nodeGroupAttributes[heading] = [];
                for (attribute in $scope.nodeGroups[group].attributes) {

                    $scope.nodeGroupAttributes[heading].push({
                        attributes: $scope.nodeGroups[group].attributes[attribute],
                        attributeName: attribute
                    });
                }

            }

            $scope.highlightMissingTxt = false;
            $scope.cr = {};
            $scope.nodeDictionaryAttributes.forEach(function(d) {

                $scope.cr[d.attribute] = "";

            });
            $scope.showButtons = true;


        }


        $scope.loadNodeFields = function() {
            fetchNodeValues();
        };



        $scope.deleterelrow = function(id) {



            var x = arrayObjectIndexOf($scope.relvalues, id, "relid"); // 1



            ($scope.relvalues).splice(x, 1);


        }


        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for (var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
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

        fetchDictionary();


        $scope.postaddcr = function() {
            if ($scope.cr['name'].trim() == "") {
                $scope.highlightMissingTxt = true;
            } else {
               
                $scope.cr['CR_NODE_TYPE'] = $scope.nodeLabel;
                $scope.cr['CR_REQUEST_TYPE'] = "ADD";
                $scope.cr['CR_STATUS'] = "PENDING";
                $scope.cr['CR_USER_DN_CREATE'] = $scope.identity.currentUser.displayName;
                $scope.cr['CR_USER_ID_CREATE'] = $scope.identity.currentUser._id;
                $scope.cr['CR_USER_EMAIL_CREATE'] = $scope.identity.currentUser.email;
                $scope.cr['CR_USER_DN_EDIT'] = "";
                $scope.cr['CR_USER_ID_EDIT'] = "";
                $scope.cr['CR_USER_EMAIL_EDIT'] = "";
                $scope.cr['CR_USER_DN_EXECUTE'] = "";
                $scope.cr['CR_USER_ID_EXECUTE'] = "";
                $scope.cr['CR_USER_EMAIL_EXECUTE'] = "";
                $scope.cr['CR_DATE_CREATED'] = "";
                $scope.cr['CR_DATE_EDITED'] = "";
                $scope.cr['CR_DATE_EXECUTED'] = "";

                $scope.cr['id'] = $scope.nextNodeID;
                // set dataset id for data element
              
                var datapacket = {};
                if ($scope.nodeLabel == 'DataElement') {
                    $scope.cr['dsetid'] = $scope.dataSet.id;
                    $scope.addDataElementRel();
                    var deEndNode = {
                        'displayname'  : $scope.endnode,
                        'id'    : $scope.endNodeId
                    };
                    setConceptRel(deEndNode,$scope.undefinedConcept,'SHARES_MEANING_WITH');
                    $scope.addDataElementRel();
                }
                datapacket['attr'] = $scope.cr;
              

                datapacket['rels'] = $scope.relvalues;
                $http.post('/api/mongo/postaddcr', datapacket).
                success(function(data, status, headers, config) {
                    $scope.node = "";
                    $scope.showButtons = false;
                    $scope.crQueueSuccess = true;
                    if ($scope.nodetypeselect == 'DataElement') {
                         $scope.resetFields();
                    }
                }).error(function(data, status) {
                    $scope.node = "";
                    $scope.showButtons = false;
                    $scope.crQueueFail = true;
                });
            }
        };



        $scope.startNodeSelected = function($item) {
            $scope.startNodeId = $item.id;
            $scope.startnode = $item.displayname;


        };

        $scope.endNodeSelected = function($item) {
            $scope.endNodeId = $item.id;
            $scope.endnode = $item.displayname;
        };



        $scope.addRel = function() {
            if (($scope.endNodeId == $scope.nextNodeID || $scope.startNodeId == $scope.nextNodeID) && ($scope.endNodeId != "" && $scope.startNodeId != "") && ($scope.relselect != "") && ($scope.relselect != null)) {


                if ($scope.relationshipDescription == "") {
                    $scope.relationshipDescription = "n/a";
                }

                if ($scope.endNodeId == $scope.nodeId || $scope.endNodeId == $scope.nextNodeID) {
                    $scope.relvalues.push({
                        aname: $scope.cr.name,
                        aid: $scope.nextNodeID,
                        bname: $scope.startnode,
                        bid: $scope.startNodeId,
                        relid: $scope.i++,
                        reltype: $scope.relselect,
                        startid: $scope.startNodeId,
                        startname: $scope.startnode,
                        endid: $scope.endNodeId,
                        endname: $scope.endnode,
                        reldesc: $scope.relationshipDescription
                    });
                } else {
                    $scope.relvalues.push({
                        aname: $scope.cr.name,
                        aid: $scope.nextNodeID,
                        bname: $scope.endnode,
                        bid: $scope.endNodeId,
                        relid: $scope.i++,
                        reltype: $scope.relselect,
                        startid: $scope.startNodeId,
                        startname: $scope.startnode,
                        endid: $scope.endNodeId,
                        endname: $scope.endnode,
                        reldesc: $scope.relationshipDescription
                    });
                }

                $scope.startnode = "";
                $scope.startNodeId = "";

                $scope.endnode = "";
                $scope.endNodeId = "";

                $scope.relselect = "";

                $scope.relationshipDescription = "";
                $scope.relCheckBox.fromNewNode = false;
                $scope.relCheckBox.toNewNode = false;
                $scope.showErrMsg = false;

            } else {

                $scope.showErrMsg = true;
            }
           
        }

        $scope.setRelValueFrom = function() {


            if ($scope.relCheckBox.fromNewNode) {
                $scope.startNodeId = $scope.nextNodeID;
                $scope.startnode = $scope.cr['name'];
            } else {
                $scope.startNodeId = "";
                $scope.startnode = "";
            }

        }

        $scope.setRelValueTo = function() {

            if ($scope.relCheckBox.toNewNode) {
                $scope.endNodeId = $scope.nextNodeID;
                $scope.endnode = $scope.cr['name'];
            } else {
                $scope.endNodeId = "";
                $scope.endnode = "";
            }

        }


        $scope.setDataSet = function($item) {
            
            // console.log($scope.dataElementSelectedId, $scope.dataElementSelectedName);
            $scope.dataSet['id'] = $item.id;
            $scope.dataSet['displayname'] = $item.displayname;
            setDataSetRel($scope.dataSet);
            $scope.showButtons = true;
            $scope.crQueueSuccess = false;
            $scope.endnode = '';
        };

        function setDataSetRel(startNode) {
            $scope.startNodeSelected(startNode);
            $scope.relselect = "CONTAINS";
            $scope.relCheckBox.toNewNode = true;
            $scope.setRelValueTo();
        }

        function setConceptRel(startNode,endNode,relationship) {
            $scope.startNodeSelected(startNode);
            $scope.relselect =  relationship;
            $scope.endNodeSelected(endNode);
        }

     $scope.addDataElementRel = function() {
            if (($scope.endNodeId == $scope.nextNodeID || $scope.startNodeId == $scope.nextNodeID) && ($scope.endNodeId != "" && $scope.startNodeId != "") && ($scope.relselect != "") && ($scope.relselect != null)) {


                if ($scope.relationshipDescription == "") {
                    $scope.relationshipDescription = "n/a";
                }

                if ($scope.endNodeId == $scope.nodeId || $scope.endNodeId == $scope.nextNodeID) {
                    $scope.relvalues.push({
                        aname: $scope.cr.name,
                        aid: $scope.nextNodeID,
                        bname: $scope.startnode,
                        bid: $scope.startNodeId,
                        relid: $scope.i++,
                        reltype: $scope.relselect,
                        startid: $scope.startNodeId,
                        startname: $scope.startnode,
                        endid: $scope.endNodeId,
                        endname: $scope.endnode,
                        reldesc: $scope.relationshipDescription
                    });
                } else {
                    $scope.relvalues.push({
                        aname: $scope.cr.name,
                        aid: $scope.nextNodeID,
                        bname: $scope.endnode,
                        bid: $scope.endNodeId,
                        relid: $scope.i++,
                        reltype: $scope.relselect,
                        startid: $scope.startNodeId,
                        startname: $scope.startnode,
                        endid: $scope.endNodeId,
                        endname: $scope.endnode,
                        reldesc: $scope.relationshipDescription
                    });
                }

                // $scope.startnode = "";
                // $scope.startNodeId = "";

                //$scope.endnode = "";
                //$scope.endNodeId = "";

                // $scope.relselect = "";

                $scope.relationshipDescription = "";
              //  $scope.relCheckBox.fromNewNode = false;
              //  $scope.relCheckBox.toNewNode = false;
                $scope.showErrMsg = false;

            } else {

                $scope.showErrMsg = true;
            }
           
        }

        $scope.resetFields = function() {

            $scope.datasetSelected = '';
            $scope.dataSet = {};        
            $scope.startnode = "";
            $scope.startNodeId = "";

            $scope.endnode = "";
            $scope.endNodeId = "";

            $scope.relselect = "";

            $scope.relationshipDescription = "";
            $scope.relCheckBox.fromNewNode = false;
            $scope.relCheckBox.toNewNode = false;

        }
        $scope.resetDataset = function() {
            $scope.dataSet = {};
            $scope.cr['name'] = '';
            $scope.cr['description']='';
        }
    }
]);