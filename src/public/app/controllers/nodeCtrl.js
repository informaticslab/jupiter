angular.module('apolloApp').controller('nodeCtrl', ['$scope', '$location', '$resource', '$http', '$routeParams', 'nodeAttributeDictionary',
    function($scope, $location, $resource, $http, $routeParams, nodeAttributeDictionary) {
        
        
        $scope.nodesArray=[];
        $scope.contentLoading = true;
        $scope.nodeId = $routeParams.id
        $scope.$parent.q = 'explore';
        $scope.isCollapsed = true;
        $scope.tablength=[];
        
        $scope.actAttributes = {};
        for (x in nodeAttributeDictionary) {
            //console.log("***********************"+x);
            $scope.actAttributes[x] = [];
            for (y in nodeAttributeDictionary[x].attributeGroups) {
                var attGroupSortIndex=nodeAttributeDictionary[x].attributeGroups[y].sortIndex;
                for (z in nodeAttributeDictionary[x].attributeGroups[y].attributes) {
                    //$scope.actAttributes[x].push("" + z + "");
                    var newattSortIndex=attGroupSortIndex+""+nodeAttributeDictionary[x].attributeGroups[y].attributes[z].sortIndex;
                    nodeAttributeDictionary[x].attributeGroups[y].attributes[z].sortIndex=newattSortIndex;
                    $scope.actAttributes[x].push({
                        attribute:z,
                        description:nodeAttributeDictionary[x].attributeGroups[y].attributes[z].description,
                        displayLabel:nodeAttributeDictionary[x].attributeGroups[y].attributes[z].displayLabel,                        
                        sortIndex:nodeAttributeDictionary[x].attributeGroups[y].attributes[z].sortIndex
                    });
                    //for getting attribute names 
                    // var attname=$filter('unCamelCase')(z);
                    // //console.log("x="+x+", z=" + attname + ", des="+nodeAttributeDictionary[x].attributeGroups[y].attributes[z].description);
                }
            } //$scope.nodeattributes.x
        }


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
                        $scope.nodesArray.push(j);
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
                        $scope.nodesArray.push(j);
                    });
                });

                
                //console.log(toRet.length,toRet[0].sortIndex);
                var missingCol=_.difference(groupAttributeKeys,_.pluck(toRet, 'key'));

                _.each(missingCol, function(i) {
                    _.each(_.where(group.attributes,{key:i}), function(k) {
                        toRet.push(k);
                        $scope.nodesArray.push(k);
                    });
                });
                $scope.toRet=toRet;
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
            console.log($scope.nodesArray);
            window.location =  '/apollo/api/export/csvrelations/' + $scope.nodeId;
        }

        $scope.exportnodedetails= function()
        {

            var csvString="\"Attribute Name\",\"Attribute Value\"\r\n";

            var attrArray= $scope.node.attributes;
            attrArray.sort(function(a,b) { return parseFloat(a.sortIndex) - parseFloat(b.sortIndex) } );
            for(att in attrArray)
            {
                if(attrArray[att].displayLabel!=undefined)
                {
                    csvString=csvString+"\""+attrArray[att].displayLabel+"\",\""+attrArray[att].value+"\"\r\n";
                }
                //var csvrow=$scope.actAttributes[$scope.labels][att].displayLabel+","+
            }

           // var element = angular.element('<a/>');
           //       element.attr({
           //           href: 'data:attachment/csv;charset=utf-8,' + encodeURI(csvString),
           //           target: '_blank',
           //           download: 'NodeDetails.csv'
           //       })[0].click();


            var IEcheck = checkIE();
            console.log(navigator.userAgent);
            if(IEcheck)
            {
                //console.log(navigator.appVersion);
                var csvContent=csvString; //here we load our csv data 
                var blob = new Blob([csvContent],{
                    type: "text/csv;charset=utf-8;"
                });

                navigator.msSaveBlob(blob, "NodeDetails.csv");
            }
            else
            {
                //console.log(navigator.appVersion);
                var hiddenElement = document.createElement('a');

                hiddenElement.href = 'data:attachment/csv,' + encodeURI(csvString);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'NodeDetails.csv';

                document.body.appendChild(hiddenElement);
                hiddenElement.click();
            }

            

        }

        function checkIE()
        {
          var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");

            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
                return true
            else                 // If another browser, return 0
                return false;
        }


        $scope.twitterBlurb = encodeURIComponent($location.absUrl());

        $scope.emailBlurb = encodeURIComponent($location.absUrl());

        

    }
    
]);