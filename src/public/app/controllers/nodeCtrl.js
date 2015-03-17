angular.module('apolloApp').controller('nodeCtrl', ['$scope', '$location', '$resource', '$http', '$routeParams', 'nodeAttributeDictionary',
    function($scope, $location, $resource, $http, $routeParams, nodeAttributeDictionary) {
        
        

        $scope.contentLoading = true;
        $scope.nodeId = $routeParams.id
        $scope.$parent.q = 'explore';
        $scope.isCollapsed = true;
        $scope.tablength=[];
        var siteName = 'Node Viewer: ' + $scope.nodeId
        var node = $resource('/apollo/api/node/:id', {
            id: '@id'
        });
        var labels = $http.get('/apollo/api/node/' + $routeParams.id + '/labels').success(function(data) {
            $scope.labels = data;
        });
        var relations = $resource('/apollo/api/node/:id/relations', {
            id: '@id'
        });


        var labels = $http.get('/apollo/api/node/'+$scope.nodeId+'/relations').success(function(data) {

            for(i=0;i<data.length;i++)
            {
               $scope.tablength[i]=0;
               //console.log("1**",data[i].relTypes.length);
               for(j=0;j<data[i].relTypes.length;j++)
               {
                    //console.log("2",data[i].relTypes[j].nodes.length);
                    $scope.tablength[i]=$scope.tablength[i]+data[i].relTypes[j].nodes.length;
               }
            }

            
        });

        var nodeDetails = $http.get('/apollo/api/node/' + $routeParams.id).success(function(data) {
            var attributeKeys = _.pluck(data.attributes, 'key');
            $scope.node = data;
            siteName = 'Details: ' + data.name;
                var site = {
                'name':siteName,
                 'url':$location.absUrl()
            }
            $scope.$parent.unshiftSiteHistory(site);
            
            var len = $scope.node.attributes.length;
            $scope.labelGroups = function(label) {
                return _.toArray(nodeAttributeDictionary[label].attributeGroups);
            };
            $scope.showGroup = function(group) {
                return $scope.labelGroupAttributes(group).length > 0;
            };
            $scope.labelGroupAttributes = function(group) {
                var groupAttributeKeys = Object.keys(group.attributes);
                var intersection = _.intersection(attributeKeys, groupAttributeKeys);
                var toRet = [];
                _.each(intersection, function(i) {
                    _.each(_.where(data.attributes, {
                        'key': i
                    }), function(j) {
                        toRet.push(j);
                    });
                });
                _.each(toRet, function(i) {
                    i.displayLabel = group.attributes[i.key].displayLabel;
                    i.description = group.attributes[i.key].description;
                    i.sortIndex = group.attributes[i.key].sortIndex;
                });
                return _.filter(toRet, function(i) {
                    return i.value != null && i.value.toLowerCase() != 'null' && i.value != '';
                });
            };
            $scope.hideGroup = function(group) {
                return $scope.hiddenGroupAttributes(group).length > 0;
            };
            $scope.hiddenGroupAttributes = function(group) {
                var groupAttributeKeys = Object.keys(group.attributes);
                var intersection = groupAttributeKeys;//_.intersection(attributeKeys, groupAttributeKeys)
                var toRet = [];
                _.each(intersection, function(i) {
                    group.attributes[i].key=i
                    group.attributes[i].value='';
                    _.each(_.where(data.attributes, {
                        'key': i
                    }), function(j) {
                        toRet.push(j);
                    });
                });

                
                //console.log(toRet.length,toRet[0].sortIndex);
                var missingCol=_.difference(groupAttributeKeys,_.pluck(toRet, 'key'));

                _.each(missingCol, function(i) {
                    _.each(_.where(group.attributes,{key:i}), function(k) {
                        toRet.push(k);
                    });
                });

                return _.filter(toRet, function(i) {
                    return i.value == null || i.value == '' || i.value.toLowerCase() == 'null';
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

        $scope.isUrl = function(str){
             if((str.indexOf('http://') == 0) || (str.indexOf('https://') == 0)){
                return true;
             }
             else
                return false;
        }

        $scope.exportrelationships= function()
        {
            window.location =  '/apollo/api/export/csvrelations/' + $scope.nodeId;
        }

        $scope.twitterBlurb = encodeURIComponent($location.absUrl());

        $scope.emailBlurb = encodeURIComponent($location.absUrl());

        

    }
    
]);