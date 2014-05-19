angular.module('apolloApp').controller('nodeCtrl', ['$scope', '$resource', '$http', '$routeParams', 'nodeAttributeDictionary',
    function($scope, $resource, $http, $routeParams, nodeAttributeDictionary) {
        $scope.contentLoading = true;
        $scope.nodeId = $routeParams.id
        $scope.$parent.q = 'explore';
        $scope.isCollapsed = true;
        var node = $resource('/apollo/api/node/:id', {
            id: '@id'
        });
        var labels = $http.get('/apollo/api/node/' + $routeParams.id + '/labels').success(function(data) {
            $scope.labels = data;
        });
        var relations = $resource('/apollo/api/node/:id/relations', {
            id: '@id'
        });
        var nodeDetails = $http.get('/apollo/api/node/' + $routeParams.id).success(function(data) {
            var attributeKeys = _.pluck(data.attributes, 'key');
            $scope.node = data;
            var len = $scope.node.attributes.length;
            for (var i = 0; i < len; i++) {
                if ($scope.node.attributes[i].value == '') {} else if (($scope.node.attributes[i].key == 'name') || ($scope.node.attributes[i].key == 'id') || ($scope.node.attributes[i].key == 'fullNameCIO') || ($scope.node.attributes[i].key == 'fullName') || ($scope.node.attributes[i].key == 'purpose')) {
                    // do nothing
                    if ($scope.node.attributes[i].key == 'purpose') {
                        $scope.purpose = $scope.node.attributes[i].value;
                    }
                }
            };
            $scope.labelGroups = function(label) {
                return _.toArray(nodeAttributeDictionary[label].attributeGroups);
            };
            $scope.showGroup = function(group) {
                return $scope.labelGroupAttributes(group).length > 0;
            };
            $scope.labelGroupAttributes = function(group) {
                var groupAttributeKeys = Object.keys(group.attributes);
                var intersection = _.intersection(attributeKeys, groupAttributeKeys)
                var toRet = [];
                _.each(intersection, function(i) {
                    _.each(_.where(data.attributes, {
                        'key': i
                    }), function(j) {
                        toRet.push(j);
                    });
                });
                _.each(toRet, function(i) {
                    i.description = group.attributes[i.key].description;
                    i.sortIndex = group.attributes[i.key].sortIndex;
                });
                return _.filter(toRet, function(i) {
                    return i.value != null && i.value.toLowerCase() != 'null' && i.value != '' && i.key != 'purpose';
                });
            };
            $scope.hideGroup = function(group) {
                return $scope.hiddenGroupAttributes(group).length > 0;
            };
            $scope.hiddenGroupAttributes = function(group) {
                var groupAttributeKeys = Object.keys(group.attributes);
                var intersection = _.intersection(attributeKeys, groupAttributeKeys)
                var toRet = [];
                _.each(intersection, function(i) {
                    _.each(_.where(data.attributes, {
                        'key': i
                    }), function(j) {
                        toRet.push(j);
                    });
                });
                _.each(toRet, function(i) {
                    i.description = group.attributes[i.key].description;
                    i.sortIndex = group.attributes[i.key].sortIndex;
                });
                return _.filter(toRet, function(i) {
                    return i.value == null || i.value == '';
                });
            };
        });
        $scope.relations = relations.query({
            id: $routeParams.id
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == 'Tag') {
                    $scope.nodeTags = data[i].relTypes[0].nodes;
                    $scope.hasTags = true;
                }
            }
            $scope.contentLoading = false;
        });
    }
]);