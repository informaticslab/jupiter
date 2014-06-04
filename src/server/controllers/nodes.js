var neodb = require('../lib/neo4jConnection');
var _ = require('underscore');
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
                //console.log(JSON.stringify(nodeLabelCounts))
                nodedataarr.sort(sortFunction);
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

exports.getPlayData = function(req, res) {


    var nodes=req.params.id;
    //console.log(nodes);

    var nodesarr=nodes.split("-");

    var hops=nodesarr[2];

    //console.log(nodesarr[0],nodesarr[1],nodesarr[2]);

    var query, params;

    if(hops==2)
    {
        query = ['MATCH p=(a)-[*1]-(b)-[*1]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p) |x.name) as Nodes, extract(y in nodes(p) |y.id) as NodesId, extract(s in nodes(p) |labels(s)) as NodesLabel, extract(z in relationships(p) | type(z)) as Relations, ',
        'extract(r in relationships(p) | startNode(r).id) as StartNodes'
        ].join('\n');

    }
    else if(hops==3)
    {
        query = ['MATCH p=(a)-[*1..2]-(b)-[*1..2]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p) |x.name) as Nodes, extract(y in nodes(p) |y.id) as NodesId, extract(s in nodes(p) |labels(s)) as NodesLabel, extract(z in relationships(p) | type(z)) as Relations, ',
        'extract(r in relationships(p) | startNode(r).id) as StartNodes'
        ].join('\n');

    }
    else if(hops==4)
    {
        query = ['MATCH p=(a)-[*2]-(b)-[*2]-(c) where a.id={leftId} and c.id={rightId}',
        'return extract(x in nodes(p) |x.name) as Nodes, extract(y in nodes(p) |y.id) as NodesId, extract(s in nodes(p) |labels(s)) as NodesLabel, extract(z in relationships(p) | type(z)) as Relations, ',
        'extract(r in relationships(p) | startNode(r).id) as StartNodes'
        ].join('\n');

    }
    else
    {
        console.error('Error retreiving degrees of seperation from database:');
        res.send(404, 'no degree indicated');

    }



    console.log(query);

    


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


                    //console.log("dnodes",dnodes);
                       

                    for (var i=0;i<dnodes.length-1;i++)
                    { 
                            
                            //console.log("1--",dnodes[i]);
                            nodesA.push({
                                "source":dnodes[i],
                                "sourceid":dnodesid[i],
                                "target":dnodes[i+1],
                                "targetid":dnodesid[i+1],
                                "sourcelabel":dnodeslabel[i],
                                "targetabel":dnodeslabel[i+1],
                                "type":drelations[i],
                                "startnode":dstartnodes[i],
                                "objectid":dnodes[i]+dnodesid[i]+dnodes[i+1]+dnodesid[i+1]+drelations[i]+dstartnodes[i]
                            });

                            //console.log("nodesA",nodesA[i]);

                    }


                });


                //console.log("nodesA----------------------------",nodesA);


                
                /*
                nodesA.sort(function(a,b){
                    if (a.objectid < b.objectid) //sort string ascending
                      return -1 
                     if (a.objectid > b.objectid)
                      return 1
                     return 0 //default return value (no sorting)
                });

                
                */

                //console.log("nodesA sorted***************************",nodesA.length);


                
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

                //console.log("nodesAunique",nodesAunique.length);

                
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
                        links.push({"source":sourcenodeindex,"target":targetnodeindex,"type":nodesAunique[i].type});
                    }
                    else
                    {
                        links.push({"source":targetnodeindex,"target":sourcenodeindex,"type":nodesAunique[i].type});
                    }
                    

                }


                //console.log("links",links);
                
                //divs = jQuery.unique( divs );
                

               // nodesArr=obj[0].Nodes;
                //relationsArr=obj[0].Relations;




                /*
                var nodes = [];
                //console.log(nodes);
                var links = [];
                for (var i=0;i<nodesArr.length;i++)
                { 
                    nodes.push({
                        "name":nodesArr[i]
                    });

                }

                for (var i=0;i<relationsArr.length;i++)
                { 
                    links.push({
                        "source": i,
                        "target": i+1,
                    });

                }

                */  
                viewerJson = {
                    "nodes": nodes,
                    "links": links
                            }
                res.send(viewerJson);
            }    
                                 

        }
    });
};
