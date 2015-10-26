angular.module('jupiterApp').controller('adminCtrl', ['$scope', '$modal', '$http', '$filter', '$routeParams', '$location', 'nodeAttributeDictionary', 'nodeRelationshipDictionary', 'ngIdentity', 'ngNotifier', '$route',
    function($scope, $modal, $http, $filter, $routeParams, $location, nodeAttributeDictionary, nodeRelationshipDictionary, ngIdentity, ngNotifier, $route) {

        $scope.isActive = function(route) {
            return route === $location.path();
        }

        $scope.open = function(docid) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm',
                resolve: {
                    doc_id: function() {
                        return docid;
                    }
                }
            });

            modalInstance.result.then(function(docid) {
                $scope.deleterelrow(docid);
            }, function() {});
        };



        $scope.identity = ngIdentity;


        $scope.i = new Date().getTime() + 100;

        $scope.cr = {};
        $scope.showButtons = false;
        $scope.nodeLabel = "";
        $scope.crQueueSuccess = false;
        $scope.crQueueFail = false;

        $scope.startnode = "";
        $scope.startNodeId = "";

        $scope.endnode = "";
        $scope.endNodeId = "";
        $scope.relselect = "";
        $scope.hover = false;
        $scope.showErrMsg = false;

        $scope.lockedMongoID = "";
        $scope.lockedMongoUserDN = "";
        $scope.showLockMsg = false;

        $scope.relationshipDescription = "";
        $scope.relCheckBox = {};
        $scope.relCheckBox.fromNewNode = false;
        $scope.relCheckBox.toNewNode = false;
        $scope.relValues = nodeRelationshipDictionary.RelationshipTypes;

        if ($routeParams.id) {
            $scope.nodeId = $routeParams.id;
            $scope.crQueueSuccess = false;
            $scope.crQueueFail = false;

            checkCRexist();
        }

        $scope.itemSelected = function($item, $model, $label, id) {
            $scope.crQueueSuccess = false;
            $scope.crQueueFail = false;
            $scope.nodeId = $item.id;

            $location.path('/adminCREdit/' + $scope.nodeId);
            checkCRexist();


        };

        function checkCRexist() {
            $http.get('/api/mongo/getstatus/' + $scope.nodeId).then(function(res) {
                if (res.data.length > 0) {
                    $scope.lockedMongoID = res.data[0]._id;
                    $scope.lockedMongoUserDN = res.data[0].CR_USER_DN_CREATE;
                    $scope.showLockMsg = true;
                } else {
                    fetchNodeValues();
                    fetchRelationshipValues();
                }


            });
        }

        $scope.setRelValueFrom = function() {


            if ($scope.relCheckBox.fromNewNode) {
                $scope.startNodeId = $scope.nodeId;
                $scope.startnode = $scope.cr['name'];
            } else {
                $scope.startNodeId = "";
                $scope.startnode = "";
            }

        }

        $scope.setRelValueTo = function() {

            if ($scope.relCheckBox.toNewNode) {
                $scope.endNodeId = $scope.nodeId;
                $scope.endnode = $scope.cr['name'];
            } else {
                $scope.endNodeId = "";
                $scope.endnode = "";
            }

        }



        function fetchRelationshipValues() {
            $http.get('/api/node/relationships/' + $scope.nodeId).then(function(res) {
                $scope.relvalues = res.data;
                var found = false;
                var i = 1;
                $scope.relvalues.forEach(function(d) {
                    d['relid'] = $scope.i;
                    $scope.i++;
                    if (d.reltype == 'CONTAINS' && !found) {
                        $scope.datasetId = d.startid;
                        found = true;
                    }
                });


            });
        }

        function fetchNodeValues() {
            $http.get('/api/node/' + $scope.nodeId).then(function(res) {
                var nodeData = res.data;
                $http.get('/api/node/' + $scope.nodeId + '/labels').then(function(res1) {
                    $scope.nodeLabel = res1.data[0];
                    $scope.nodeDictionaryAttributes = $scope.actAttributes[res1.data[0]];

                    $scope.nodeKeyValues = [];
                    $scope.nodeDictionaryAttributes.forEach(function(d) {

                        var foundmatch = false;

                        for (na in nodeData.attributes) {
                            var key = nodeData.attributes[na].key;
                            var value = nodeData.attributes[na].value;
                            if (key == d.attribute) {
                                $scope.nodeKeyValues.push({
                                    "key": d.attribute,
                                    "value": value,
                                    "displayLabel": d.displayLabel,
                                    "sortIndex": d.sortIndex,
                                    "description": d.description
                                })
                                $scope.cr[d.attribute] = value;
                                foundmatch = true;
                            }
                            if (key == "name") {
                                $scope.node = value;
                            }
                        }

                        if (!foundmatch) {
                            $scope.nodeKeyValues.push({
                                "key": d.attribute,
                                "value": "",
                                "displayLabel": d.displayLabel,
                                "sortIndex": d.sortIndex,
                                "description": d.description
                            })
                            $scope.cr[d.attribute] = "";
                        }

                    });

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

                    $scope.showButtons = true;

                    $scope.filePath = nodeData.attributes[1].value;

                });


            });
        }


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


        $scope.postupdatecr = function() {


            $scope.cr['CR_NODE_TYPE'] = $scope.nodeLabel;
            $scope.cr['CR_REQUEST_TYPE'] = "UPDATE";
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

            var datapacket = {};
            datapacket['attr'] = $scope.cr;
            datapacket['rels'] = $scope.relvalues;
            $http.post('/api/mongo/postupdatecr', datapacket).
            success(function(data, status, headers, config) {
                $scope.node = "";
                $scope.showButtons = false;
                $scope.crQueueSuccess = true;
            }).error(function(data, status) {
                $scope.node = "";
                $scope.showButtons = false;
                $scope.crQueueFail = true;
            });

        };

        $scope.postdeletecr = function() {



            $scope.cr['CR_NODE_TYPE'] = $scope.nodeLabel;
            $scope.cr['CR_REQUEST_TYPE'] = "DELETE";
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

            $http.post('/api/mongo/postdeletecr', $scope.cr).
            success(function(data, status, headers, config) {
                $scope.node = "";
                $scope.showButtons = false;
                $scope.crQueueSuccess = true;
            }).error(function(data, status) {
                $scope.node = "";
                $scope.showButtons = false;
                $scope.crQueueFail = true;

            });

        };


        $scope.startNodeSelected = function($item, $model, $label) {
            $scope.startNodeId = $item.id;
            $scope.startnode = $item.displayname;
        };

        $scope.endNodeSelected = function($item, $model, $label) {
            $scope.endNodeId = $item.id;
            $scope.endnode = $item.displayname;
        };



        $scope.addRel = function() {
            if (($scope.endNodeId == $scope.nodeId || $scope.startNodeId == $scope.nodeId) && ($scope.endNodeId != "" && $scope.startNodeId != "") && ($scope.relselect != "") && ($scope.relselect != null)) {

                if ($scope.relationshipDescription == "") {
                    $scope.relationshipDescription = "n/a";
                }

                if ($scope.endNodeId == $scope.nodeId) {
                    $scope.relvalues.push({
                        aname: $scope.node,
                        aid: $scope.nodeId,
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
                        aname: $scope.node,
                        aid: $scope.nodeId,
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

                $scope.showErrMsg = false;
                $scope.relationshipDescription = "";
                $scope.relCheckBox.fromNewNode = false;
                $scope.relCheckBox.toNewNode = false;

            } else {

                $scope.showErrMsg = true;
            }


        }

        $scope.openDataUpload = function(nodeId) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/uploadData',
                controller: 'uploadCtrl',
                size: 'md',
                resolve: {
                    nodeId: function() {
                        return nodeId;
                    }
                }
            });
        };

        $scope.openGridModal = function(nodeId) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/previewGrid',
                controller: 'previewGridCtrl',
                size: 'lg',
                resolve: {
                    nodeId: function() {
                        return nodeId;
                    }
                }
            });
        };

        $scope.deleteFile = function(node) {
            $http.post('/api/deletefile/', node).then(function(res) {
                if (res.data.success) {
                    ngNotifier.notifySuccess('Successfully deleted data file.');
                    $route.reload();
                } else {
                    console.log('deletion failed');
                }
            })
        }

    }
]);

angular.module('jupiterApp').controller('ModalInstanceCtrl', function($scope, $modalInstance, doc_id) {


    $scope.ok = function() {
        $scope.$close(doc_id);
    };

    $scope.cancel = function() {
        $scope.$dismiss();
    };
});