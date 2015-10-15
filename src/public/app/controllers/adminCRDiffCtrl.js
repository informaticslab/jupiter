angular.module('jupiterApp').controller('adminCRDiffCtrl', ['$scope', '$modal', '$http', '$routeParams', '$filter', 'nodeAttributeDictionary', 'nodeRelationshipDictionary', 'ngIdentity',
    function($scope, $modal, $http, $routeParams, $filter, nodeAttributeDictionary, nodeRelationshipDictionary, ngIdentity) {

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


        $scope.openlog = function() {

            var logmodalInstance = $modal.open({
                templateUrl: 'crlog.html',
                controller: 'crlogCtrl',
                size: 'lg',
                resolve: {
                    logs: function() {
                        return $scope.logs;
                    }
                }
            });

            logmodalInstance.result.then(function(docid) {
                $scope.deleterelrow(docid);
            }, function() {});
        };


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


        var crPrevEval;
        var init = function() {

            $scope.dbcrRelArray = [];
            $scope.usersu = false;
            $scope.i = new Date().getTime() + 100;
            $scope.crRelArray = [];
            $scope.crDiffValues = [];
            var mongoid = $routeParams.id;
            $scope.mongoid = mongoid;
            var rollback;
            $scope.labelclass = "";

            $scope.relationshipDescription = "";
            $scope.logs = [];
            $scope.status_show_approved = false;
            $scope.status_show_declined = false;
            $scope.hover = false;
            $scope.relTypeValues = nodeRelationshipDictionary.RelationshipTypes;

            $scope.startnode = "";
            $scope.startNodeId = "";

            $scope.endnode = "";
            $scope.endNodeId = "";

            $scope.relCheckBox = {};
            $scope.relCheckBox.fromNewNode = false;
            $scope.relCheckBox.toNewNode = false;

            $scope.editCRChk = {};
            $scope.editCRChk.yes = false;
            $scope.editCRValues = {};


            $scope.crDiffValues = [];
            mongoid = $routeParams.id;
            currentneodata = {};
            currentreldata = [];

            var cacheRenew = new Date().getTime();

            if ($scope.identity.currentUser.roles.levelTwo) {
                $scope.usersu = true;
            }

            $http.get('/api/mongo/' + mongoid + '?' + cacheRenew, {
                cache: false
            }).then(function(res) {
                $scope.mongoData = res.data;
                $scope.editCRValues = $scope.mongoData[0];



                $scope.nodeId = $scope.mongoData[0].id;
                $scope.nodeType = $scope.mongoData[0].CR_NODE_TYPE;
                $scope.nodeName = $scope.mongoData[0].name;
                $scope.crRequestType = $scope.mongoData[0].CR_REQUEST_TYPE;
                $scope.crStatus = $scope.mongoData[0].CR_STATUS;
                $scope.crNodeType = $scope.mongoData[0].CR_NODE_TYPE;
                $scope.crUserCreate = $scope.mongoData[0].CR_USER_DN_CREATE;
                $scope.crUserUpdate = $scope.mongoData[0].CR_USER_DN_EDIT;
                $scope.crUserApprove = $scope.mongoData[0].CR_USER_DN_EXECUTE;
                $scope.crPrev = $scope.mongoData[0].CR_PREVIOUS;
                $scope.crRel = $scope.mongoData[0].rels;
                $scope.crCreateDate = $scope.mongoData[0].CR_DATE_CREATED;
                $scope.crApproveDate = $scope.mongoData[0].CR_DATE_EXECUTED;
                $scope.crUpdateDate = $scope.mongoData[0].CR_DATE_EDITED;

                $scope.getAttributesAndGroups($scope.nodeType);

                $http.get('/api/mongo/log/' + mongoid + '?' + cacheRenew, {
                    cache: false
                }).then(function(res) {
                    $scope.logs = res.data;
                });

                if ($scope.crRequestType == "UPDATE") {
                    $scope.labelclass = "label-warning";
                }

                if ($scope.crRequestType == "DELETE") {
                    $scope.labelclass = "label-danger";
                }

                if ($scope.crRequestType == "ADD") {
                    $scope.labelclass = "label-success";
                }


                if ($scope.crPrev != null && $scope.crPrev != "") {
                    rollback = JSON.parse($scope.crPrev);
                    $scope.rollback = rollback;
                }


                if ($scope.crRequestType == "ADD") {
                    $scope.nodeDictionaryAttributes = $scope.actAttributes[$scope.nodeType];


                    $scope.nodeDictionaryAttributes.forEach(function(d) {

                        var obj = {};
                        obj.key = d.attribute;
                        obj.sortIndex = d.sortIndex;
                        obj.description = d.description;
                        obj.displayLabel = d.displayLabel;

                        if ($scope.mongoData[0][obj.key] == undefined) {
                            obj.valueNew = "";
                        } else {
                            obj.valueNew = $scope.mongoData[0][obj.key];
                        }

                        if (obj.valueNew.trim() == "") {
                            obj.diffFlg = false;
                        } else {
                            obj.diffFlg = true;
                        }


                        $scope.crDiffValues.push(obj);
                    });

                    fetchRelationshipValues();
                } else if ($scope.crRequestType == "UPDATE") {
                    var cacheRenew = new Date().getTime();
                    $http.get('/api/node/' + $scope.nodeId + '?' + cacheRenew).then(function(res) {
                        $scope.nodeData = res.data;


                        $scope.nodeDictionaryAttributes = $scope.actAttributes[$scope.nodeType];

                        $scope.nodeDictionaryAttributes.forEach(function(d) {
                            var obj = {};
                            obj.key = d.attribute;
                            obj.sortIndex = $scope.nodeAllGroupAttributes[obj.key].sortIndex;
                            obj.groupHeading = $scope.nodeAllGroupAttributes[obj.key].groupHeading;
                            obj.description = d.description;
                            obj.displayLabel = d.displayLabel;

                            var nodeAttrFound = false;
                            for (na in $scope.nodeData.attributes) {

                                if ($scope.nodeData.attributes[na].key == obj.key) {
                                    obj.valueOld = $scope.nodeData.attributes[na].value;
                                    nodeAttrFound = true;

                                }
                            }
                            if (!nodeAttrFound) {
                                obj.valueOld = "";
                            }


                            if ($scope.mongoData[0][obj.key] == undefined) {
                                obj.valueNew = "";
                            } else {
                                obj.valueNew = $scope.mongoData[0][obj.key];
                            }
                            var diff = diffString(obj.valueOld, obj.valueNew);

                            obj.diff = diff;
                            var rollbackdiff, rollbackdiffreverse;

                            if ($scope.crPrev != null && $scope.crPrev != "") {

                                if (rollback[obj.key] == undefined) {
                                    rollback[obj.key] = "";

                                }
                                obj.rollback = rollback[obj.key];
                                obj.rollbackdiff = diffString(obj.valueOld, obj.rollback);
                                obj.rollbackdiffreverse = diffString(obj.rollback, obj.valueOld);
                                if (obj.rollbackdiff.indexOf("<ins>") > -1) {
                                    obj.rollbackdiffFlg = true;
                                }
                                if (obj.rollbackdiff.indexOf("<del>") > -1) {
                                    obj.rollbackdiffFlg = true;
                                }
                            }

                            if (diff.indexOf("<ins>") > -1) {
                                obj.diffFlg = true;
                            }
                            if (diff.indexOf("<del>") > -1) {
                                obj.diffFlg = true;
                            }

                            $scope.crDiffValues.push(obj);

                            currentneodata[obj.key] = obj.valueOld;

                        });


                        fetchRelationshipValues();
                    }); //http get

                } else {
                    crPrevEval = JSON.parse($scope.crPrev);

                    $scope.nodeDictionaryAttributes = $scope.actAttributes[$scope.nodeType];


                    $scope.nodeDictionaryAttributes.forEach(function(d) {


                        var obj = {};
                        obj.key = d.attribute;
                        obj.sortIndex = d.sortIndex;
                        obj.description = d.description;
                        obj.displayLabel = d.displayLabel;

                        if (crPrevEval[obj.key] == undefined) {
                            obj.valueOld = "";
                        } else {
                            obj.valueOld = crPrevEval[obj.key];
                        }

                        if (obj.valueOld.trim() == "") {
                            obj.diffFlg = false;
                        } else {
                            obj.diffFlg = true;
                        }


                        $scope.crDiffValues.push(obj);
                    });

                    fetchRelationshipValues();
                }

            }); //http get


        };

        init();
        $scope.approveCR = function() {

            $scope.mongoData[0].CR_USER_DN_EXECUTE = $scope.identity.currentUser.displayName;
            $scope.mongoData[0].CR_USER_ID_EXECUTE = $scope.identity.currentUser._id;
            $scope.mongoData[0].CR_USER_EMAIL_EXECUTE = $scope.identity.currentUser.email;
            datapacket = {};

            datapacket.approved = $scope.mongoData[0];
            datapacket.prev = currentneodata;

            datapacket.type = $scope.mongoData[0].CR_REQUEST_TYPE;
            $http.post('/api/mongo/postapprovecr', datapacket).
            success(function(data, status, headers, config) {
                if (data == ("success")) {
                    init();
                    $scope.status_show_approved = true;
                }

            }).error(function(data, status) {});


        };

        $scope.getAttributesAndGroups = function(nodeLabel) {
            $scope.nodeGroups = [];
            for (a in nodeAttributeDictionary[nodeLabel].attributeGroups) {
                $scope.nodeGroups.push(nodeAttributeDictionary[nodeLabel].attributeGroups[a]);
            }

            $scope.nodeAllGroupAttributes = {};
            $scope.nodeGroupAttributes = {};
            for (group in $scope.nodeGroups) {
                var heading = $scope.nodeGroups[group].heading;
                var groupSortIndex = $scope.nodeGroups[group].sortIndex;
                $scope.nodeGroupAttributes[heading] = [];
                for (attribute in $scope.nodeGroups[group].attributes) {
                    $scope.nodeGroupAttributes[heading].push({
                        attributes: $scope.nodeGroups[group].attributes[attribute],
                        attributeName: attribute
                    });
                    $scope.nodeAllGroupAttributes[attribute] = {
                        attributeName: attribute,
                        groupHeading: heading,
                        sortIndex: groupSortIndex + '' + $scope.nodeGroups[group].attributes[attribute].sortIndex
                    };

                }

            }
        }

        $scope.saveEditCR = function() {


            var finalCRArray = [];

            $scope.dbcrRelArray.forEach(function(d) {
                if (!d.found && d.crdbType == "db") {

                } else {
                    finalCRArray.push(d);
                }
            });
            $scope.editCRValues.rels = JSON.stringify(finalCRArray);

            $scope.editCRValues.CR_USER_DN_EDIT = $scope.identity.currentUser.displayName;
            $scope.editCRValues.CR_USER_ID_EDIT = $scope.identity.currentUser._id;
            $scope.editCRValues.CR_USER_EMAIL_EDIT = $scope.identity.currentUser.email;
            $http.post('/api/mongo/posteditcr', $scope.editCRValues).
            success(function(data, status, headers, config) {
                if (data == ("success")) {
                    init();

                }

            }).error(function(data, status) {});


        };


        $scope.setRelValueFrom = function() {


            if ($scope.relCheckBox.fromNewNode) {
                $scope.startNodeId = $scope.nodeId;
                $scope.startnode = $scope.editCRValues['name'];
            } else {
                $scope.startNodeId = "";
                $scope.startnode = "";
            }

        }

        $scope.setRelValueTo = function() {

            if ($scope.relCheckBox.toNewNode) {
                $scope.endNodeId = $scope.nodeId;
                $scope.endnode = $scope.editCRValues['name'];
            } else {
                $scope.endNodeId = "";
                $scope.endnode = "";
            }

        }

        $scope.cancelEditCR = function() {


            $scope.editCRChk.yes = false;
            init();

        };

        $scope.declineCR = function() {



            $scope.mongoData[0].CR_USER_DN_EXECUTE = $scope.identity.currentUser.displayName;
            $scope.mongoData[0].CR_USER_ID_EXECUTE = $scope.identity.currentUser._id;
            $scope.mongoData[0].CR_USER_EMAIL_EXECUTE = $scope.identity.currentUser.email;


            $http.post('/api/mongo/postdeclinecr', $scope.mongoData[0]).
            success(function(data, status, headers, config) {
                if (data == ("success")) {


                    init();

                    $scope.status_show_declined = true;
                }

            }).error(function(data, status) {});


        };



        function fetchRelationshipValues() {

            var cacheRenew = new Date().getTime();

            if ($scope.crRequestType == "ADD") {
                findRelDifference();
            } else if ($scope.crRequestType == "UPDATE") {


                $http.get('/api/node/relationships/' + $scope.nodeId + '?' + cacheRenew).then(function(res) {
                    $scope.relvalues = res.data;
                    currentreldata = res.data;
                    currentneodata["rels"] = JSON.stringify(currentreldata);

                    $scope.relvalues.forEach(function(d) {
                        d['relid'] = $scope.i;
                        $scope.i++;
                    });
                    if ($scope.crStatus == "APPROVED") {
                        findRelDifferencePrev();
                    } else {
                        findRelDifference();
                    }

                });
            } else {
                findRelDifference();
            }
        }

        function findRelDifference() {

            if ($scope.crRequestType == "ADD") {

                var crRelArray = eval($scope.crRel);

                $scope.crRelArray = crRelArray;


                var dbcrRelArray = [];


                crRelArray.some(function(d) {
                    d.crdbType = "cr";
                    d.found = false;
                    dbcrRelArray.push(d);
                });

                $scope.dbcrRelArray = dbcrRelArray;
            } else if ($scope.crRequestType == "UPDATE") {
                var dbRelArray = $scope.relvalues;

                var crRelArray = eval($scope.crRel);

                var dbcrRelArray = [];


                crRelArray.some(function(d) {
                    d.found = false;
                    d.crdbType = "cr";
                    dbRelArray.some(function(d1) {
                        var crstr = d1.startid + d1.reltype + d1.endid + d1.reldesc;
                        var dbstr = d.startid + d.reltype + d.endid + d.reldesc;

                        if (dbstr == crstr) {
                            d.found = true;
                            dbcrRelArray.push(d);
                            return true;
                        }

                    });
                    if (!d.found) {
                        dbcrRelArray.push(d);
                    }
                });


                dbRelArray.some(function(d) {
                    d.found = false;
                    d.crdbType = "db";
                    crRelArray.some(function(d1) {
                        var crstr = d1.startid + d1.reltype + d1.endid + d1.reldesc;
                        var dbstr = d.startid + d.reltype + d.endid + d.reldesc;

                        if (dbstr == crstr) {
                            d.found = true;
                            return true;
                        }

                    });

                    if (!d.found) {
                        dbcrRelArray.push(d);
                    }
                });


                $scope.dbcrRelArray = dbcrRelArray;
            } else {


                if ($scope.crStatus == "APPROVED") {
                    $scope.dbcrRelArray = eval(crPrevEval.rels);
                } else {
                    $scope.dbcrRelArray = $scope.relvalues;
                }

            }



        }


        function findRelDifferencePrev() {

            var dbRelArray = $scope.relvalues;

            var dbprevRelArray = eval(JSON.parse($scope.crPrev).rels);


            var dbcrRelArray = [];

            dbprevRelArray.some(function(d) {
                d.found = false;
                d.crdbType = "db";
                dbRelArray.some(function(d1) {
                    var dbstr = d1.startid + d1.reltype + d1.endid + d1.reldesc;
                    var crstr = d.startid + d.reltype + d.endid + d.reldesc;


                    if (dbstr == crstr) {
                        d.found = true;
                        dbcrRelArray.push(d);
                        return true;
                    }

                });
                if (!d.found) {
                    dbcrRelArray.push(d);
                }
            });


            dbRelArray.some(function(d) {
                d.found = false;
                d.crdbType = "cr";
                dbprevRelArray.some(function(d1) {
                    var crstr = d1.startid + d1.reltype + d1.endid + d1.reldesc;
                    var dbstr = d.startid + d.reltype + d.endid + d.reldesc;

                    if (dbstr == crstr) {
                        d.found = true;
                        return true;
                    }

                });

                if (!d.found) {
                    dbcrRelArray.push(d);
                }
            });


            $scope.dbcrRelArray = dbcrRelArray;



        }

        $scope.deleterelrow = function(id) {



            var x = arrayObjectIndexOf($scope.dbcrRelArray, id, "relid"); // 1

            $scope.dbcrRelArray.forEach(function(d) {
                if (d.relid == id) {
                    d.found = false;
                    d.crdbType = "db";
                }
            });
        }

        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for (var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
        }

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

                if ($scope.relationshipDescription == "" || $scope.relationshipDescription == undefined) {
                    $scope.relationshipDescription = "n/a";
                }

                if ($scope.endNodeId == $scope.nodeId) {
                    $scope.dbcrRelArray.push({
                        found: false,
                        crdbType: "cr",
                        aname: $scope.nodeName,
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
                    $scope.dbcrRelArray.push({
                        found: false,
                        crdbType: "cr",
                        aname: $scope.nodeName,
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

angular.module('jupiterApp').controller('crlogCtrl', function($scope, logs) {

    $scope.logs = logs;
    $scope.ok = function() {
        $scope.$close();
    };

    $scope.cancel = function() {
        $scope.$dismiss();
    };
});