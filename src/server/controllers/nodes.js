var neodb = require('../lib/neo4jConnection');
var _ = require('underscore');
exports.getRelationsForNode = function(req, res) {
    var query = ['MATCH n-[r]-x ', 'where n.id={nodeId} ' //maaaaaaaagic
        , 'return id(r) as relId,type(r) as relType, x.id as childId, ', 'labels(x) as childLabels, x.name as childName order by relType '
    ].join('\n');
    var params = {
        nodeId: req.params.id
    };
    var relationships = [];
    neodb.db.query(query, params, function(err, r) {
        if (err) {
            console.error('Error retreiving relations from database:', err);
            res.send(404, 'no node at that location');
        } else {
            var allLabels = _.map(r, function(i) {
                return i.childLabels
            });
            var distinctLabels = _.union.apply(_, allLabels);
            var toRet = [];
            _.each(distinctLabels, function(a) {
                var labelToAdd = {
                    'name': a,
                    'relTypes': []
                };
                var labeled = _.filter(r, function(i) {
                    return _.contains(i.childLabels, a);
                });
                var mappedRelTypes = _.map(labeled, function(p) {
                    return p.relType;
                });
                var distinctRelTypes = _.union.apply(_, mappedRelTypes);
                _.each(distinctRelTypes, function(x, y, z) {
                    var relTypeToAdd = {
                        'name': x,
                        'nodes': []
                    };
                    _.chain(labeled).filter(function(i) {
                        return i.relType === x;
                    }).each(function(a) {
                        relTypeToAdd.nodes.push({
                            'id': a.childId,
                            'name': a.childName
                        });
                    });
                    labelToAdd.relTypes.push(relTypeToAdd);
                });
                toRet.push(labelToAdd);
            });
            res.json(toRet);
            //  console.log(toRet);
        }
    });
}
exports.getLabelsForNode = function(req, res) {
    //var query = ['START n=node({nodeId}) ', 'RETURN labels(n)'].join('\n');
    var query = ['MATCH n WHERE n.id ={nodeId}', 'RETURN labels(n)'].join('\n');
    var params = {
        nodeId: req.params.id
    };
    neodb.db.query(query, params, function(err, results) {
        if (err) {
            console.error('Error retreiving labels from database:', err);
            res.send(404, "No node at that locaton")
        } else {
            if (results[0] != null) {
                res.json(results[0]['labels(n)']);
            }
            else
            {
              res.send(404, "No node at that location");
            }
        }
    });
}
exports.getNodeById = function(req, res) {
     var query = 'MATCH n WHERE n.id ={nodeId} RETURN n'
    var params = {
        nodeId: req.params.id
    };
    //console.log("Query is " + query + " and params are " + req.params.id)
    neodb.db.query(query, params, function(err, results) {
        var nodedata = {};
        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'No node at that location');
        } else {
            //console.log("results were" + results[0]['n']);
            if (results[0] != null && results[0]['n'] != null && results[0]['n']['data'] != null) {
                var doohicky = results[0]['n']['data'];               
                //console.log(doohicky);
            
             nodedata.name = doohicky.name;
             nodedata.id = doohicky.id;
             nodedata.attributes = [];
             for (var prop in doohicky) {
                 nodedata.attributes.push({
                     'key': prop,
                     'value': doohicky[prop]
                })
             }
             res.json(nodedata);
            //res.send(404, "there was a node at that location, but you don't get to see it (neener)");
        }
        else
            {
              res.send(404, "No node at that location");
            }
        }
    });
};
exports.searchNodesByString = function(req, res) {

     var query = 'MATCH n WHERE n.name=~{qString} RETURN n, labels(n) skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.fullname=~{qString} RETURN n, labels(n) skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.contractphone=~{qString} RETURN n, labels(n) skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.mission=~{qString} RETURN n, labels(n) skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.contractname=~{qString} RETURN n, labels(n) skip {skipnum} limit {retNum}'
    var params = {
        qString: '(?i).*' + req.params.query + '.*',
        skipnum: 0,
        retNum: 50
    };
    //console.log("Query is " + query + " and params are " + params.qString);
    neodb.db.query(query, params, function(err, results) {
        var nodedataarr = [];
        var nodeLabelCounts = {Program:0,SurveillanceSystem:0,Registry:0,
                            HealthSurvey:0,Tool:0,Dataset:0,DataStandard:0,
                            Collaborative:0,Organization:0,Tag:0};
        var returnable = {};
        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'No node with that text available');
        } else {
            //console.log("results were" + results);
            //console.log("results length is" + results);
            if (results[0] != null && results[0]['n'] != null && results[0]['n']['data'] != null) {
                for(var i=0;i<results.length;i++)
                {
                    var nodedata = {};
                    var doohicky = results[i]['n']['data'];
                    var doohickylabels = results[i]['labels(n)'].join(',')             
                    //console.log(doohicky);
            
                     nodedata.name = doohicky.name;
                     nodedata.id = doohicky.id;
                     nodedata.labels = doohickylabels;
                     if (nodeLabelCounts[doohickylabels] != null)
                     {
                        nodeLabelCounts[doohickylabels]++;
                     }
                     else
                     {
                        nodeLabelCounts[doohickylabels] = 1;
                     }
                     nodedata.attributes = [];
                     for (var prop in doohicky) {
                            if(prop == 'id')
                            {
                                nodedata.attributes.push({
                                'key': prop,
                                'value': doohicky[prop] 
                                })
                            }
                    }
                    nodedataarr.push(nodedata);
                }
                //console.log(JSON.stringify(nodeLabelCounts))
                returnable.nodedataarr = nodedataarr;
                returnable.nodeLabelCounts = nodeLabelCounts;
                //console.log(returnable);
                res.json(returnable);
        }
        else
            {
              //res.send(404, "No node with that text available");
              res.json({"nullset":true}) ;
            }
        }
    });
};
exports.getNodesForLinkageViewer = function(req, res) {
    var query = ['MATCH n-[r]-x where n.id={nodeId} ',
    'return n.id as nodeId, labels(n) as nodeLabels, ',
    'n.name as nodeNames, ',
    'id(r) as relId,type(r) as relType, x.id as childId, ', 
    'labels(x) as childLabels, ',
    'startNode(r).id as startNode, ',
    'x.name as childName order by childLabels[0]'
    ].join('\n');
    var params = {
        nodeId: req.params.id
    };
    var viewerJson;
    neodb.db.query(query, params, function(err, r) {
        if (err) {
            console.error('Error retreiving relations from database:', err);
            res.send(404, 'no node at that location');
        } else {
            var nodeLabel = _.map(r, function(i) {
                return i.nodeLabels
            });
            if(nodeLabel != null && nodeLabel[0] != null)
            {
            nodeLabel = nodeLabel[0][0];
            var nodeName = _.map(r, function(i) {
                return i.nodeNames
            });
            nodeName = nodeName[0]          
            var allLabels = _.map(r, function(i) {
                return i.childLabels
            });

            var allRelations = _.map(r, function(i) {
                return i.relType
            });

            var allRelIds = _.map(r, function(i) {
                return i.relId
            });

            var allChildIds = _.map(r, function(i) {
                return i.childId
            });

            var allChildNames = _.map(r, function(i) {
                return i.childName
            });
            var relStartNode = _.map(r, function(i) {
                return i.startNode
            });
            //cast root node
            var nodes = [
                {
                    "name": nodeName,
                    "id":req.params.id,
                    "label":nodeLabel
                }
            ]
            //console.log(nodes);
            var links = [];
            for (var i=0;i<allRelations.length;i++)
            { 
                nodes.push({
                    "name":allChildNames[i],
                    "id":allChildIds[i],
                    "label":allLabels[i]
                });
                if(relStartNode[i] == allChildIds[i])
                {
                    links.push({
                        "source": i+1,
                        "target": 0,
                        "type":allRelations[i]
                    })
                }
                else
                {
                    links.push({
                        "source": 0,
                        "target": i+1,
                        "type":allRelations[i]
                    })
                }
            }
            viewerJson = {
                "nodes": nodes,
                "links": links
                        }
            //console.log(viewerJson);
            res.send(viewerJson);
            }
            else
            {
                res.send(404, 'no node at that location');
            }   
        }
    });
};
exports.getPortalStatisticsNodes = function(req, res) {
    var query = ['MATCH n ',
    'return labels(n) as label, count(*) as count '
    ].join('\n');
    var params = {};

    
    neodb.db.query(query, params, function(err, r) {
        if (err) {
            console.error('Error retreiving statistics from database:', err);
            res.send(404, 'no statistics available');
        } else {

            //console.log(r);
            res.send(r);
            
        }
    });
};


exports.getPortalStatisticsRelations = function(req, res) {
    var query = ['MATCH (a)-[r]->(b)',
    'return count(*) as count '
    ].join('\n');
    var params = {};

    
    neodb.db.query(query, params, function(err, r) {
        if (err) {
            console.error('Error retreiving statistics from database:', err);
            res.send(404, 'no statistics available');
        } else {

            console.log(r);
            res.send(r);
            
        }
    });
};

