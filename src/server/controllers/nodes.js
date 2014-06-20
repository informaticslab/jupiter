var neodb = require('../lib/neo4jConnection');
var _ = require('underscore');

var relationsArr = [];
exports.getRelationsForNode = function(req, res) {
    var query = ['MATCH n-[r]-x ', 'where n.id={nodeId} ' //maaaaaaaagic
        , 'return id(r) as relId,type(r) as relType, x.id as childId, ','startNode(r).id as startNode,', 'labels(x) as childLabels, x.name as childName order by relType, childName '
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
                            'name': a.childName,
                            'startNode' : a.startNode
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

exports.searchByName = function(req, res) {
    var searchTerm = req.params.searchTerm.toLowerCase();
    var query = 'MATCH n WHERE lower(n.name)=~".*' + searchTerm + '.*" RETURN n.id as id, n.name as name';
    console.log(query);
    var params = {
        searchTerm: req.params.searchTerm
    };
    neodb.db.query(query, params, function(err, results) {
        console.log(results);

        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'No node at that location');
        } else {
            if (results != null) {
                var nodedata = [];
                _.each(results, function(i){
                    nodedata.push({id: i.id, name:i.name});
                })
                res.json(nodedata);
            }
            else{
                res.json([]);
            }
        }
    });
};

var sortFunction = function(a, b){
//Compare "a" and "b" in some fashion, and return -1, 0, or 1
    if(a.name > b.name)
    {
        return 1;
    }
    else if (a.name == b.name)
    {
        return 0;
    }
        else if (a.name < b.name)
    {
        return -1;
    }
}

var compileSearchResults = function(req, res, err, results)
{
            var nodedataarr = [];
        var nodeLabelCounts = {Program:0,SurveillanceSystem:0,Registry:0,
                            HealthSurvey:0,Tool:0,Dataset:0,DataStandard:0,
                            Collaborative:0,Organization:0,Tag:0,Total:0};
        var returnable = {};
        var duplicheck = [];
        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'No node with that text available');
        } else {
            //console.log("results were" + results);
            //console.log("results length is" + results);
            if (results[0] != null && results[0]['n'] != null && results[0]['n']['data'] != null) {
                for(var i=0;i<results.length;i++)
                {   
                    var doohicky = results[i]['n']['data'];
                    if(duplicheck[doohicky.id] == null)
                    {
                        duplicheck[doohicky.id] = true;
                        var nodedata = {};
                        var doohickylabels = results[i]['labels(n)'].join(',')
                        var relCount = results[i]['relCount'] 
                        if (relCount == null)
                        {
                            relCount = 0;
                        }          
                        //console.log(doohicky);
                
                        nodedata.name = doohicky.name;
                        nodedata.id = doohicky.id;
                        nodedata.labels = doohickylabels;
                        nodedata.relCount = relCount;
                        nodedata.status = 'Not Available';
                        if (nodeLabelCounts[doohickylabels] != null)
                        {
                           nodeLabelCounts[doohickylabels]++;
                        }
                        else
                        {
                           nodeLabelCounts[doohickylabels] = 1;
                        }
                        nodeLabelCounts['Total']++;
                        nodedata.attributes = [];
                        for (var prop in doohicky) 
                        {
                            if(prop == 'purpose' || prop=='description')
                            {
                                if(doohicky[prop].length > 450)
                                {
                                    nodedata.attributes.push({
                                    'key': prop,
                                    'value': doohicky[prop].substring(0, 447)  + '...'
                                    });

                                }
                                else
                                {
                                    nodedata.attributes.push({
                                    'key': prop,
                                    'value': doohicky[prop]
                                    });
                                }
                            }
                            if(prop =='operationalStatus' && doohicky[prop] != null && doohicky[prop] != '')
                            {
                                nodedata.status = doohicky[prop];
                            }
                        }
                        nodedataarr.push(nodedata);
                    }
                }

                nodedataarr.sort(sortFunction);
                returnable.nodedataarr = nodedataarr;
                returnable.nodeLabelCounts = nodeLabelCounts;
                console.log(returnable);
                res.json(returnable);
        }
        else
            {
              //res.send(404, "No node with that text available");
              res.json({"nullset":true}) ;
            }
        }
}

exports.searchNodesByLabel = function(req, res) {

    //NOTE:  THIS WILL NEED TO BE CHANGED AS IT IS CYPHER INJECTION SUSCEPTIBLE
    //for some reason query is being shady and wont work with the usual prepared statements.
    var query = 'MATCH (n:`'+req.params.query+'`)-[r]-x RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}'
        + 'union all '
        + 'MATCH (n:`'+req.params.query+'`) RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'
    var params = {
        //qString:  req.params.query ,
        skipnum: 0,
        retNum: 500
        };
        console.log(params);

        neodb.db.query(query, params, function(err, results) {
            compileSearchResults(req, res, err, results)
    });
}

exports.searchNodesByString = function(req, res) {

     var query = 'MATCH n-[r]-x WHERE n.name=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n-[r]-x WHERE n.fullname=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n-[r]-x WHERE n.contractphone=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n-[r]-x WHERE n.mission=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n-[r]-x WHERE n.contractname=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}' +
        'union all '+
        'MATCH n-[r]-x WHERE n.shortName=~{qString} RETURN n, labels(n), count(r) as relCount  skip {skipnum} limit {retNum}' +
        //'union all '+
        //'MATCH n-[r]-x WHERE n.purpose=~{qString} RETURN n, labels(n), count(r) as relCount order by n.name skip {skipnum} limit {retNum}' +
        //'union all '+
        //'MATCH n-[r]-x WHERE n.description=~{qString} RETURN n, labels(n), count(r) as relCount order by n.name skip {skipnum} limit {retNum}' +
        'union all '+
        'MATCH n WHERE n.name=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.fullname=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.contractphone=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.mission=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.contractname=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}' +
        'union all '+
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
    var query = ['MATCH n-[r]-x where n.id={nodeId} ',
    'return n.id as nodeId, labels(n) as nodeLabels, ',
    'n.name as nodeNames, ',
    'id(r) as relId,type(r) as relType, x.id as childId, ', 
    'r.relationshipDescription as relDesc, ',
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
                        "type":allRelations[i],
                        "description":allRelDesc[i]
                    })
                }
                else
                {
                    links.push({
                        "source": 0,
                        "target": i+1,
                        "type":allRelations[i],
                        "description":allRelDesc[i]
                    })
                }
            }
            viewerJson = {
                "nodes": nodes,
                "links": links
                        }
            console.log(viewerJson);
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

            console.log(r);
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

var compileSearchResultsForLab= function(req, res, err, results)
{
        var nodedataarr = [];
        var nodeLabelCounts = {Program:0,SurveillanceSystem:0,Registry:0,
                            HealthSurvey:0,Tool:0,Dataset:0,DataStandard:0,
                            Collaborative:0,Organization:0,Tag:0,Total:0};
    
        var returnable = {};
        var duplicheck = [];

        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(404, 'Nodes not available');
        } else {
            
            if (results[0] != null && results[0]['n'] != null && results[0]['n']['data'] != null) {
                for(var i=0;i<results.length;i++)
                {   
                    var doohicky = results[i]['n']['data'];
                    if(duplicheck[doohicky.id] == null)
                    {
                        duplicheck[doohicky.id] = true;
                        var nodedata = {};

                        var doohickylabels = results[i]['labels'];
                        var relCount = results[i]['relCount'];
                        if (relCount == null)
                        {
                            relCount = 0;
                        }          
                    
                        nodedata.name = doohicky.name;
                        nodedata.id = doohicky.id;
                        nodedata.labels = doohickylabels;
                        nodedata.imports = [];

                        // var tmpArr = _.where(relationsArr, {p: nodedata.id});
                        
                        // tmpArr.forEach(function (d){
                        //    nodedata.imports.push('root!'.concat(d.clabel).concat('!').concat(d.cname));
                        // });
                       
                        // nodedata.name = 'root!'.concat( nodedata.labels[0]).concat('!').concat(nodedata.name);
                        nodedataarr.push(nodedata);

                    }
                }
                
                nodedataarr.sort(sortFunction);
                res.json(nodedataarr);
        }
        else
            {
              //res.send(404, "No node with that text available");
              res.json({"nullset":true}) ;
            }
        }
}

exports.getAllNodes = function(req, res) {

    var query = 'MATCH (n) where labels(n)[0]<>"Tag" return n, labels(n) as labels';
    var params ={};
   
    neodb.db.query(query, params, function(err, results) {
        compileSearchResultsForLab(req, res, err, results);
    });
};

exports.getAllRealtionsForAllNodes = function(req, res) {

    var query = 'MATCH n-[r]-x where labels(x)[0]<>"Tag" return n.id as p, n.name as pname, labels(x)[0] as clabel, x.name as cname';
    var params ={};
   
    neodb.db.query(query, params, function(err, results) {
        
        if(err){
            console.log("Could not get all the relations for the nodes from the database");
        }
        else{
            relationsArr = results;
            res.send(results);
        }
    });
};

exports.getAdvancedSearchData = function(req, res) {


    var nodes=req.params.id;
    //console.log(nodes);

    var nodesarr=nodes.split("-");

    var hops=nodesarr[2];



    var query, params;

    if(hops==2)
    {
        query = ['MATCH p=(a)-[*1]-(b)-[*1]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p) |x.name) as Nodes, extract(y in nodes(p) |y.id) as NodesId, extract(s in nodes(p) |labels(s)) as NodesLabel, extract(z in relationships(p) | type(z)) as Relations, ',
        'extract(r in relationships(p) | startNode(r).id) as StartNodes, extract(t in relationships(p) | t.relationshipDescription ) as Description'
        ].join('\n');

    }
    else if(hops==3)
    {
        query = ['MATCH p=(a)-[*1..2]-(b)-[*1..2]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p) |x.name) as Nodes, extract(y in nodes(p) |y.id) as NodesId, extract(s in nodes(p) |labels(s)) as NodesLabel, extract(z in relationships(p) | type(z)) as Relations, ',
        'extract(r in relationships(p) | startNode(r).id) as StartNodes, extract(t in relationships(p) | t.relationshipDescription ) as Description'
        ].join('\n');

    }
    else if(hops==4)
    {
        query = ['MATCH p=(a)-[*2]-(b)-[*2]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p) |x.name) as Nodes, extract(y in nodes(p) |y.id) as NodesId, extract(s in nodes(p) |labels(s)) as NodesLabel, extract(z in relationships(p) | type(z)) as Relations, ',
        'extract(r in relationships(p) | startNode(r).id) as StartNodes, extract(t in relationships(p) | t.relationshipDescription ) as Description'
        ].join('\n');

    }
    else
    {
        console.error('Error retreiving degrees of seperation from database:');
        res.send(404, 'no degree indicated');

    }

   


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

            if(r=="")
            {

                res.send(404, 'no node at that location');
            }
            else
            {


                //console.log(nodes);
                //console.log(relations);

                var obj = eval (r);
                var nodesA = [];

                obj.forEach(function (d){
                //console.log("Nodes",d.Nodes);

                    var dnodes=eval(d.Nodes);
                    var dnodesid=eval(d.NodesId);
                    var dnodeslabel=eval(d.NodesLabel);
                    var drelations=eval(d.Relations);
                    var dstartnodes=eval(d.StartNodes);
                    var drelationsdescription=eval(d.Description);


                    //console.log("dnodes",dnodes);
                    //console.log("dnodes length",dnodes.length);


                    //check for redundant hops in path

                    var nodesRedundancyCheck=[];
                    nodesRedundancyCheck.push(dnodes[0]);

                    var found=false;
                    for (var i=1;i<dnodes.length;i++)
                    { 
                        found=false;
                        for(j=0;j<nodesRedundancyCheck.length;j++)
                        {
                            if(dnodes[i]==nodesRedundancyCheck[j])
                            {
                                found=true;
                                break;
                            }
                            

                        }
                        if(!found)
                        {
                            nodesRedundancyCheck.push(dnodes[i]);
                            //console.log("ushed",nodesRedundancyCheck);
                        }
                        else
                        {
                            break;
                        }

                    }
                    if(found)
                    {

                    }
                    else
                    {

                        if(hops==3)
                        {
                            if(dnodes.length==4)
                            {
                                for (var i=0;i<dnodes.length-1;i++)
                                { 
                                        
                                        //console.log("1--",dnodes[i]);
                                        nodesA.push({
                                            "source":dnodes[i],
                                            "sourceid":dnodesid[i],
                                            "target":dnodes[i+1],
                                            "targetid":dnodesid[i+1],
                                            "sourcelabel":dnodeslabel[i],
                                            "targetlabel":dnodeslabel[i+1],
                                            "type":drelations[i],
                                            "startnode":dstartnodes[i],
                                            "description":drelationsdescription[i],
                                            "objectid":dnodes[i]+dnodesid[i]+dnodes[i+1]+dnodesid[i+1]+drelations[i]+dstartnodes[i]
                                        });

                                        //console.log("nodesA",nodesA[i]);

                                }

                            }

                        }
                        else
                        {
                            for (var i=0;i<dnodes.length-1;i++)
                            { 
                                    
                                    //console.log("1--",dnodes[i]);
                                    nodesA.push({
                                        "source":dnodes[i],
                                        "sourceid":dnodesid[i],
                                        "target":dnodes[i+1],
                                        "targetid":dnodesid[i+1],
                                        "sourcelabel":dnodeslabel[i],
                                        "targetlabel":dnodeslabel[i+1],
                                        "type":drelations[i],
                                        "startnode":dstartnodes[i],
                                        "description":drelationsdescription[i],
                                        "objectid":dnodes[i]+dnodesid[i]+dnodes[i+1]+dnodesid[i+1]+drelations[i]+dstartnodes[i]
                                    });

                                    //console.log("nodesA",nodesA[i]);

                            }
                        }



                    }


                       





                });


               //console.log("nodesA",nodesA);

               if(nodesA.length==0)
               {
                res.send(404,"No nodes retuned");

               }

               else
               {


                    var nodesAunique=[];

                    nodesAunique.push(nodesA[0]);
                    //console.log("push",nodesAunique[0].objectid);

                    for (var i=0;i<nodesA.length;i++)
                    {
                        var found=false; 
                        for(j=0;j<nodesAunique.length;j++)
                        {
                            if(nodesA[i].objectid==nodesAunique[j].objectid)
                            {
                                //console.log("break");
                                //continue;
                                found=true;
                                break;
                            }

                        }

                        if(!found)
                        {
                            nodesAunique.push(nodesA[i]);

                        }

                    }

                    //console.log("nodesAunique",nodesAunique);



                    
                    var nodes=[];

                    nodes.push({"name":nodesAunique[0].source,"id":nodesAunique[0].sourceid,"label":nodesAunique[0].sourcelabel});

                    for (var i=0;i<nodesAunique.length;i++)
                    { 
                        var found=false;
                        for(j=0;j<nodes.length;j++)
                        {
                            if(nodesAunique[i].sourceid==nodes[j].id)
                            {
                                found=true;
                                break;
                            }
                            

                        }
                        if(!found)
                        {
                            nodes.push({"name":nodesAunique[i].source,"id":nodesAunique[i].sourceid,"label":nodesAunique[i].sourcelabel});
                        }

                    }



                    for (var i=0;i<nodesAunique.length;i++)
                    { 
                        var found=false;
                        for(j=0;j<nodes.length;j++)
                        {
                            if(nodesAunique[i].targetid==nodes[j].id)
                            {
                                found=true;
                                break;
                            }
                            

                        }
                        if(!found)
                        {
                            nodes.push({"name":nodesAunique[i].target,"id":nodesAunique[i].targetid,"label":nodesAunique[i].targetlabel});
                        }

                    }


                    //console.log("nodes",nodes);
                    

                    var links=[];


               
                    for (var i=0;i<nodesAunique.length;i++)
                    { 
                        
                        var sourcenodeid=nodesAunique[i].sourceid;
                        var targetnodeid=nodesAunique[i].targetid;
                        var sourcenodeindex;
                        var targetnodeindex;
                        var startnodeid=nodesAunique[i].startnode;

                        

                        for(var j=0; j<nodes.length;j++)
                        {
                            //console.log(i,j, nodes.id,sourcenodeid);
                            if(nodes[j].id==sourcenodeid)
                            {
                                sourcenodeindex=j;
                                break;

                            }

                        }
                        //console.log(sourcenodeid, sourcenodeindex,targetnodeid, targetnodeindex);

                        

                        for(var j=0; j<nodes.length;j++)
                        {
                            if(nodes[j].id==targetnodeid)
                            {
                                targetnodeindex=j;
                                break;

                            }

                        }


                        //console.log(sourcenodeid, sourcenodeindex,targetnodeid, targetnodeindex);

                        if(sourcenodeid==startnodeid)
                        {
                            links.push({"source":sourcenodeindex,"target":targetnodeindex,"type":nodesAunique[i].type,"description":nodesAunique[i].description});
                        }
                        else
                        {
                            links.push({"source":targetnodeindex,"target":sourcenodeindex,"type":nodesAunique[i].type,"description":nodesAunique[i].description});
                        }
                        

                    }


                    if(nodes.length>40)
                    {

                        res.send(413,"Too many nodes returned");
                    }
                    else
                    {
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
        
        var nodename="";
        if (err!=null) {
            console.error('Error retreiving node from database:', err);
            console.log(err);
            res.send(404, 'No node at that location.');
        } else {
            
            
            if(results[0]==null)
            {
                //console.log("no name");
                res.send("Not Found");
            }
            else
            {
                resultsobj= eval(results);

                nodename= resultsobj[0].name;
                nodelabel= resultsobj[0].label[0];


                                
                nodelabel=nodelabel.replace(/([a-z])([A-Z])/g, '$1 $2');
                nodelabel=nodelabel.replace(/_/g, ' ');
                nodelabel=nodelabel.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3');
                nodelabel=nodelabel.replace(/^./, function(nodelabel){ return nodelabel.toUpperCase(); });

                
                res.send(nodename+" ("+nodelabel+")");
            }

            

        }
    });
};

var flare = 
{
 "name": "flare",
 "children": [
  {
   "name": "analytics",
   "children": [
    {
     "name": "cluster",
     "children": [
      {"name": "AgglomerativeCluster", "size": 3938},
      {"name": "CommunityStructure", "size": 3812},
      {"name": "HierarchicalCluster", "size": 6714},
      {"name": "MergeEdge", "size": 743}
     ]
    },
    {
     "name": "graph",
     "children": [
      {"name": "BetweennessCentrality", "size": 3534},
      {"name": "LinkDistance", "size": 5731},
      {"name": "MaxFlowMinCut", "size": 7840},
      {"name": "ShortestPaths", "size": 5914},
      {"name": "SpanningTree", "size": 3416}
     ]
    },
    {
     "name": "optimization",
     "children": [
      {"name": "AspectRatioBanker", "size": 7074}
     ]
    }
   ]
  },
  {
   "name": "animate",
   "children": [
    {"name": "Easing", "size": 17010},
    {"name": "FunctionSequence", "size": 5842},
    {
     "name": "interpolate",
     "children": [
      {"name": "ArrayInterpolator", "size": 1983},
      {"name": "ColorInterpolator", "size": 2047},
      {"name": "DateInterpolator", "size": 1375},
      {"name": "Interpolator", "size": 8746},
      {"name": "MatrixInterpolator", "size": 2202},
      {"name": "NumberInterpolator", "size": 1382},
      {"name": "ObjectInterpolator", "size": 1629},
      {"name": "PointInterpolator", "size": 1675},
      {"name": "RectangleInterpolator", "size": 2042}
     ]
    },
    {"name": "ISchedulable", "size": 1041},
    {"name": "Parallel", "size": 5176},
    {"name": "Pause", "size": 449},
    {"name": "Scheduler", "size": 5593},
    {"name": "Sequence", "size": 5534},
    {"name": "Transition", "size": 9201},
    {"name": "Transitioner", "size": 19975},
    {"name": "TransitionEvent", "size": 1116},
    {"name": "Tween", "size": 6006}
   ]
  },
  {
   "name": "data",
   "children": [
    {
     "name": "converters",
     "children": [
      {"name": "Converters", "size": 721},
      {"name": "DelimitedTextConverter", "size": 4294},
      {"name": "GraphMLConverter", "size": 9800},
      {"name": "IDataConverter", "size": 1314},
      {"name": "JSONConverter", "size": 2220}
     ]
    },
    {"name": "DataField", "size": 1759},
    {"name": "DataSchema", "size": 2165},
    {"name": "DataSet", "size": 586},
    {"name": "DataSource", "size": 3331},
    {"name": "DataTable", "size": 772},
    {"name": "DataUtil", "size": 3322}
   ]
  },
  {
   "name": "display",
   "children": [
    {"name": "DirtySprite", "size": 8833},
    {"name": "LineSprite", "size": 1732},
    {"name": "RectSprite", "size": 3623},
    {"name": "TextSprite", "size": 10066}
   ]
  },
  {
   "name": "flex",
   "children": [
    {"name": "FlareVis", "size": 4116}
   ]
  },
  {
   "name": "physics",
   "children": [
    {"name": "DragForce", "size": 1082},
    {"name": "GravityForce", "size": 1336},
    {"name": "IForce", "size": 319},
    {"name": "NBodyForce", "size": 10498},
    {"name": "Particle", "size": 2822},
    {"name": "Simulation", "size": 9983},
    {"name": "Spring", "size": 2213},
    {"name": "SpringForce", "size": 1681}
   ]
  },
  {
   "name": "query",
   "children": [
    {"name": "AggregateExpression", "size": 1616},
    {"name": "And", "size": 1027},
    {"name": "Arithmetic", "size": 3891},
    {"name": "Average", "size": 891},
    {"name": "BinaryExpression", "size": 2893},
    {"name": "Comparison", "size": 5103},
    {"name": "CompositeExpression", "size": 3677},
    {"name": "Count", "size": 781},
    {"name": "DateUtil", "size": 4141},
    {"name": "Distinct", "size": 933},
    {"name": "Expression", "size": 5130},
    {"name": "ExpressionIterator", "size": 3617},
    {"name": "Fn", "size": 3240},
    {"name": "If", "size": 2732},
    {"name": "IsA", "size": 2039},
    {"name": "Literal", "size": 1214},
    {"name": "Match", "size": 3748},
    {"name": "Maximum", "size": 843},
    {
     "name": "methods",
     "children": [
      {"name": "add", "size": 593},
      {"name": "and", "size": 330},
      {"name": "average", "size": 287},
      {"name": "count", "size": 277},
      {"name": "distinct", "size": 292},
      {"name": "div", "size": 595},
      {"name": "eq", "size": 594},
      {"name": "fn", "size": 460},
      {"name": "gt", "size": 603},
      {"name": "gte", "size": 625},
      {"name": "iff", "size": 748},
      {"name": "isa", "size": 461},
      {"name": "lt", "size": 597},
      {"name": "lte", "size": 619},
      {"name": "max", "size": 283},
      {"name": "min", "size": 283},
      {"name": "mod", "size": 591},
      {"name": "mul", "size": 603},
      {"name": "neq", "size": 599},
      {"name": "not", "size": 386},
      {"name": "or", "size": 323},
      {"name": "orderby", "size": 307},
      {"name": "range", "size": 772},
      {"name": "select", "size": 296},
      {"name": "stddev", "size": 363},
      {"name": "sub", "size": 600},
      {"name": "sum", "size": 280},
      {"name": "update", "size": 307},
      {"name": "variance", "size": 335},
      {"name": "where", "size": 299},
      {"name": "xor", "size": 354},
      {"name": "_", "size": 264}
     ]
    },
    {"name": "Minimum", "size": 843},
    {"name": "Not", "size": 1554},
    {"name": "Or", "size": 970},
    {"name": "Query", "size": 13896},
    {"name": "Range", "size": 1594},
    {"name": "StringUtil", "size": 4130},
    {"name": "Sum", "size": 791},
    {"name": "Variable", "size": 1124},
    {"name": "Variance", "size": 1876},
    {"name": "Xor", "size": 1101}
   ]
  },
  {
   "name": "scale",
   "children": [
    {"name": "IScaleMap", "size": 2105},
    {"name": "LinearScale", "size": 1316},
    {"name": "LogScale", "size": 3151},
    {"name": "OrdinalScale", "size": 3770},
    {"name": "QuantileScale", "size": 2435},
    {"name": "QuantitativeScale", "size": 4839},
    {"name": "RootScale", "size": 1756},
    {"name": "Scale", "size": 4268},
    {"name": "ScaleType", "size": 1821},
    {"name": "TimeScale", "size": 5833}
   ]
  },
  {
   "name": "util",
   "children": [
    {"name": "Arrays", "size": 8258},
    {"name": "Colors", "size": 10001},
    {"name": "Dates", "size": 8217},
    {"name": "Displays", "size": 12555},
    {"name": "Filter", "size": 2324},
    {"name": "Geometry", "size": 10993},
    {
     "name": "heap",
     "children": [
      {"name": "FibonacciHeap", "size": 9354},
      {"name": "HeapNode", "size": 1233}
     ]
    },
    {"name": "IEvaluable", "size": 335},
    {"name": "IPredicate", "size": 383},
    {"name": "IValueProxy", "size": 874},
    {
     "name": "math",
     "children": [
      {"name": "DenseMatrix", "size": 3165},
      {"name": "IMatrix", "size": 2815},
      {"name": "SparseMatrix", "size": 3366}
     ]
    },
    {"name": "Maths", "size": 17705},
    {"name": "Orientation", "size": 1486},
    {
     "name": "palette",
     "children": [
      {"name": "ColorPalette", "size": 6367},
      {"name": "Palette", "size": 1229},
      {"name": "ShapePalette", "size": 2059},
      {"name": "SizePalette", "size": 2291}
     ]
    },
    {"name": "Property", "size": 5559},
    {"name": "Shapes", "size": 19118},
    {"name": "Sort", "size": 6887},
    {"name": "Stats", "size": 6557},
    {"name": "Strings", "size": 22026}
   ]
  },
  {
   "name": "vis",
   "children": [
    {
     "name": "axis",
     "children": [
      {"name": "Axes", "size": 1302},
      {"name": "Axis", "size": 24593},
      {"name": "AxisGridLine", "size": 652},
      {"name": "AxisLabel", "size": 636},
      {"name": "CartesianAxes", "size": 6703}
     ]
    },
    {
     "name": "controls",
     "children": [
      {"name": "AnchorControl", "size": 2138},
      {"name": "ClickControl", "size": 3824},
      {"name": "Control", "size": 1353},
      {"name": "ControlList", "size": 4665},
      {"name": "DragControl", "size": 2649},
      {"name": "ExpandControl", "size": 2832},
      {"name": "HoverControl", "size": 4896},
      {"name": "IControl", "size": 763},
      {"name": "PanZoomControl", "size": 5222},
      {"name": "SelectionControl", "size": 7862},
      {"name": "TooltipControl", "size": 8435}
     ]
    },
    {
     "name": "data",
     "children": [
      {"name": "Data", "size": 20544},
      {"name": "DataList", "size": 19788},
      {"name": "DataSprite", "size": 10349},
      {"name": "EdgeSprite", "size": 3301},
      {"name": "NodeSprite", "size": 19382},
      {
       "name": "render",
       "children": [
        {"name": "ArrowType", "size": 698},
        {"name": "EdgeRenderer", "size": 5569},
        {"name": "IRenderer", "size": 353},
        {"name": "ShapeRenderer", "size": 2247}
       ]
      },
      {"name": "ScaleBinding", "size": 11275},
      {"name": "Tree", "size": 7147},
      {"name": "TreeBuilder", "size": 9930}
     ]
    },
    {
     "name": "events",
     "children": [
      {"name": "DataEvent", "size": 2313},
      {"name": "SelectionEvent", "size": 1880},
      {"name": "TooltipEvent", "size": 1701},
      {"name": "VisualizationEvent", "size": 1117}
     ]
    },
    {
     "name": "legend",
     "children": [
      {"name": "Legend", "size": 20859},
      {"name": "LegendItem", "size": 4614},
      {"name": "LegendRange", "size": 10530}
     ]
    },
    {
     "name": "operator",
     "children": [
      {
       "name": "distortion",
       "children": [
        {"name": "BifocalDistortion", "size": 4461},
        {"name": "Distortion", "size": 6314},
        {"name": "FisheyeDistortion", "size": 3444}
       ]
      },
      {
       "name": "encoder",
       "children": [
        {"name": "ColorEncoder", "size": 3179},
        {"name": "Encoder", "size": 4060},
        {"name": "PropertyEncoder", "size": 4138},
        {"name": "ShapeEncoder", "size": 1690},
        {"name": "SizeEncoder", "size": 1830}
       ]
      },
      {
       "name": "filter",
       "children": [
        {"name": "FisheyeTreeFilter", "size": 5219},
        {"name": "GraphDistanceFilter", "size": 3165},
        {"name": "VisibilityFilter", "size": 3509}
       ]
      },
      {"name": "IOperator", "size": 1286},
      {
       "name": "label",
       "children": [
        {"name": "Labeler", "size": 9956},
        {"name": "RadialLabeler", "size": 3899},
        {"name": "StackedAreaLabeler", "size": 3202}
       ]
      },
      {
       "name": "layout",
       "children": [
        {"name": "AxisLayout", "size": 6725},
        {"name": "BundledEdgeRouter", "size": 3727},
        {"name": "CircleLayout", "size": 9317},
        {"name": "CirclePackingLayout", "size": 12003},
        {"name": "DendrogramLayout", "size": 4853},
        {"name": "ForceDirectedLayout", "size": 8411},
        {"name": "IcicleTreeLayout", "size": 4864},
        {"name": "IndentedTreeLayout", "size": 3174},
        {"name": "Layout", "size": 7881},
        {"name": "NodeLinkTreeLayout", "size": 12870},
        {"name": "PieLayout", "size": 2728},
        {"name": "RadialTreeLayout", "size": 12348},
        {"name": "RandomLayout", "size": 870},
        {"name": "StackedAreaLayout", "size": 9121},
        {"name": "TreeMapLayout", "size": 9191}
       ]
      },
      {"name": "Operator", "size": 2490},
      {"name": "OperatorList", "size": 5248},
      {"name": "OperatorSequence", "size": 4190},
      {"name": "OperatorSwitch", "size": 2581},
      {"name": "SortOperator", "size": 2023}
     ]
    },
    {"name": "Visualization", "size": 16540}
   ]
  }
 ]
};
exports.getManagedSystems = function(req, res) {

    var query = 'match p=(n)-[r:OVERSEES|MANAGES*]->x where n.id={nodeId} '
                + 'return extract(a in nodes(p) | a.name) as byName, extract(a in nodes(p) |  a.id ) as byId, ' 
                + 'extract(a in nodes(p) |  a.informationValidated ) as byVal, length(p) as len'
    var params = {
        nodeId: req.params.id
    };
    
    neodb.db.query(query, params, function(err, results) {
        var managestack={};
        if (err!=null) {
            console.error('Error retreiving node from database:', err);
            console.log(err);
            res.send(404, 'No node at that location.');
        } 
        else 
        {
            if(results[0]==null)
            {
                res.send("Not Found");
            }
            else
            {
                //pack the parent object
                resultsobj= eval(results);
                managestack.name = resultsobj[0].byName[0];
                managestack.id = resultsobj[0].byId[0];
                managestack.valid = resultsobj[0].byVal[0];
                managestack.children = [];
                //iterate over children
                for (var k=0; k<resultsobj.length; k++)
                {
                   //iterate over an item, building out tree if unable to find item in managestack
                   var parentschildren=managestack.children;
                   for (var i=1; i <= resultsobj[k].len; i++)
                   {
                        var searchId = resultsobj[k].byId[i]
                        var foundChild = null;
                        for (var q = parentschildren.length-1; q>0; q--)
                        {
                            if(parentschildren[q].id == searchId)
                            {
                                foundChild = parentschildren[q];
                                break;
                            }
                        }
                        if (foundChild === null)
                        {
                            var child = {};
                            child.name = resultsobj[k].byName[i];
                            child.id = resultsobj[k].byId[i];
                            child.valid = resultsobj[k].byVal[i];
                            foundChild = child;
                            parentschildren.push(foundChild)
                        }
                        if(i<resultsobj[k].len) //there are grandchildren.  If there is not a children array, create it
                        {
                            if(foundChild.children == null)
                            {
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
