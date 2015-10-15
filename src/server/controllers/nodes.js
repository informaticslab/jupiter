var neodb = require('../lib/neo4jConnection');
var urlFactory = require('../lib/urlFactory');
var mongo = require('../lib/mongoConnection');
var ObjectId = require('mongodb').ObjectID;
var _ = require('underscore');
var auditLog = require('../config/auditLog');


exports.getDataElements = function(req, res) {
    //var query = ['START n=node({nodeId}) ', 'RETURN labels(n)'].join('\n');
    console.log("get Data Elements");
    var query = 'MATCH (n)-[:CONTAINS]->(x:DataElement) WHERE n.id ={nodeId} optional match x-[:SHARES_MEANING_WITH]->(c:Concept) WHERE n.id ={nodeId} RETURN distinct x.id as id,x.name as name,x.description as description, c.id as cid, c.name as concept,c.cui as cui';
    var params = {
        nodeId: req.params.id
    };
    console.log('query ', query);
    console.log('parm ' ,params);
    neodb.db.query(query, params, function(err, results) {
        if (err) {
            console.error('Error retreiving data elements from database:', err);
            res.send(404, "No node at that locaton")
        } else {
            console.log(results);
            if (results[0] != null) {
                res.json(results);
            } else {
                res.json([{'id':'','name':'',description:'',cid:'',concept:'',cui:''}]);
            }
        }
    });
}

exports.saveDataElements = function(req, res) {
    console.log(req.body.dsetid);
    console.log(req.body.deObject);
    var deObject=req.body.deObject;
    var params={};
    var query ='';

    if (deObject.id) {
        // id for date element exist
       if (deObject.cid == '' || deObject.cid == null) {  // no concept relationship exist
            query = 'match (n)-[:CONTAINS]->(de)-[r:SHARES_MEANING_WITH]->(c) where n.id={dsetid} and de.id={deid} delete r';
              params={
                dsetid:req.body.dsetid,
                deid: deObject.id
            };
            neodb.db.query(query, params, function(err, r) {
            if (err) {
                console.error('Error retreiving relations from database:', err);
                res.send(404, 'no node at that location');
            }
            else {
                var query2 ='match (de {id:{deid}}) set de.name={dename}, de.description={dedescription}';
                params2 =   {
                    deid: deObject.id,
                    dename:deObject.name,
                    dedescription:deObject.description
                };
                    neodb.db.query(query2, params2, function(err, r) {
                    if (err) {
                        console.error('Error retreiving relations from database:', err);
                        res.send(404, 'no node at that location');
                    }
                    else {
                        res.send('success updating concept was null');
                    }
                });
                     
            }
        });
     
       } 
       else {
         //   console.log('cid is not null')
            query = 'match (n)-[:CONTAINS]->(de)-[r:SHARES_MEANING_WITH]->(c) where n.id={dsetid} and de.id={deid} delete r';
              params={
                dsetid:req.body.dsetid,
                deid: deObject.id
            };
            neodb.db.query(query, params, function(err, r) {
            if (err) {
                console.error('Error retreiving relations from database:', err);
                res.send(404, 'no node at that location');
            }
            else {
                var query2 ='match (de {id:{deid}}),(c {id:{cid}}) set de.name={dename}, de.description={dedescription} with de,c create (de)-[r:SHARES_MEANING_WITH]->(c)';
                params2 =   {
                    deid: deObject.id,
                    dename:deObject.name,
                    dedescription:deObject.description,
                    cid: deObject.cid
                };
                neodb.db.query(query2, params2, function(err, r) {
                    if (err) {
                        console.error('Error retreiving relations from database:', err);
                        res.send(404, 'no node at that location');
                    }
                    else {
                        res.send('success updating concept not null');
                    }
                });
                     
            }
        });

       }
                
         // query='match (n)-[:CONTAINS]->(de) where n.id={dsetid} and de.id={deid} set de.name={dename}, de.description={dedescription}';
     
       
    }
    else {
        var newDE = {};
        var query = '';
        var params = {};
        newDE.id = 'DE' + req.body.dsetid + new Date().getTime() +'1';

        newDE.name = deObject.name;
        newDE.description = deObject.description;
        if (deObject.cid == '' || deObject.cid == null) {
            params={
                dsId : req.body.dsetid,
                newDE: newDE
            };      
            query= 'MATCH (ds {id: {dsId}}) create (ds)-[r:CONTAINS]->(n:DataElement {newDE})';
        } else {
            params={
            dsId : req.body.dsetid,
            newDE: newDE,
            cid: deObject.cid 
        };
            query= 'MATCH (ds {id: {dsId}}),(c {id: {cid}}) create (ds)-[r:CONTAINS]->(n:DataElement {newDE})-[:SHARES_MEANING_WITH]->(c)';
        }
        console.log('params ', params);
        neodb.db.query(query, params, function(err, r) {
            if (err) {
                console.error('Error retreiving relations from database:', err);
                res.send(404, 'no node at that location');
            }
            else {
                res.send('add success');
            }
        });
      //  console.log(query);
    }

}

// /api/node/{id}/relations
exports.getRelationsForNode = function(req, res) {
    var query = ['MATCH n-[r]-x ', 'where n.id={nodeId} ' //maaaaaaaagic
        , 'return id(r) as relId,type(r) as relType, x.id as childId, ', 'startNode(r).id as startNode,', 'labels(x) as childLabels, x.name as childName order by relType, childName '
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
                            'url': urlFactory.nodeUrl(req, a.childId),
                            'name': a.childName,
                            'startNode': a.startNode
                        });
                    });
                    labelToAdd.relTypes.push(relTypeToAdd);
                });
                toRet.push(labelToAdd);
            });
            res.json(toRet);
            //  //console.log(toRet);
        }
    });
}

// /api/node/{id}/labels
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
            } else {
                res.send(404, "No node at that location");
            }
        }
    });
}


exports.getNodeNameAll = function(req, res) {
    //var query = ['START n=node({nodeId}) ', 'RETURN labels(n)'].join('\n');
    var query = 'MATCH n RETURN distinct n.name as name,n.id as id';
    var params = {
    };
    neodb.db.query(query, params, function(err, results) {
        if (err) {
            console.error('Error retreiving labels from database:', err);
            res.send(404, "No node at that locaton")
        } else {
            res.send(results);
        }
    });
}
// /api/node/{id}
exports.getNodeById = function(req, res) {
    var query = 'MATCH n WHERE n.id ={nodeId} RETURN n'
    var params = {
        nodeId: req.params.id
    };
    //console.log("Query is " + query + " and params are " + req.params.id);

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

                // attach links to response
                nodedata.url = urlFactory.nodeUrl(req, nodedata.id);
                nodedata.relations = urlFactory.nodeRelationsUrl(req, nodedata.id);
                nodedata.labels = urlFactory.nodeLinksUrl(req, nodedata.id);

                res.json(nodedata);
                //res.send(404, "there was a node at that location, but you don't get to see it (neener)");
            } else {
                res.send(404, "No node at that location");
            }
        }
    });
};

exports.searchByName = function(req, res) {
    var searchTerm = req.params.searchTerm.toLowerCase();
    var query = 'MATCH n WHERE lower(n.name)=~".*' + searchTerm + '.*" or lower(n.shortName)=~".*' + searchTerm + '.*" RETURN distinct n.id as id, n.name as name, n.shortName as shortname';
    //console.log(query);
    var params = {
        searchTerm: req.params.searchTerm
    };
    neodb.db.query(query, params, function(err, results) {
        //console.log(results);

        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'No node at that location');
        } else {
            if (results != null) {
                var nodedata = [];
                _.each(results, function(i) {
                    if (!(i.shortname)) {
                        nodedata.push({
                            id: i.id,
                            name: i.name,
                            displayname: i.name
                        });
                    } else {
                        nodedata.push({
                            id: i.id,
                            name: i.name + " (" + i.shortname + ")",
                            displayname: i.name
                        });
                    }

                })
                res.json(nodedata);
            } else {
                res.json([]);
            }
        }
    });
};

exports.searchConceptNode = function(req, res) {
    var searchTerm = req.params.searchTerm.toLowerCase();
    var query = 'match (n:Concept) where n.id <> "CN0" and lower(n.name)=~".*' + searchTerm +'.*" return n.id as id,n.name as name ,n.cui as cui';
    console.log(query);
    var params = {
        searchTerm: req.params.searchTerm
    };
    neodb.db.query(query, params, function(err, results) {
        //console.log(results);

        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'No node at that location');
        } else {
            if (results != null) {
                var nodedata = [];
                _.each(results, function(i) {
                       console.log('i :', i);
                       nodedata.push({
                            id: i.id,
                            name: i.name,
                            cui: i.cui
                        });
                 })
                 console.log('node data from server: ',nodedata);
                res.json(nodedata);
            } else {
                res.json([]);
            }
        }
    });
};

exports.searchSysTreeByName = function(req, res) {
    var searchTerm = req.params.searchTerm.toLowerCase();
    var query = 'match p=(n)-[r:OVERSEES|MANAGES*]->x where lower(n.name)=~".*' + searchTerm + '.*" return distinct n.name as name, n.id as id'
    var params = {
        searchTerm: req.params.searchTerm
    };
    // var query = 'MATCH n WHERE lower(n.name)=~".*' + searchTerm + '.*" RETURN n.id as id, n.name as name';
    // //console.log(query);
    // var params = {
    //     searchTerm: req.params.searchTerm
    // };
    neodb.db.query(query, params, function(err, results) {
        //console.log(results);

        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'No node at that location');
        } else {
            if (results != null) {
                var nodedata = [];
                _.each(results, function(i) {
                    nodedata.push({
                        id: i.id,
                        name: i.name
                    });
                })
                res.json(nodedata);
            } else {
                res.json([]);
            }
        }
    });
};

var sortFunction = function(a, b) {
    //Compare "a" and "b" in some fashion, and return -1, 0, or 1
    if (a.name > b.name) {
        return 1;
    } else if (a.name == b.name) {
        return 0;
    } else if (a.name < b.name) {
        return -1;
    }
}

var compileSearchResults = function(req, res, err, results) {
    var nodedataarr = [];
    var nodeLabelCounts = {
        Program: 0,
        SurveillanceSystem: 0,
        Registry: 0,
        HealthSurvey: 0,
        Tool: 0,
        Dataset: 0,
        DataStandard: 0,
        Collaborative: 0,
        Organization: 0,
        Concept:0,
        DataElement: 0,
        Tag: 0,
        Total: 0,
        FutureDev: 0,
        UnderDev: 0,
        PartOperational: 0,
        FullOperational: 0,
        Retired: 0,
        NotAvailable: 0
    };
    var returnable = {};
    var duplicheck = [];
    if (err) {
        console.error('Error retreiving node from database:', err);
        res.send(404, 'No node with that text available');
    } else {
        //console.log("results were" + results);
        //console.log("results length is" + results);
        if (results[0] != null && results[0]['n'] != null && results[0]['n']['data'] != null) {
            for (var i = 0; i < results.length; i++) {
                var doohicky = results[i]['n']['data'];
                if (duplicheck[doohicky.id] == null) {
                    duplicheck[doohicky.id] = true;
                    var nodedata = {};
                    var doohickylabels = results[i]['labels(n)'].join(',')
                    var relCount = results[i]['relCount']
                    if (relCount == null) {
                        relCount = 0;
                    }
                    //console.log(doohicky);

                    nodedata.name = doohicky.name;
                    nodedata.id = doohicky.id;
                    nodedata.labels = doohickylabels;
                    nodedata.relCount = relCount;
                    nodedata.status = 'Not Available';
                    if (nodeLabelCounts[doohickylabels] != null) {
                        nodeLabelCounts[doohickylabels] ++;
                    } else {
                        nodeLabelCounts[doohickylabels] = 1;
                    }
                    nodeLabelCounts['Total'] ++;
                    nodedata.attributes = [];
                    for (var prop in doohicky) {
                        if (prop == 'purpose' || prop == 'description') {
                            if (doohicky[prop].length > 450) {
                                nodedata.attributes.push({
                                    'key': prop,
                                    'value': doohicky[prop].substring(0, 447) + '...'
                                });

                            } else {
                                nodedata.attributes.push({
                                    'key': prop,
                                    'value': doohicky[prop]
                                });
                            }
                        }

                        if (prop == 'operationalStatus' && doohicky[prop] != null && doohicky[prop] != '') {
                            nodedata.status = doohicky[prop];
                            if (doohicky[prop] == 'Planned for Future Development') {
                                nodeLabelCounts['FutureDev'] ++;
                            } else if (doohicky[prop] == 'Under Development, but not yet Operational') {
                                nodeLabelCounts['UnderDev'] ++;
                            } else if (doohicky[prop] == 'Partially Operational and Implemented') {
                                nodeLabelCounts['PartOperational'] ++;
                            } else if (doohicky[prop] == 'Fully Operational and Implemented') {
                                nodeLabelCounts['FullOperational'] ++;
                            } else if (doohicky[prop] == 'Retired') {
                                nodeLabelCounts['Retired'] ++;
                            }
                        }
                    }

                    nodedataarr.push(nodedata);
                }
            }

            nodedataarr.sort(sortFunction);
            returnable.nodedataarr = nodedataarr;
            returnable.nodeLabelCounts = nodeLabelCounts;
            //console.log(returnable);
            res.json(returnable);
        } else {
            //res.send(404, "No node with that text available");
            res.json({
                "nullset": true
            });
        }
    }
}

exports.searchNodesByLabel = function(req, res) {

    //NOTE:  THIS WILL NEED TO BE CHANGED AS IT IS CYPHER INJECTION SUSCEPTIBLE
    //for some reason query is being shady and wont work with the usual prepared statements.
    var query = 'MATCH (n:`' + req.params.query + '`)-[r]-x RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}' + 'union all ' + 'MATCH (n:`' + req.params.query + '`) RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'
    var params = {
        //qString:  req.params.query ,
        skipnum: 0,
        retNum: 500
    };
    //console.log(params);

    neodb.db.query(query, params, function(err, results) {
        compileSearchResults(req, res, err, results)
    });
}

// /api/nodes/search/{searchTerm}
exports.searchNodesByString = function(req, res) {

    var query = 'MATCH n-[r]-x WHERE n.name=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n-[r]-x WHERE n.fullname=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n-[r]-x WHERE n.contractphone=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n-[r]-x WHERE n.mission=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n-[r]-x WHERE n.contractname=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n-[r]-x WHERE n.shortName=~{qString} RETURN n, labels(n), count(r) as relCount  skip {skipnum} limit {retNum}' +
        //'union all '+
        //'MATCH n-[r]-x WHERE n.purpose=~{qString} RETURN n, labels(n), count(r) as relCount order by n.name skip {skipnum} limit {retNum}' +
        //'union all '+
        //'MATCH n-[r]-x WHERE n.description=~{qString} RETURN n, labels(n), count(r) as relCount order by n.name skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n WHERE n.name=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n WHERE n.fullname=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n WHERE n.contractphone=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n WHERE n.mission=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n WHERE n.contractname=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}' +
        'union all ' +
        'MATCH n WHERE n.shortName=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'
        //+
        //'union all '+
        //'MATCH n WHERE n.purpose=~{qString} RETURN n, labels(n), 0 as relCount order by n.name skip {skipnum} limit {retNum}' +
        //'union all '+
        //'MATCH n WHERE n.description=~{qString} RETURN n, labels(n), 0 as relCount order by n.name skip {skipnum} limit {retNum}' 
    var params = {
        qString: '(?i).*' + req.params.query + '.*',
        skipnum: 0,
        retNum: 500
    };

    //console.log("Query is " + query + " and params are " + params.qString);
    neodb.db.query(query, params, function(err, results) {
        compileSearchResults(req, res, err, results);
    });
};

exports.getNodesForLinkageViewer = function(req, res) {
    // var query = ['MATCH n-[r]-x where n.id={nodeId} ',
    // 'return n.id as nodeId, labels(n) as nodeLabels, ',
    // 'n.name as nodeNames, ',
    // 'id(r) as relId,type(r) as relType, x.id as childId, ', 
    // 'r.relationshipDescription as relDesc, ',
    // 'labels(x) as childLabels, ',
    // 'startNode(r).id as startNode, ',
    // 'x.name as childName order by childName, childLabels[0]'
    // ].join('\n');

    var query = ['OPTIONAL MATCH n-[r]-x-[*0..1]-y where n.id={nodeId} ',
        'with n, r, x, y',
        'return n.id as nodeId, labels(n) as nodeLabels, ',
        'n.name as nodeNames, ',
        'id(r) as relId,type(r) as relType, x.id as childId, ',
        'r.relationshipDescription as relDesc, ',
        'labels(x) as childLabels, ',
        'startNode(r).id as startNode, ',
        'x.name as childName , count(y) as rel2Count order by childName, childLabels[0]'
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
            if (nodeLabel != null && nodeLabel[0] != null) {
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

                var allRelDesc = _.map(r, function(i) {
                    return i.relDesc
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
                var relationsCount = _.map(r, function(i) {
                    return i.rel2Count
                });

                //cast root node
                var nodes = [{
                    "name": nodeName,
                    "id": req.params.id,
                    "label": nodeLabel
                }]

                var tokennodes = [req.params.id]
                    //console.log(nodes);
                var links = [];
                var xi = 0;
                for (var i = 0; i < allRelations.length; i++) {

                    var tokennodeid = allChildIds[i];
                    //console.log("tokennodeid",tokennodeid);

                    //node=JSON.parse(node);
                    //found=-1;
                    var found = false;

                    tokennodes.forEach(function(d) {
                        if (tokennodeid == d) {
                            //console.log(tokennodeid+" tokennodeid found in d.id "+d);
                            found = true
                        }

                    });



                    //console.log(found,node);
                    //console.log(nodes);
                    if (!found) {
                        // Element was found, remove it.

                        tokennodes.push(tokennodeid);

                        nodes.push({
                            "name": allChildNames[i],
                            "id": allChildIds[i],
                            "label": allLabels[i],
                            "relationsCount": relationsCount[i]
                        });


                        if (relStartNode[i] == allChildIds[i]) {
                            links.push({
                                "source": xi + 1,
                                "target": 0,
                                "type": allRelations[i],
                                "description": allRelDesc[i]
                            })
                        } else {
                            links.push({
                                "source": 0,
                                "target": xi + 1,
                                "type": allRelations[i],
                                "description": allRelDesc[i]
                            })
                        }
                        //console.log("!found therefore pushing",nodes);
                        xi++;
                    } else {

                        if (relStartNode[i] == allChildIds[i]) {
                            links.push({
                                "source": xi,
                                "target": 0,
                                "type": allRelations[i],
                                "description": allRelDesc[i]
                            })
                        } else {
                            links.push({
                                "source": 0,
                                "target": xi,
                                "type": allRelations[i],
                                "description": allRelDesc[i]
                            })
                        }
                        // Element was not found, add it.
                        // //console.log("Not found");
                    }


                    /*nodes.push({
                        "name":allChildNames[i],
                        "id":allChildIds[i],
                        "label":allLabels[i]
                    });*/

                }
                viewerJson = {
                        "nodes": nodes,
                        "links": links
                    }
                    //console.log(viewerJson);
                res.send(viewerJson);
            } else {
                res.send(404, 'no node at that location');
            }
        }
    });
};
exports.getPortalStatisticsNodes = function(req, res) {

    //var id = req.params.id;
    //console.log(id);
    var id = "undefined";
    if (req.params.id) {
        id = req.params.id;
    }
    //console.log(id);
    var query, params;

    //console.log("node id",id);

    if (id == 'undefined') {
        query = ['MATCH n ',
            'return labels(n) as label, count(*) as count '
        ].join('\n');
        params = {};
    } else {
        query = ['MATCH (n)-[r:OVERSEES|MANAGES*]->x where n.id={id}',
            'return labels(x) as label, count(distinct x.id) as count '
        ].join('\n');
        params = {
            id: id
        };
    }

    //console.log(query,params);

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


exports.exportCSV = function(req, res) {

    var id = req.params.id;
    var qparams = req.params.qparam;

    var qparam = qparams.split(",");


    var ntype = qparam[0].split("=")[1];
    var nname = qparam[1].split("=")[1];
    var orderby = qparam[2].split("=")[1];
    var asc = qparam[3].split("=")[1];


    //console.log(ntype,nname,orderby,asc);

    var searchtype = ntype;
    var searchnode = nname;

    if (searchtype == "undefined") {
        searchtype = "";
    }

    if (searchnode == "undefined") {
        searchnode = "";
    }
    if (orderby == "undefined") {
        orderby = "name";
    }
    if (asc == "undefined" | asc == "true") {
        asc = "ASC";
    } else {
        asc = "DESC";
    }


    //var id="O31"
    var validationresults = [];


    if (id == 'undefined') {
        query = ['MATCH n where NOT(labels(n)[0] = "Tag") and n.name=~{nodename} and labels(n)[0]=~{nodetype}',
            'return distinct n.id as id, n.name as name, labels(n) as label, n.informationValidated as validationstatus order by ' + orderby + ' ' + asc
        ].join('\n');
        params = {
            //id:id,
            nodetype: "(?i).*" + searchtype + ".*",
            nodename: "(?i).*" + searchnode + ".*"
        };
    } else {
        query = ['MATCH (n)-[r:OVERSEES|MANAGES*]->x where NOT(labels(x)[0] = "Tag") and n.id={id} and x.name=~{nodename} and labels(x)[0]=~{nodetype}',
            'return distinct x.id as id, x.name as name, labels(x) as label, x.informationValidated as validationstatus order by ' + orderby + ' ' + asc
        ].join('\n');
        params = {
            id: id,
            nodetype: "(?i).*" + searchtype + ".*",
            nodename: "(?i).*" + searchnode + ".*"
        };
    }

    //console.log(query, params);



    neodb.db.query(query, params, function(err, r) {
        if (err) {
            console.error('Error retreiving statistics from database:', err);
            res.send(404, 'Error encountered');
        } else {

            validationresults.push([
                "Name",
                "Id",
                "Type",
                "Validation Status"
            ]);
            r.forEach(function(d) {
                //console.log(d.name);
                validationresults.push([
                    d.name,
                    d.id,
                    d.label[0],
                    d.validationstatus
                ]);
            });

            //res.json(validationresults);

            //res.send(validationresults);
            //console.log(validationresults);
            res.header('content-type', 'text/csv');
            res.header('content-disposition', 'attachment; filename=report.csv');

            // res.csv([
            //    ["a", "b", "c"]
            //  , ["d", "e", "f"]
            //  ]);
            res.csv(validationresults);

        }
    });


};


exports.exportCSVNodeRelations = function(req, res) {

    var id = req.params.id;

    var resultsarr = [];



    query = ['MATCH (n)-[r]-(x) where n.id={id}',
        'return distinct n.id as qid, n.name as qname, labels(n)[0] as qlabel, type(r) as reltype, x.id as rid, x.name as rname, labels(x)[0] as rlabel, startNode(r).id as startnodeid'
    ].join('\n');
    params = {
        id: id
    };
    //console.log(query, params);
    neodb.db.query(query, params, function(err, r) {
        if (err) {
            console.error('Error retreiving statistics from database:', err);
            res.send(404, 'Error encountered');
        } else {

            resultsarr.push([
                "Node A",
                "Relationship Type",
                "Node B"
            ]);
            r.forEach(function(d) {
                //console.log(d.name);

                if (d.qid == d.startnodeid) {
                    resultsarr.push([
                        d.qname + " (" + d.qlabel + ")",
                        d.reltype,
                        d.rname + " (" + d.rlabel + ")"
                    ]);
                } else {
                    resultsarr.push([
                        d.rname + " (" + d.rlabel + ")",
                        d.reltype,
                        d.qname + " (" + d.qlabel + ")"
                    ]);
                }


            });

            //res.json(validationresults);

            //res.send(validationresults);
            //console.log(validationresults);
            res.header('content-type', 'text/csv');
            res.header('content-disposition', 'attachment; filename=NodeRelationships.csv');

            // res.csv([
            //    ["a", "b", "c"]
            //  , ["d", "e", "f"]
            //  ]);
            res.csv(resultsarr);

        }
    });


};




exports.getPortalStatisticsNodesValidated = function(req, res) {

    var id = req.params.id;
    //console.log("node id",id);
    var query, params;

    if (id == 'undefined') {
        query = ['MATCH n where n.informationValidated=\'No\' or trim(n.informationValidated)=\'\'',
            'return labels(n) as label, count(*) as count '
        ].join('\n');
        params = {};
    } else {
        {
            query = ['MATCH (n)-[r:OVERSEES|MANAGES*]->x where n.id={id} and (x.informationValidated=\'No\' or trim(n.informationValidated)=\'\')',
                'return labels(x) as label, count(distinct x.id) as count '
            ].join('\n');
            params = {
                id: id
            };
        }
    }

    //console.log(query,params);

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


exports.getValidationStatus = function(req, res) {

    var id = req.params.id;

    var validationresults = [];


    if (id == 'undefined') {
        query = ['MATCH n where NOT(labels(n)[0] = "Tag")',
            'return distinct n.id as id, n.name as name, labels(n) as label, n.informationValidated as validationstatus order by name'
        ].join('\n');
        params = {};
    } else {
        query = ['MATCH (n)-[r:OVERSEES|MANAGES*]->x where NOT(labels(x)[0] = "Tag") and n.id={id} ',
            'return distinct x.id as id, x.name as name, labels(x) as label, x.informationValidated as validationstatus order by name'
        ].join('\n');
        params = {
            id: id
        };
    }

    //console.log(query, params);



    neodb.db.query(query, params, function(err, r) {
        if (err) {
            console.error('Error retreiving statistics from database:', err);
            res.send(404, 'no statistics available');
        } else {

            r.forEach(function(d) {
                //console.log(d.name);
                validationresults.push({
                    "name": d.name,
                    "id": d.id,
                    "type": d.label[0],
                    "validationstatus": d.validationstatus
                });
            });
            //console.log(validationresults);
            res.json(validationresults);

            //res.send(validationresults);

        }
    });
};


// exports.getValidationStatusDetails = function(req, res) {
//     var searchTerm = req.params.query.toLowerCase();
//     //console.log("searchTerm="+searchTerm);
//     var query = 'match p=(n)-[r:OVERSEES|MANAGES*]->x where lower(n.name)={searchTerm}' 
//             + 'return distinct x.name as name,labels(x) as type, x.id as id, x.informationValidated as validation'
//     var params = {
//         searchTerm: searchTerm
//     };
//     // var query = 'MATCH n WHERE lower(n.name)=~".*' + searchTerm + '.*" RETURN n.id as id, n.name as name';
//     //console.log(query);
//     // var params = {
//     //     searchTerm: req.params.searchTerm
//     // };
//     neodb.db.query(query, params, function(err, results) {
//         //console.log(results);

//         if (err) {
//             console.error('Error retreiving node from database:', err);
//             res.send(404, 'No node at that location');
//         } else {
//             if (results != null) {
//                 var nodedata = [];
//                 _.each(results, function(i){
//                     nodedata.push({id: i.id, type:i.type[0], name:i.name,validation:i.validation});
//                 })
//                 //console.log(nodedata);
//                 res.json(nodedata);
//             }
//             else{
//                 res.json([]);
//             }
//         }
//     });
// };



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

            //console.log(r);
            res.send(r);

        }
    });
};

var compileSearchResultsForLab = function(req, res, err, results) {
    var nodedataarr = [];
    var nodeLabelCounts = {
        Program: 0,
        SurveillanceSystem: 0,
        Registry: 0,
        HealthSurvey: 0,
        Tool: 0,
        Dataset: 0,
        DataStandard: 0,
        Collaborative: 0,
        Organization: 0,
        Tag: 0,
        Total: 0
    };

    var returnable = {};
    var duplicheck = [];

    if (err) {
        console.error('Error retreiving node from database:', err);
        res.send(404, 'Nodes not available');
    } else {

        if (results[0] != null && results[0]['n'] != null && results[0]['n']['data'] != null) {
            for (var i = 0; i < results.length; i++) {
                var doohicky = results[i]['n']['data'];
                if (duplicheck[doohicky.id] == null) {
                    duplicheck[doohicky.id] = true;
                    var nodedata = {};

                    var doohickylabels = results[i]['labels'];
                    var relCount = results[i]['relCount'];
                    if (relCount == null) {
                        relCount = 0;
                    }

                    nodedata.name = doohicky.name;
                    nodedata.id = doohicky.id;
                    nodedata.labels = doohickylabels;
                    nodedata.imports = [];
                    nodedataarr.push(nodedata);

                }
            }

            nodedataarr.sort(sortFunction);
            res.json(nodedataarr);
        } else {
            //res.send(404, "No node with that text available");
            res.json({
                "nullset": true
            });
        }
    }
}

exports.getAllNodes = function(req, res) {

    var query = 'MATCH (n) where labels(n)[0]<>"Tag" return n, labels(n) as labels';
    var params = {};

    neodb.db.query(query, params, function(err, results) {

        if (err) {
            //console.log("Could not get all the nodes from the database");
        } else {
            compileSearchResultsForLab(req, res, err, results);
            // res.send(results);
        }
    });
};

exports.getAllRealtionsForAllNodes = function(req, res) {

    var query = 'MATCH n-[r]-x where labels(x)[0]<>"Tag" return n.id as p, n.name as pname, x.id as cid, labels(x)[0] as clabel, x.name as cname';
    var params = {};

    neodb.db.query(query, params, function(err, results) {

        if (err) {
            //console.log("Could not get all the relations for the nodes from the database");
        } else {
            res.send(results);
        }
    });
};

exports.getAdvancedSearchData = function(req, res) {


    var nodes = req.params.id;
    //console.log(nodes);

    var nodesarr = nodes.split("-");

    var hops = nodesarr[2];

    var hopsarr = hops.split(",");



    var query, params;

    query = "";

    query1 = ['MATCH p1=(a)-[*1]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p1) |x.name) as Nodes, extract(y in nodes(p1) |y.id) as NodesId, extract(s in nodes(p1) |labels(s)) as NodesLabel, extract(z in relationships(p1) | type(z)) as Relations, ',
        'extract(r in relationships(p1) | startNode(r).id) as StartNodes, extract(t in relationships(p1) | t.relationshipDescription ) as Description'
    ].join('\n');


    query2 = ['MATCH p=(a)-[*1]-(b)-[*1]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p) |x.name) as Nodes, extract(y in nodes(p) |y.id) as NodesId, extract(s in nodes(p) |labels(s)) as NodesLabel, extract(z in relationships(p) | type(z)) as Relations, ',
        'extract(r in relationships(p) | startNode(r).id) as StartNodes, extract(t in relationships(p) | t.relationshipDescription ) as Description'
    ].join('\n');

    query3 = ['MATCH p1=(a)-[*1]-(b)-[*2]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p1) |x.name) as Nodes, extract(y in nodes(p1) |y.id) as NodesId, extract(s in nodes(p1) |labels(s)) as NodesLabel, extract(z in relationships(p1) | type(z)) as Relations, ',
        'extract(r in relationships(p1) | startNode(r).id) as StartNodes, extract(t in relationships(p1) | t.relationshipDescription ) as Description',
        'union',
        'MATCH p=(a)-[*2]-(b)-[*1]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p) |x.name) as Nodes, extract(y in nodes(p) |y.id) as NodesId, extract(s in nodes(p) |labels(s)) as NodesLabel, extract(z in relationships(p) | type(z)) as Relations, ',
        'extract(r in relationships(p) | startNode(r).id) as StartNodes, extract(t in relationships(p) | t.relationshipDescription ) as Description'
    ].join('\n');

    query4 = ['MATCH p=(a)-[*2]-(b)-[*2]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p) |x.name) as Nodes, extract(y in nodes(p) |y.id) as NodesId, extract(s in nodes(p) |labels(s)) as NodesLabel, extract(z in relationships(p) | type(z)) as Relations, ',
        'extract(r in relationships(p) | startNode(r).id) as StartNodes, extract(t in relationships(p) | t.relationshipDescription ) as Description'
    ].join('\n');



    for (var i = 0; i < hopsarr.length; i++) {


        if (hopsarr[i] == 1) {
            query = query + query1 + " union ";

        }
        if (hopsarr[i] == 2) {
            //query=query+query2+" union ";
            query = query1 + " union " + query2 + " union ";

        }
        if (hopsarr[i] == 3) {

            //query=query+query3+" union ";
            query = query1 + " union " + query2 + " union " + query3 + " union ";

        }
        if (hopsarr[i] == 4) {
            //query=query+query4+" union ";
            query = query1 + " union " + query2 + " union " + query3 + " union " + query4 + " union ";

        }
    }

    /*
         else {
            console.error('Error retreiving degrees of seperation from database:');
            res.send(404, 'no degree indicated');

        }

    */

    //query=query2;//+" union "+query2;


    query = query.trim();
    var lastIndex = query.lastIndexOf(" ")



    query = query.substring(0, lastIndex);

    var params = {
        leftId: nodesarr[0],
        rightId: nodesarr[1]
    };

    //console.log(params);

    var viewerJson;
    neodb.db.query(query, params, function(err, r) {
        if (err) {
            console.error('Error retreiving relations from database:', err);
            res.send(404, 'no node at that location');
        } else {
            //console.log(r);

            if (r == "") {

                res.send(404, 'no node at that location');
            } else {


                //console.log(nodes);
                //console.log(relations);

                var obj = eval(r);
                var nodesA = [];

                obj.forEach(function(d) {
                    //console.log("Nodes",d.Nodes);

                    var dnodes = eval(d.Nodes);
                    var dnodesid = eval(d.NodesId);
                    var dnodeslabel = eval(d.NodesLabel);
                    var drelations = eval(d.Relations);
                    var dstartnodes = eval(d.StartNodes);
                    var drelationsdescription = eval(d.Description);


                    //console.log("dnodes",dnodes);
                    //console.log("dnodes length",dnodes.length);


                    //check for redundant hops in path

                    var nodesRedundancyCheck = [];
                    nodesRedundancyCheck.push(dnodes[0]);

                    var found = false;
                    for (var i = 1; i < dnodes.length; i++) {
                        found = false;
                        for (j = 0; j < nodesRedundancyCheck.length; j++) {
                            if (dnodes[i] == nodesRedundancyCheck[j]) {
                                found = true;
                                break;
                            }


                        }
                        if (!found) {
                            nodesRedundancyCheck.push(dnodes[i]);
                            //console.log("ushed",nodesRedundancyCheck);
                        } else {
                            break;
                        }

                    }
                    if (found) {

                    } else {

                        /*
                        if (hops == 3) {
                            if (dnodes.length == 4) {
                                for (var i = 0; i < dnodes.length - 1; i++) {

                                    //console.log("1--",dnodes[i]);
                                    nodesA.push({
                                        "source": dnodes[i],
                                        "sourceid": dnodesid[i],
                                        "target": dnodes[i + 1],
                                        "targetid": dnodesid[i + 1],
                                        "sourcelabel": dnodeslabel[i],
                                        "targetlabel": dnodeslabel[i + 1],
                                        "type": drelations[i],
                                        "startnode": dstartnodes[i],
                                        "description": drelationsdescription[i],
                                        "objectid": dnodes[i] + dnodesid[i] + dnodes[i + 1] + dnodesid[i + 1] + drelations[i] + dstartnodes[i]
                                    });

                                    //console.log("nodesA",nodesA[i]);

                                }

                            }
                            */
                        //} else {
                        for (var i = 0; i < dnodes.length - 1; i++) {

                            //console.log("1--",dnodes[i]);
                            nodesA.push({
                                "source": dnodes[i],
                                "sourceid": dnodesid[i],
                                "target": dnodes[i + 1],
                                "targetid": dnodesid[i + 1],
                                "sourcelabel": dnodeslabel[i],
                                "targetlabel": dnodeslabel[i + 1],
                                "type": drelations[i],
                                "startnode": dstartnodes[i],
                                "description": drelationsdescription[i],
                                "objectid": dnodes[i] + dnodesid[i] + dnodes[i + 1] + dnodesid[i + 1] + drelations[i] + dstartnodes[i]
                            });

                            //console.log("nodesA",nodesA[i]);

                        }
                        //}



                    }



                });


                //console.log("nodesA",nodesA);

                if (nodesA.length == 0) {
                    res.send(404, "No nodes retuned");

                } else {


                    var nodesAunique = [];

                    nodesAunique.push(nodesA[0]);
                    //console.log("push",nodesAunique[0].objectid);

                    for (var i = 0; i < nodesA.length; i++) {
                        var found = false;
                        for (j = 0; j < nodesAunique.length; j++) {
                            if (nodesA[i].objectid == nodesAunique[j].objectid) {
                                //console.log("break");
                                //continue;
                                found = true;
                                break;
                            }

                        }

                        if (!found) {
                            nodesAunique.push(nodesA[i]);

                        }

                    }

                    //console.log("nodesAunique",nodesAunique);



                    var nodes = [];

                    nodes.push({
                        "name": nodesAunique[0].source,
                        "id": nodesAunique[0].sourceid,
                        "label": nodesAunique[0].sourcelabel
                    });

                    for (var i = 0; i < nodesAunique.length; i++) {
                        var found = false;
                        for (j = 0; j < nodes.length; j++) {
                            if (nodesAunique[i].sourceid == nodes[j].id) {
                                found = true;
                                break;
                            }


                        }
                        if (!found) {
                            nodes.push({
                                "name": nodesAunique[i].source,
                                "id": nodesAunique[i].sourceid,
                                "label": nodesAunique[i].sourcelabel
                            });
                        }

                    }



                    for (var i = 0; i < nodesAunique.length; i++) {
                        var found = false;
                        for (j = 0; j < nodes.length; j++) {
                            if (nodesAunique[i].targetid == nodes[j].id) {
                                found = true;
                                break;
                            }


                        }
                        if (!found) {
                            nodes.push({
                                "name": nodesAunique[i].target,
                                "id": nodesAunique[i].targetid,
                                "label": nodesAunique[i].targetlabel
                            });
                        }

                    }


                    //console.log("nodes",nodes);


                    var links = [];



                    for (var i = 0; i < nodesAunique.length; i++) {

                        var sourcenodeid = nodesAunique[i].sourceid;
                        var targetnodeid = nodesAunique[i].targetid;
                        var sourcenodeindex;
                        var targetnodeindex;
                        var startnodeid = nodesAunique[i].startnode;



                        for (var j = 0; j < nodes.length; j++) {
                            //console.log(i,j, nodes.id,sourcenodeid);
                            if (nodes[j].id == sourcenodeid) {
                                sourcenodeindex = j;
                                break;

                            }

                        }
                        //console.log(sourcenodeid, sourcenodeindex,targetnodeid, targetnodeindex);



                        for (var j = 0; j < nodes.length; j++) {
                            if (nodes[j].id == targetnodeid) {
                                targetnodeindex = j;
                                break;

                            }

                        }


                        //console.log(sourcenodeid, sourcenodeindex,targetnodeid, targetnodeindex);

                        if (sourcenodeid == startnodeid) {
                            links.push({
                                "source": sourcenodeindex,
                                "target": targetnodeindex,
                                "type": nodesAunique[i].type,
                                "description": nodesAunique[i].description
                            });
                        } else {
                            links.push({
                                "source": targetnodeindex,
                                "target": sourcenodeindex,
                                "type": nodesAunique[i].type,
                                "description": nodesAunique[i].description
                            });
                        }


                    }


                    if (nodes.length > 50) {

                        res.send(413, "Too many nodes returned");
                    } else {
                        viewerJson = {
                            "nodes": nodes,
                            "links": links
                        }
                        res.send(viewerJson);

                    }



                }



                //console.log(nodes.length);



            }
        }
    });
};
exports.getNodeNameById = function(req, res) {
    var query = 'MATCH n WHERE n.id ={nodeId} RETURN n.name as name, labels(n) as label'
    var params = {
        nodeId: req.params.id
    };

    neodb.db.query(query, params, function(err, results) {

        var nodename = "";
        if (err != null) {
            console.error('Error retreiving node from database:', err);
            //console.log(err);
            res.send(404, 'No node at that location.');
        } else {


            if (results[0] == null) {
                //console.log("no name");
                res.send("Not Found");
            } else {
                resultsobj = eval(results);

                nodename = resultsobj[0].name;
                nodelabel = resultsobj[0].label[0];



                nodelabel = nodelabel.replace(/([a-z])([A-Z])/g, '$1 $2');
                nodelabel = nodelabel.replace(/_/g, ' ');
                nodelabel = nodelabel.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3');
                nodelabel = nodelabel.replace(/^./, function(nodelabel) {
                    return nodelabel.toUpperCase();
                });


                res.send(nodename + " (" + nodelabel + ")");
            }



        }
    });
};


exports.getManagedSystems = function(req, res) {

    var query = 'match p=(n)-[r:OVERSEES|MANAGES*]->x where n.id={nodeId} ' + 'return extract(a in nodes(p) | a.name) as byName, extract(a in nodes(p) |  a.id ) as byId, ' + 'extract(a in nodes(p) |  a.informationValidated ) as byVal, length(p) as len'
    var params = {
        nodeId: req.params.id
    };

    neodb.db.query(query, params, function(err, results) {
        var managestack = {};
        if (err != null) {
            console.error('Error retreiving node from database:', err);
            //console.log(err);
            res.send(404, 'No node at that location.');
        } else {
            if (results[0] == null) {
                res.send("Not Found");
            } else {
                //pack the parent object
                idctr = 1;
                resultsobj = eval(results);
                managestack.name = resultsobj[0].byName[0];
                managestack.sysId = resultsobj[0].byId[0];
                managestack.id = idctr;
                idctr++;
                managestack.valid = resultsobj[0].byVal[0];
                managestack.children = [];
                //iterate over children
                for (var k = 0; k < resultsobj.length; k++) {
                    //iterate over an item, building out tree if unable to find item in managestack
                    var parentschildren = managestack.children;
                    for (var i = 1; i <= resultsobj[k].len; i++) {
                        var searchId = resultsobj[k].byId[i]
                        var foundChild = null;
                        for (var q = parentschildren.length - 1; q >= 0; q--) {
                            if (parentschildren[q].sysId == searchId) {
                                foundChild = parentschildren[q];
                                break;
                            }
                        }
                        if (foundChild === null) {
                            var child = {};
                            child.name = resultsobj[k].byName[i];
                            child.id = idctr;
                            idctr++;
                            child.sysId = resultsobj[k].byId[i];
                            child.valid = resultsobj[k].byVal[i];
                            foundChild = child;
                            parentschildren.push(foundChild)
                        }
                        if (i < resultsobj[k].len) //there are grandchildren.  If there is not a children array, create it
                        {
                            if (foundChild.children == null) {
                                foundChild.children = []
                            }
                        }
                        parentschildren = foundChild.children;
                    }
                }
                //send the whole thing up to the people who are gonna view it.
                res.send(managestack);
                //res.send(flare);
            }
        }
    });
};

exports.getAllRelationships = function(req, res) {
    var query = 'match a-[r]->b return distinct type(r) as relname'
    var params = {
        nodeId: req.params.id
    };

    neodb.db.query(query, params, function(err, results) {

        var nodename = "";
        if (err != null) {
            console.error('Error retreiving node from database:', err);
            //console.log(err);
            res.send(404, 'No node at that location.');
        } else {


            if (results[0] == null) {
                //console.log("no name");
                res.send("Not Found");
            } else {
                var obj = eval(results);

                res.send(obj);
            }



        }
    });
}

exports.getAllNodeTypes = function(req, res) {
    var query = 'match a return distinct labels(a)[0] as nodetypes'
    var params = {
        nodeId: req.params.id
    };

    neodb.db.query(query, params, function(err, results) {

        if (err != null) {
            console.error('Error retreiving node from database:', err);
            //console.log(err);
            res.send(404, 'No node at that location.');
        } else {


            if (results[0] == null) {
                //console.log("no name");
                res.send("Not Found");
            } else {
                var obj = eval(results);



                res.send(obj);
            }



        }
    });
}


exports.getAdhocQueryResults = function(req, res) {


    var adhocquery = req.params.query;
    //console.log(adhocquery);

    var q = adhocquery.split("+");
    var qnode = q[0];
    var nt = q[1];
    var rt = q[2];

    rt = rt.replace(/-/g, ":");

    validationresults = [];

    //console.log(qnode,rt,nt);


    var query = 'match a-[r' + rt + ']-b where labels(b)[0] in [' + nt + '] and a.id in [' + qnode + '] return distinct a.name as aname, a.id as aid,b.name as bname,b.id as bid,labels(b)[0] as btype,type(r) as rel';
    //console.log(query);
    var params = {

    };

    neodb.db.query(query, params, function(err, results) {

        if (err != null) {
            console.error('Error retreiving node from database:', err);
            //console.log(err);
            res.send(404, 'No node at that location.');
        } else {


            if (results[0] == null) {
                //console.log("no name");
                res.json(validationresults);
            } else {
                //var obj = eval(results);

                results.forEach(function(d) {
                    //console.log(d.bname);
                    validationresults.push({
                        "aname": d.aname,
                        "aid": d.aid,
                        "bname": d.bname,
                        "bid": d.bid,
                        "btype": d.btype,
                        "rel": d.rel
                    });
                });

                //console.log(validationresults);

                res.json(validationresults);
            }



        }
    });
}

exports.getAdhocQueryRelatedNodeTypesResults = function(req, res) {


    var adhocquery = req.params.query;
    //console.log(adhocquery);

    var q = adhocquery.split("+");
    var qnode = q[0];
    var nt = q[1];
    var ads = q[2];
    var mo = q[3];

    var likeclause = "";
    if (ads == "NA") {
        likeclause = "";
    } else {

        var adsstring = ads.split(",");

        for (i = 0; i < adsstring.length; i++) {
            var adsattr = adsstring[i].split("=");
            adsattr[1] = adsattr[1].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\\\$&');
            likeclause = likeclause + " lower(b." + adsattr[0] + ")=~'.*" + adsattr[1] + ".*' OR";
        }

        likeclause = likeclause.replace(/((OR)$)/g, "");
        likeclause = " (" + likeclause + ") and ";



    }

    validationresults = [];
    //console.log(qnode,rt,nt);
    var query = "";

    if (mo == "MO") {
        query = 'match p=shortestPath(a-[r:MANAGED|:OVERSEES*]->b) where ' + likeclause + ' labels(b)[0] in [' + nt + '] and a.id in [' + qnode + '] return distinct a.name as aname, a.id as aid,labels(a)[0] as atype,b.name as bname,b.id as bid,labels(b)[0] as btype, extract(x IN nodes(p) | "{\\\"id\\\":\\\""+x.id+"\\\",\\\"label\\\":\\\""+labels(x)[0]+"\\\",\\\"name\\\":\\\""+x.name+"\\\"}") as pathnodes, extract(x IN relationships(p) | "{\\\"source\\\":\\\""+startNode(x).id+"\\\",\\\"target\\\":\\\""+endNode(x).id+"\\\",\\\"reltype\\\":\\\""+type(x)+"\\\"}") as pathlinks,length(p) as pathlen  order by pathlen';
    } else {
        query = 'match p=shortestPath(a-[r*]-b) where ' + likeclause + ' labels(b)[0] in [' + nt + '] and a.id in [' + qnode + '] return distinct a.name as aname, a.id as aid,labels(a)[0] as atype,b.name as bname,b.id as bid,labels(b)[0] as btype, extract(x IN nodes(p) | "{\\\"id\\\":\\\""+x.id+"\\\",\\\"label\\\":\\\""+labels(x)[0]+"\\\",\\\"name\\\":\\\""+x.name+"\\\"}") as pathnodes, extract(x IN relationships(p) | "{\\\"source\\\":\\\""+startNode(x).id+"\\\",\\\"target\\\":\\\""+endNode(x).id+"\\\",\\\"reltype\\\":\\\""+type(x)+"\\\"}") as pathlinks,length(p) as pathlen  order by pathlen';
    }

    //console.log(query);
    var params = {

    };

    neodb.db.query(query, params, function(err, results) {

        if (err != null) {
            console.error('Error retreiving node from database:', err);
            //console.log(err);
            res.send(404, 'No node at that location.');
        } else {


            if (results[0] == null) {
                //console.log("no name");
                res.json(validationresults);
            } else {
                //var obj = eval(results);

                results.forEach(function(d) {
                    //console.log(d.bname);
                    if (d.aid != d.bid)
                        validationresults.push({
                            "aname": d.aname,
                            "aid": d.aid,
                            "atype": d.atype,
                            "bname": d.bname,
                            "bid": d.bid,
                            "btype": d.btype,
                            //"rel": d.rel,
                            "pathnodes": d.pathnodes,
                            "pathlinks": d.pathlinks
                        });
                });

                //console.log(validationresults);

                res.json(validationresults);
            }



        }
    });
}



exports.getAdhocQueryRelatedNodeTypesResultsCSV = function(req, res) {


    var adhocquery = req.params.query;
    //console.log(adhocquery);

    var q = adhocquery.split("+");
    var qnode = q[0];
    var nt = q[1];
    var ads = q[2];
    var mo = q[3];

    var likeclause = "";
    if (ads == "NA") {
        likeclause = "";
    } else {

        var adsstring = ads.split(",");

        for (i = 0; i < adsstring.length; i++) {
            var adsattr = adsstring[i].split("=");
            adsattr[1] = adsattr[1].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\\\$&');
            likeclause = likeclause + " lower(b." + adsattr[0] + ")=~'.*" + adsattr[1] + ".*' OR";
        }

        likeclause = likeclause.replace(/((OR)$)/g, "");
        likeclause = " (" + likeclause + ") and ";



    }

    validationresults = [];

    //console.log(qnode,rt,nt);
    var query = "";

    if (mo == "MO") {
        query = 'match p=shortestPath(a-[r:MANAGED|:OVERSEES*]->b) where ' + likeclause + ' labels(b)[0] in [' + nt + '] and a.id in [' + qnode + '] return distinct a.name as aname, a.id as aid,labels(a)[0] as atype,b.name as bname,b.id as bid,labels(b)[0] as btype, extract(x IN nodes(p) | "{\\\"id\\\":\\\""+x.id+"\\\",\\\"label\\\":\\\""+labels(x)[0]+"\\\",\\\"name\\\":\\\""+x.name+"\\\"}") as pathnodes, extract(x IN relationships(p) | "{\\\"source\\\":\\\""+startNode(x).id+"\\\",\\\"target\\\":\\\""+endNode(x).id+"\\\",\\\"reltype\\\":\\\""+type(x)+"\\\"}") as pathlinks,length(p) as pathlen  order by pathlen';
    } else {
        query = 'match p=shortestPath(a-[r*]-b) where ' + likeclause + ' labels(b)[0] in [' + nt + '] and a.id in [' + qnode + '] return distinct a.name as aname, a.id as aid,labels(a)[0] as atype,b.name as bname,b.id as bid,labels(b)[0] as btype, extract(x IN nodes(p) | "{\\\"id\\\":\\\""+x.id+"\\\",\\\"label\\\":\\\""+labels(x)[0]+"\\\",\\\"name\\\":\\\""+x.name+"\\\"}") as pathnodes, extract(x IN relationships(p) | "{\\\"source\\\":\\\""+startNode(x).id+"\\\",\\\"target\\\":\\\""+endNode(x).id+"\\\",\\\"reltype\\\":\\\""+type(x)+"\\\"}") as pathlinks,length(p) as pathlen  order by pathlen';
    }

    //console.log(query);
    var params = {

    };

    neodb.db.query(query, params, function(err, results) {

        if (err != null) {
            console.error('Error retreiving node from database:', err);
            //console.log(err);
            res.send(404, 'No node at that location.');
        } else {


            if (results[0] == null) {
                validationresults.push({
                    "aname": "Activity Name",
                    //"aid":"Activity ID",
                    "atype": "Activity Type",
                    "bname": "Related Activity Name",
                    //"bid": "Related Activity ID",
                    "btype": "Related Activity Type"
                        //"pathnodes": "d.pathnodes",
                        //"pathlinks": "d.pathlinks"
                });
            } else {
                //var obj = eval(results);
                validationresults.push({
                    "aname": "Activity Name",
                    //"aid":"Activity ID",
                    "atype": "Activity Type",
                    "bname": "Related Activity Name",
                    //"bid": "Related Activity ID",
                    "btype": "Related Activity Type"
                        //"pathnodes": "d.pathnodes",
                        //"pathlinks": "d.pathlinks"
                });

                results.forEach(function(d) {
                    //console.log(d.bname);
                    if (d.aid != d.bid)
                        validationresults.push({
                            "aname": d.aname,
                            //"aid":d.aid,
                            "atype": d.atype,
                            "bname": d.bname,
                            //"bid": d.bid,
                            "btype": d.btype
                                //"pathnodes": d.pathnodes,
                                //"pathlinks": d.pathlinks
                        });
                });

            }
            res.header('content-type', 'text/csv');
            res.header('content-disposition', 'attachment; filename=export.csv');
            res.csv(validationresults);

        }



    });
}



exports.getAttributeValues = function(req, res) {


    var attr = req.params.attr;

    var attrarr = attr.split("+");

    var attrname = attrarr[0];
    var attrtype = attrarr[1];
    var attrval = attrarr[2];


    var query = 'match (a:`' + attrtype + '`) where lower(a.' + attrname + ')=~".*' + attrval + '.*"  return distinct a.' + attrname + ' as values';

    //var query = 'MATCH n WHERE lower(n.name)=~".*' + searchTerm + '.*" or lower(n.shortName)=~".*' + searchTerm + '.*" RETURN distinct n.id as id, n.name as name, n.shortName as shortname';
    //console.log(query);
    var params = {
        searchTerm: req.params.searchTerm
    };
    neodb.db.query(query, params, function(err, results) {
        //console.log(results);

        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'No node at that location');
        } else {
            if (results != null) {
                var nodedata = [];

                _.each(results, function(i) {
                    nodedata.push({
                        values: i.values
                    });
                })
                res.json(nodedata);
            } else {
                res.json([]);
            }
        }
    });
};


exports.getRelationshipValues = function(req, res) {


    var id = req.params.id;

    var query = 'match (a)-[r]-(b) where a.id=\'' + id + '\' return a.id as aid, a.name as aname, b.id as bid, b.name as bname, type(r) as reltype, startNode(r).id as startid, endNode(r).id as endid,startNode(r).name as startname, endNode(r).name as endname, r.relationshipDescription as reldesc';

    //var query = 'MATCH n WHERE lower(n.name)=~".*' + searchTerm + '.*" or lower(n.shortName)=~".*' + searchTerm + '.*" RETURN distinct n.id as id, n.name as name, n.shortName as shortname';
    //console.log(id,query);
    var params = {
        nodeid: id
    };
    neodb.db.query(query, params, function(err, results) {
        //console.log(results);

        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'No node at that location');
        } else {
            if (results != null) {
                res.json(results);
            } else {
                res.json({});
            }
        }
    });
};

exports.getMongoAll = function(req, res) {
    var collection = mongo.mongodb.collection('cr');

    collection.find({}).toArray(function(err, docs) {
        //assert.equal(err, null);
        //assert.equal(2, docs.length);
        //console.log("Found the following records");
        //console.log(docs)
        //callback(docs);
        res.send(docs);
    });

};

exports.getMongoStatus = function(req, res) {

    var id = req.params.id;
    var query={'id':id,'CR_STATUS':'PENDING'};
    var returnfields = {_id:1, CR_USER_DN_CREATE:1};

    var collection = mongo.mongodb.collection('cr');

    
    collection.find(query,returnfields).toArray(function(err, docs) {
        //assert.equal(err, null);
        //assert.equal(2, docs.length);
        //console.log("Found the following records");
        //console.log(docs)
        //callback(docs);
        res.send(docs);
    });

    //db.cr.find({'id':'SS15','CR_STATUS':'APPROVED'}).count()
};


exports.postUpdateCR = function(req, res) {



    //console.log("req params",req.body);
    var nodeDataString = {};
    nodeDataString = req.body.attr;
    nodeDataString["rels"] = JSON.stringify(req.body.rels);
    var type ='CR';
    var userId ="";
    var displayName = "";
    var notes = "";

    //console.log(nodeDataString);
    var currenttime = new Date().getTime();
    nodeDataString['CR_DATE_CREATED']=currenttime;
    var collection = mongo.mongodb.collection('cr');
    // Insert some documents
    collection.insert(nodeDataString, function(err, result) {
        // assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        //console.log("Inserted 3 documents into the document collection");
        res.send("success");
        //console.log("returned",result[0]._id);

        var log={id:result[0]._id,action:"CREATE",user:result[0].CR_USER_DN_CREATE,date:currenttime,crdata:nodeDataString};

        var logcollection = mongo.mongodb.collection('logs');
    // Insert some documents
        logcollection.insert(log, function(err, result) {
            if(err)
            {
                console.log("failed to insert log",err);
            }
        });    
        userId = result[0].CR_USER_ID_CREATE;
        displayName = result[0].CR_USER_DN_CREATE;
        notes = 'EDIT_ID: '+ result[0]._id;

        auditLog.add(type,userId,displayName,notes);    
    });


    //res.send("ok");
};

exports.postAddCR = function(req, res) {

    

    //console.log("req params", req.body);
    var nodeDataString = {};
    nodeDataString = req.body.attr;
    nodeDataString["rels"] = JSON.stringify(req.body.rels);
    var currenttime = new Date().getTime();
    nodeDataString['CR_DATE_CREATED']=currenttime;
    var type ='CR';
    var userId ="";
    var displayName = "";
    var notes = "";
    //console.log(nodeDataString);
  

    var collection = mongo.mongodb.collection('cr');
    // Insert some documents
    collection.insert(nodeDataString, function(err, result) {

        if (err) {
            console.log(err);
            res.send("fail");
        } else {
            //console.log(result);
            res.send("success");
            var log={id:result[0]._id,action:"CREATE",user:result[0].CR_USER_DN_CREATE,date:currenttime,crdata:nodeDataString};

            var logcollection = mongo.mongodb.collection('logs');
        // Insert some documents
            logcollection.insert(log, function(err, result) {
                if(err)
                {
                    console.log("failed to insert log",err);
                }
               
            });
            
            userId = result[0].CR_USER_ID_CREATE;
            displayName = result[0].CR_USER_DN_CREATE;
            notes = 'ADD_ID: '+ result[0]._id;

            auditLog.add(type,userId,displayName,notes);


        }
        // assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        //console.log("Inserted 3 documents into the document collection");

    });
    //res.send("ok");
};

exports.postDeleteCR = function(req, res) {



    //console.log("req params",req.body);

    var nodeDataString = req.body;
    var currenttime = new Date().getTime();
    nodeDataString['CR_DATE_CREATED']=currenttime;
    var type ='CR';
    var userId ="";
    var displayName = "";
    var notes = "";


    var collection = mongo.mongodb.collection('cr');
    // Insert some documents
    collection.insert(nodeDataString, function(err, result) {
        // assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        //console.log("Inserted 3 documents into the document collection");
        res.send("success");

        var log={id:result[0]._id,action:"CREATE",user:result[0].CR_USER_DN_CREATE,date:currenttime,crdata:nodeDataString};

        var logcollection = mongo.mongodb.collection('logs');
    // Insert some documents
        logcollection.insert(log, function(err, result) {
            if(err)
            {
                console.log("failed to insert log",err);
            }
        });    

        userId = result[0].CR_USER_ID_CREATE;
        displayName = result[0].CR_USER_DN_CREATE;
        notes = 'DELETE_ID: '+ result[0]._id;

        auditLog.add(type,userId,displayName,notes);  

    });
    //res.send("ok");
};



exports.deleteMongoCR = function(req, res) {


    //console.log("req params",req.body);

    var mongoid = req.body.mongoid;

    var type ='CR';
    var userId ="";
    var displayName = "";
    var notes = "";



    var collection = mongo.mongodb.collection('cr');

    collection.remove({
        _id: ObjectId(mongoid)
    }, function(err, result) {
        //console.log(result,err);
        res.send("success");
    });

    userId = req.body.adminUserId;
    displayName = req.body.adminUserDisplayName;
    notes = 'DELETE_FROM_QUEUE_ID: '+ mongoid;

    auditLog.add(type,userId,displayName,notes);  
    //res.send("ok");


};



exports.getCR = function(req, res) {

    var mongoid = req.params.id;


    var collection = mongo.mongodb.collection('cr');
    collection.find({
        _id: ObjectId(mongoid)
    }).toArray(function(err, docs) {

        res.send(docs);
    });

    //res.send("ok");
};

exports.getLatestChanges = function(req,res) {
    var collection = mongo.mongodb.collection('logs');

    collection.find({'crdata.CR_STATUS': 'APPROVED'}).sort({_id:-1}).limit(8).toArray(function(err, docs) {
        
        res.send(docs);
    });


}

exports.getUsers = function(req, res) {

    var collection = mongo.mongodb.collection('users');
    collection.find({},{_id:1,firstName:1,lastName:1,email:1,provider:1,lastLogin:1,roles:1}).toArray(function(err, docs) {

        res.send(docs);
    });

    //res.send("ok");
};

exports.getCRLog = function(req, res) {

    var mongoid = req.params.id;


    var collection = mongo.mongodb.collection('logs');
    collection.find({
        id: ObjectId(mongoid)
    }).toArray(function(err, docs) {

        res.send(docs);
    });

    //res.send("ok");
};

// var testID = function(id){

//     var idnew="";

//     var testquery='match (n) where n.id={testidparam} return n.id as id'
//     var testparam={
//         testidparam:id
//     };
//     neodb.db.query(testquery, testparam, function(err, results) {
//         if (err) {
//             console.error('Error retreiving node from database:', err);
//             res.send(404, 'No node at that location');
//         } else {
//             console.log("results",results);

//             //var idalphanum=;
//             if(results.length<=0)
//             {
//                 console.log("id=",id);
//                 return id;
//             }
//             else
//             {
//                 var idalphanum = results[0].id;
//                 var idnumstring = idalphanum.match(/\d*$/);
//                 console.log("idnumstring",idnumstring[0]);
//                 var idnum=parseInt(idnumstring[0]);
//                 idnum++;
//                 console.log(idnum);
//                 idnew=idalphanum.replace(/\d*$/,idnum.toString());

//                 console.log("NEW ID",idnew);

//                 testID(idnew);


//             }
//         }

//     });
//     console.log("exiting func call",id)

// };

exports.postApproveCR = function(req, res) {

    var mongodata = req.body.approved;
    var currenttime = new Date().getTime();
    mongodata['CR_DATE_EXECUTED']=currenttime;
    mongodata['CR_STATUS']="APPROVED";
    var type ='AD';
    var userId ="";
    var displayName = "";
    var notes = "";


    var prevdata = JSON.stringify(req.body.prev);
    mongodata['CR_PREVIOUS']=prevdata;
    var req_type = req.body.type;

    //var checkedid=testID(mongodata.id);

    //console.log("func call for id",checkedid);
    //console.log("***********APPROVED***********req params mongodata",mongodata);
    //console.log("req type",req_type);

    if (req_type == "ADD") {


        var query = 'match (a) where labels(a)[0]={label} return a.id as id, length(a.id) as len order by len desc, id desc limit 1';
        var params = {
            label: mongodata.CR_NODE_TYPE
        };

        neodb.db.query(query, params, function(err, results) {
            if (err) {
                console.error('Error retreiving node from database:', err);
                res.send(404, 'No node at that location');
            } else {
                //console.log(results[0].id);
                var id = results[0].id;
                var idalphanum = id;
                var idnumstring = idalphanum.match(/\d*$/);
                //console.log("idnumstring", idnumstring[0]);
                var idnum = parseInt(idnumstring[0]);
                idnum++;
                //console.log(idnum);
                idnew = idalphanum.replace(/\d*$/, idnum.toString());

                //console.log("NEW ID", idnew);

                mongodata.id=idnew;



                var query = 'create (n:`' + mongodata.CR_NODE_TYPE + '`{params})';
                var params = {
                    params: mongodata
                };
                //console.log(query,params);
                neodb.db.query(query, params, function(err, results) {

                    if (err) {
                        console.error('Error retreiving node from database:', err);
                        res.send(404, 'No node at that location');
                    } else {
                        console.log("mongo els", mongodata.rels)
                        if (mongodata.rels == "[]") {
                            var collection = mongo.mongodb.collection('cr');

                            //var currenttime = new Date().getTime();
                            //console.log();
                            var mongodatawithoutid={};

                            for(var key in mongodata)
                            {
                                //console.log(key);
                                if(key=="_id")
                                {

                                }
                                else
                                {
                                    mongodatawithoutid[key]=mongodata[key];
                                }
                            }
                            collection.update({
                                _id: ObjectId(mongodata._id)
                            }, 
                                mongodatawithoutid
                            , function(err, result) {
                                //console.log(result);
                                if(err)
                                {
                                    console.log(err);
                                    res.send("fail");
                                }
                                else
                                {
                                    //console.log(result,"success?",mongodata);
                                    res.send("success");
                                    var log={id:ObjectId(mongodata._id),action:"APPROVE",user:mongodata.CR_USER_DN_EXECUTE,date:currenttime,crdata:mongodata};

                                    var logcollection = mongo.mongodb.collection('logs');
                                // Insert some documents
                                    logcollection.insert(log, function(err, result) {
                                        if(err)
                                        {
                                            console.log("failed to insert log",err);
                                        }
                                    }); 

                                    //insert record to auditLogs
                                    userId = mongodata.CR_USER_ID_EXECUTE;
                                    displayName = mongodata.CR_USER_DN_EXECUTE;
                                    notes = 'APPROVED; ADD_ID: '+mongodata._id;

                                    auditLog.add(type,userId,displayName,notes);

                                }
                                
                            });
                            //console.log("MONGO UPATE NO REL:",mongodata.id);
                        } else {
                            var rels = [];

                            rels = eval(mongodata.rels);
                            //console.log("rels",rels);
                            var matchclause = "(" + mongodata.id + "{id:'" + mongodata.id + "'})";
                            var withclause = "" + mongodata.id + "";
                            var createclause = "";
                            var query = '';
                            var bnodeids = [];
                            rels.forEach(function(d) {

                                if (bnodeids.indexOf(d.bid) < 0) {
                                    //console.log(d.startid+'--'+d.endid+'--'+d.reltype);

                                    matchclause = matchclause + ", (" + d.bid + "{id:'" + d.bid + "'}) ";
                                    withclause = withclause + ", " + d.bid + " ";

                                    var reldesc = "";
                                    if (d.reldesc == undefined) {
                                        reldesc = "N/A";
                                    } else {
                                        reldesc = d.reldesc;
                                        //console.log("OLD:",reldesc);
                                        reldesc = reldesc.replace(/\\/g, "\\\\");
                                        reldesc = reldesc.replace(/"/g, "\\\"");
                                        reldesc = reldesc.replace(/'/g, "\\\'");
                                        //console.log("NEW:",reldesc);
                                    }

                                    //console.log(d.startid,d.endid);
                                    if(d.startid=="TBD")
                                    {
                                        d.startid=mongodata.id;
                                    }
                                    if(d.endid=="TBD")
                                    {
                                        d.endid=mongodata.id;
                                    }

                                    createclause = createclause + " create " + d.startid + "-[:`" + d.reltype + "`{`relationshipDescription`:'" + reldesc + "'}]->" + d.endid + " ";

                                    bnodeids.push(d.bid);
                                }



                            });

                            var params = {};
                            query = 'match ' + matchclause + ' with ' + withclause + createclause;
                            //console.log("QUERY",query);
                            neodb.db.query(query, params, function(err1, results1) {
                                //console.log(results1);

                                if (err1) {
                                    console.error('Error retreiving node from database:', err1);
                                    res.send(404, 'No node at that location');
                                } else {
                                    //console.log(results1);
                                    var collection = mongo.mongodb.collection('cr');

                                    //var currenttime = new Date().getTime();
                                    //console.log();
                                    var mongodatawithoutid={};

                                    for(var key in mongodata)
                                    {
                                        //console.log(key);
                                        if(key=="_id")
                                        {

                                        }
                                        else
                                        {
                                            mongodatawithoutid[key]=mongodata[key];
                                        }
                                    }

                                    collection.update({
                                        _id: ObjectId(mongodata._id)
                                    }, 
                                    mongodatawithoutid
                                    , function(err, result) {
                                        //console.log(result);
                                        res.send("success");

                                        var log={id:ObjectId(mongodata._id),action:"APPROVE",user:mongodata.CR_USER_DN_EXECUTE,date:currenttime,crdata:mongodata};

                                        var logcollection = mongo.mongodb.collection('logs');
                                    // Insert some documents
                                        logcollection.insert(log, function(err, result) {
                                            if(err)
                                            {
                                                console.log("failed to insert log",err);
                                            }
                                        }); 

                                        //insert record to auditLogs
                                        userId = mongodata.CR_USER_ID_EXECUTE;
                                        displayName = mongodata.CR_USER_DN_EXECUTE;
                                        notes = 'APPROVED; ADD_ID: '+mongodata._id;

                                        auditLog.add(type,userId,displayName,notes);         
                                        });
                                    //console.log("MONGO UPATE WITH REL:",mongodata.id);
                                }
                            });
                        }
                        //res.send("success");
                    }
                });

            }

        });


    }

    if (req_type == "UPDATE") {

        var query = 'match (n{id:\'' + mongodata.id + '\'}) set n={params}, n.CR_PREVIOUS={prevdata} return n';
        //console.log(query);
        var params = {
            params: mongodata,
            prevdata: prevdata
        };
        neodb.db.query(query, params, function(err, results) {

            if (err) {
                console.error('Error retreiving node from database:', err);
                res.send(404, 'No node at that location');
            } else {
                //console.log(results);
                // var collection = mongo.mongodb.collection('cr');
                // var currenttime = new Date().getTime();
                // //console.log();
                // collection.update({
                //     _id: ObjectId(mongodata._id)
                // }, {
                //     $set: {
                //         CR_STATUS: "APPROVED",
                //         CR_DATE: currenttime,
                //         CR_PREVIOUS: prevdata
                //     }
                // }, function(err, result) {});
            }
        });

        var rels = [];

        rels = eval(mongodata.rels);
        //console.log("rels",rels);
        var matchclause = "(" + mongodata.id + "{id:'" + mongodata.id + "'})";
        var withclause = "" + mongodata.id + "";
        var createclause = "";
        var query = '';
        var bnodeids = [];
        rels.forEach(function(d) {

            if (bnodeids.indexOf(d.bid) < 0) {
                //console.log(d.startid+'--'+d.endid+'--'+d.reltype);

                matchclause = matchclause + ", (" + d.bid + "{id:'" + d.bid + "'}) ";
                withclause = withclause + ", " + d.bid + " ";
            }
            //createclause = createclause + " create " + d.startid + "-[:`" + d.reltype + "`]->" + d.endid + " ";
            var reldesc = "";
            if (d.reldesc == undefined) {
                reldesc = "N/A";
            } else {
                reldesc = d.reldesc;
                //console.log("OLD:",reldesc);
                reldesc = reldesc.replace(/\\/g, "\\\\");
                reldesc = reldesc.replace(/"/g, "\\\"");
                reldesc = reldesc.replace(/'/g, "\\\'");
                //console.log("NEW:",reldesc);
            }

            createclause = createclause + " create " + d.startid + "-[:`" + d.reltype + "`{`relationshipDescription`:'" + reldesc + "'}]->" + d.endid + " ";

            bnodeids.push(d.bid);
            //}



        });
        query = 'match ' + matchclause + ' with ' + withclause + createclause;
        //console.log(query);

        var delrelquery = "match (a{id:'" + mongodata.id + "'})-[r]-() delete r";
        //console.log(delrelquery);

        if(createclause.trim()=="")
        {
            
            neodb.db.query(delrelquery, {}, function(err, results) {
                //console.log(results);

                if (err) {
                    console.error('Error retreiving node from database:', err);
                    res.send(404, 'No node at that location');
                } else {



                    var collection = mongo.mongodb.collection('cr');

                    //var currenttime = new Date().getTime();
                    //console.log();

                    var mongodatawithoutid={};

                    for(var key in mongodata)
                    {
                        console.log(key);
                        if(key=="_id")
                        {

                        }
                        else
                        {
                            mongodatawithoutid[key]=mongodata[key];
                        }
                    }
                    collection.update({
                        _id: ObjectId(mongodata._id)
                    }, mongodatawithoutid
                    , function(err, result) {
                        //console.log(result);
                        res.send("success");

                        var log={id:ObjectId(mongodata._id),action:"APPROVE",user:mongodata.CR_USER_DN_EXECUTE,date:currenttime,crdata:mongodata};

                        var logcollection = mongo.mongodb.collection('logs');
                    // Insert some documents
                        logcollection.insert(log, function(err, result) {
                            if(err)
                            {
                                console.log("failed to insert log",err);
                            }
                        });
                        //insert entry to auditLogs

                        userId = mongodata.CR_USER_ID_EXECUTE;
                        displayName = mongodata.CR_USER_DN_EXECUTE;
                        notes = 'APPROVED; EDIT_ID: '+mongodata._id;

                        auditLog.add(type,userId,displayName,notes);          
                    });
                }
            });
        }
        else
        {
                
                
                //console.log("2605",delrelquery);
                neodb.db.query(delrelquery, {}, function(err, results) {
                //console.log(results);

                if (err) {
                    console.error('Error retreiving node from database:', err);
                    res.send(404, 'No node at that location');
                } else {
                    var params = {};

                    neodb.db.query(query, params, function(err1, results1) {
                        //console.log(results1);
                        //console.log("2617",query);
                        if (err1) {
                            console.error('Error retreiving node from database:', err1);
                            res.send(404, 'No node at that location');
                        } else {
                            //console.log(results1);
                            var collection = mongo.mongodb.collection('cr');

                            //var currenttime = new Date().getTime();
                            //console.log();

                            var mongodatawithoutid={};

                            for(var key in mongodata)
                            {
                                //console.log(key);
                                if(key=="_id")
                                {

                                }
                                else
                                {
                                    mongodatawithoutid[key]=mongodata[key];
                                }
                            }
                            collection.update({
                                _id: ObjectId(mongodata._id)
                            }, mongodatawithoutid
                            , function(err, result) {
                                //console.log(result);
                                res.send("success");

                                var log={id:ObjectId(mongodata._id),action:"APPROVE",user:mongodata.CR_USER_DN_EXECUTE,date:currenttime,crdata:mongodata};

                                var logcollection = mongo.mongodb.collection('logs');
                            // Insert some documents
                                logcollection.insert(log, function(err, result) {
                                    if(err)
                                    {
                                        console.log("failed to insert log",err);
                                    }
                                });  

                                //insert entry to auditLogs
                                userId = mongodata.CR_USER_ID_EXECUTE;
                                displayName = mongodata.CR_USER_DN_EXECUTE;
                                notes = 'APPROVED; EDIT_ID: '+mongodata._id;

                                auditLog.add(type,userId,displayName,notes);         
                            });
                        }
                    });
                }
            });
        }





        //res.send("success");



    } else if (req_type == "DELETE") {

        var query = 'match (n{id:\'' + mongodata.id + '\'}) optional match (n{id:\'' + mongodata.id + '\'})-[r]-()  delete n,r';

        neodb.db.query(query, params, function(err, results) {

            if (err) {
                console.error('Error retreiving node from database:', err);
                res.send(404, 'No node at that location');
            } else {
                //console.log(results);
                var collection = mongo.mongodb.collection('cr');

                var mongodatawithoutid={};

                for(var key in mongodata)
                {
                    //console.log(key);
                    if(key=="_id")
                    {

                    }
                    else
                    {
                        mongodatawithoutid[key]=mongodata[key];
                    }
                }
                //console.log();
                collection.update({
                    _id: ObjectId(mongodata._id)
                }, mongodatawithoutid
                , function(err, result) {
                    //console.log(result);
                    res.send("success");

                    var log={id:ObjectId(mongodata._id),action:"APPROVE",user:mongodata.CR_USER_DN_EXECUTE,date:currenttime,crdata:mongodata};

                    var logcollection = mongo.mongodb.collection('logs');
                // Insert some documents
                    logcollection.insert(log, function(err, result) {
                        if(err)
                        {
                            console.log("failed to insert log",err);
                        }
                    });

                    //insert entry to auditLogs
                    userId = mongodata.CR_USER_ID_EXECUTE;
                    displayName = mongodata.CR_USER_DN_EXECUTE;
                    notes = 'APPROVED; DELETE_ID: '+mongodata._id;

                    auditLog.add(type,userId,displayName,notes);           
                });
            }
        });

    }



    //res.send("ok");
};

exports.postDeclineCR = function(req, res) {

    var mongodata = req.body;
    var currenttime = new Date().getTime();
    mongodata['CR_DATE_EXECUTED']=currenttime;
    mongodata['CR_STATUS']="DECLINED";
    //console.log("req params",mongodata.id);

    var type ='AD';
    var userId ="";
    var displayName = "";
    var notes = "";

    var collection = mongo.mongodb.collection('cr');
    //var currenttime = new Date().getTime();
    //console.log();

    var mongodatawithoutid={};

    for(var key in mongodata)
    {
        //console.log(key);
        if(key=="_id")
        {

        }
        else
        {
            mongodatawithoutid[key]=mongodata[key];
        }
    }

    collection.update({
        _id: ObjectId(mongodata._id)
    },mongodatawithoutid
    , function(err, result) {
        //console.log(result,err);
        res.send("success");
        var log={id:ObjectId(mongodata._id),action:"DECLINE",user:mongodata.CR_USER_DN_EXECUTE,date:currenttime,crdata:mongodata};

        var logcollection = mongo.mongodb.collection('logs');
        // Insert some documents
        logcollection.insert(log, function(err, result) {
        if(err)
        {
        console.log("failed to insert log",err);
        }
        });    

        userId = mongodata.CR_USER_ID_EXECUTE;
        displayName = mongodata.CR_USER_DN_EXECUTE;
        notes = 'DECLINED; '+mongodata.CR_REQUEST_TYPE+'_ID: '+mongodata._id;
        //console.log(mongodata);

        auditLog.add(type,userId,displayName,notes);          
    });


    //res.send("ok");
};

exports.postEditCR = function(req, res) {

    var mongodatawithid = req.body;
    var currenttime = new Date().getTime();
    //console.log("***************************mongodatawithid***********************************",mongodatawithid);

    var type ='CR';
    var userId ="";
    var displayName = "";
    var notes = "";

    //var mongodatatmp=mongodatawithid;
    var mongodatawithoutid={};

    for(var key in mongodatawithid)
    {
        //console.log(key);
        if(key=="_id")
        {

        }
        else
        {
            mongodatawithoutid[key]=mongodatawithid[key];
        }
    }
    
    
    //console.log("**************with",mongodatawithid);
    //console.log("$$$$$$$$$$$$$$$without",mongodatawithoutid);

    //mongodatawithid['CR_DATE_EDITED']=currenttime;
    mongodatawithoutid['CR_DATE_EDITED']=currenttime;
    var collection = mongo.mongodb.collection('cr');
    
    //console.log();
    collection.update({
        _id: ObjectId(mongodatawithid._id)
    }, mongodatawithoutid
    , function(err, result) {
        //console.log(result,err);
        if(err)
        {
            console.log(err);
            res.send("fail");
        }
        else
        {
            //console.log("*************result after mongo update",result);
            res.send("success");
            var log={id:ObjectId(mongodatawithid._id),action:"EDIT",user:mongodatawithid.CR_USER_DN_EDIT,date:currenttime,crdata:mongodatawithid};

            var logcollection = mongo.mongodb.collection('logs');
            // Insert some documents
            logcollection.insert(log, function(err, result) {
                if(err)
                {
                    console.log("failed to insert log",err);
                }
            });

            userId = mongodatawithid.CR_USER_ID_CREATE;
            displayName = mongodatawithid.CR_USER_DN_CREATE;
            notes = 'EDIT_ID: '+ mongodatawithid._id;

            auditLog.add(type,userId,displayName,notes);

        }
        
    });


    //res.send("ok");
};


exports.updateRights = function(req, res) {

    var data = req.body;
    //console.log(data);
    var type ='rights';
    var userId ="";
    var displayName = "";
    var notes = "";
    
    var right=data.right;
    var update = { $set : {} };
    update.$set['roles.' + right] = data.value;
    //queryparam.$set.roles.$set=data.value;
    // var roles={};
    // queryparam.$set={};
    // queryparam.$set.roles.$set={};
    // queryparam.$set.roles[data.right]=data.value;

    //console.log(findparam, queryparam);
    var collection = mongo.mongodb.collection('users');

    collection.update({
        _id:ObjectId(data.user._id)
    },
    update
    , function(err, result) {
         //console.log(result,err);
        if(err)
        {
            res.send("fail");
        }
        else if(result==0)
        {
            res.send("no change");
        }
        else
        {
            res.send("success");
        }
        // res.send("success");
        // var log={id:ObjectId(mongodata._id),action:"DECLINE",user:mongodata.CR_USER_DN_EXECUTE,date:currenttime,crdata:mongodata};

        // var logcollection = mongo.mongodb.collection('logs');
        // // Insert some documents
        // logcollection.insert(log, function(err, result) {
        // if(err)
        // {
        // console.log("failed to insert log",err);
        // }
        // });             
    });

    
    userId = data.adminUserId;
    displayName = data.adminUserDisplayName;
    notes = 'Changed USER_ID: ' + data.user._id +'('+data.user.lastName+', '+ data.user.firstName+')'+ ' ROLE: '+data.right+ ' to ' + data.value;

    auditLog.add(type,userId,displayName,notes);

    res.send("success");
}




// exports.postRollBackCR = function(req, res) {

//     var mongodata = req.body.rollback;
//     var mongoid = req.body.mongoid;
//     //var prevdata=JSON.stringify(req.body.prev);


//     //console.log("req params mongodata",mongodata);
//     //console.log("req params pev",prevdata);



//     var query = 'match (n{id:\'' + mongodata.id + '\'}) set n={params}, n.CR_PREVIOUS={prevdata} return n';

//     // //var query = 'MATCH n WHERE lower(n.name)=~".*' + searchTerm + '.*" or lower(n.shortName)=~".*' + searchTerm + '.*" RETURN distinct n.id as id, n.name as name, n.shortName as shortname';
//     // //console.log(query);
//     var params = {
//         params: mongodata,
//         prevdata: ""
//     };
//     neodb.db.query(query, params, function(err, results) {
//         //console.log(results);

//         if (err) {
//             console.error('Error retreiving node from database:', err);
//             res.send(404, 'No node at that location');
//         } else {
//             //console.log(results);
//             var collection = mongo.mongodb.collection('cr');

//             var currenttime = new Date().getTime();

//             collection.update({
//                 _id: ObjectId(mongoid)
//             }, {
//                 $set: {
//                     CR_STATUS: "ROLLEDBACK",
//                     CR_DATE: currenttime,
//                     CR_PREVIOUS: ""
//                 }
//             }, function(err, result) {
//                 //console.log(result);
//                 res.send("success");
//             });
//         }
//     });

//     //res.send("ok");
// };




// var getNextNeoID = function(label) {



//     //var label=req.params.label;
//     //console.log(label);
//     var query = 'match (a) where labels(a)[0]={label} return a.id as id, length(a.id) as len order by len desc, id desc limit 1';
//     var params = {
//         label: label
//     };

//     neodb.db.query(query, params, function(err, results) {
//         if (err) {
//             console.error('Error retreiving node from database:', err);
//             res.send(404, 'No node at that location');
//         } else {
//             //console.log(results[0].id);
//             var id = results[0].id;
//             var idalphanum = id;
//             var idnumstring = idalphanum.match(/\d*$/);
//             console.log("idnumstring", idnumstring[0]);
//             var idnum = parseInt(idnumstring[0]);
//             idnum++;
//             console.log(idnum);
//             idnew = idalphanum.replace(/\d*$/, idnum.toString());

//             console.log("NEW ID", idnew);



//             // if(label=="Organization")
//             // {
//             //     id=id.substring(1);
//             // }
//             // else if(label=="Program")
//             // {
//             //     id=id.substring(1);
//             // }
//             // else if(label=="SurveillanceSystem")
//             // {
//             //     id=id.substring(2);
//             // }
//             // else if(label=="Tool")
//             // {
//             //     id=id.substring(2);
//             // }
//             // else if(label=="Registry")
//             // {
//             //     id=id.substring(2);
//             // }
//             // else if(label=="HealthSurvey")
//             // {
//             //     id=id.substring(2);
//             // }
//             // else if(label=="Collaborative")
//             // {
//             //     id=id.substring(2);
//             // }
//             // else if(label=="Dataset")
//             // {
//             //     id=id.substring(4);
//             // }
//             // else if(label=="DataStandard")
//             // {
//             //     id=id.substring(4);
//             // }
//             // else if(label=="Tag")
//             // {
//             //     id=id.substring(3);
//             // }


//             return (idnew);
//         }

//     });

// };