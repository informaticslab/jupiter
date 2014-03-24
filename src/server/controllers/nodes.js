var neodb = require('../lib/neo4jConnection');
var _= require('underscore');

exports.getRelationsForNode = function(req, res) {
    var query = ['MATCH n-[r]-x ' 
     ,'where id(n)={nodeId} ' //maaaaaaaagic
     ,'return id(r) as relId,type(r) as relType, id(x) as childId, '
     ,'labels(x) as childLabels, x.name as childName order by relType '].join('\n');


    var params = {
        nodeId: +req.params.id
    };

     var relationships = [];

    neodb.db.query(query, params, function(err, r) {
        if (err) {
            console.error('Error retreiving labels from database:', err);
            res.err(err);
        } else {
            var allLabels = _.map(r, function(i){return i.childLabels});
            var distinctLabels = _.union.apply(_, allLabels);

            var toRet = [];

            _.each(distinctLabels, function(a){
               var labelToAdd = {
                   'name': a,
                   'relTypes' : []
               };
               
               var labeled = _.filter(r, function(i){
                   return _.contains(i.childLabels, a);
               });
               
               var mappedRelTypes = _.map(labeled, function(p){return p.relType;});        
               var distinctRelTypes = _.union.apply(_, mappedRelTypes);
              
               _.each(distinctRelTypes, function(x,y,z){
                   var relTypeToAdd = {
                       'name': x ,
                       'nodes': []
                   };
                   
                   _.chain(labeled)
                   .filter(function(i){
                       return i.relType === x;
                   })
                   .each(function(a){
                       relTypeToAdd.nodes.push( {
                           'id' : a.childId,
                           'name' : a.childName
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


    var query = ['START n=node({nodeId}) ', 'RETURN labels(n)'].join('\n');

    var params = {
        nodeId: +req.params.id
    };

    neodb.db.query(query, params, function(err, results) {
        if (err) {
            console.error('Error retreiving labels from database:', err);
        }

        res.json(results[0]['labels(n)']);
    });
}

exports.getNodeById = function(req, res) {

    neodb.db.getNodeById(req.params.id, function(err, node) {
        var nodedata = {};

        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(500, 'error retreiving node from database');
        } else {

            nodedata.name = node.data.name;
            nodedata.id = req.params.id;
            nodedata.attributes = [];

            for (var prop in node.data) {
                nodedata.attributes.push({
                    'key': prop,
                    'value': node.data[prop]
                })
            }

            res.json(nodedata);
        }
    });
};