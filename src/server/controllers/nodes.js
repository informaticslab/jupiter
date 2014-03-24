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
            res.err()
        } else
        {
         // results.forEach(function(entry) {

         // //   console.log(entry);
         //  //  relationships.push(entry);
         //    entry.childLabels.forEach(function(childLabel){

         //        var labelItem = relationships[childLabel];
         //        if(labelItem == null){ //please create a new label item
         //            // var relType = {
         //            //         'id': entry.relId
         //            //         ,'relName': entry.relType                            
         //            //         ,'nodeId': entry.childId
         //            //         ,'nodeName': entry.childName                           
         //            //     }                  
         //            // labelItem = [];
         //            // labelItem.relTypes = [relType];
         //            // labelItem = {'foo':'bar'};
         //            // relationships[childLabel] = labelItem
         //                            labelItem = {'foo':'bar'};
         //            relationships[childLabel] = labelItem;
         //        }
         //        else
         //        {

         //           //  var relType = {
         //           //          'id': entry.relId
         //           //          ,'relName': entry.relType                            
         //           //          ,'nodeId': entry.childId
         //           //          ,'nodeName': entry.childName                           
         //           //      }                                 
         //           // labelItem.relTypes.push(relType);

         //        }
            
         //    })
            
         // })
    var allLabels = _.map(r, function(i){return i.childLabels});
   var distinctLabels = _.union.apply(_, allLabels);
   
   var toRet = [];
   
   _.each(distinctLabels, function(a,b,c){
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
               'name': x 
           };
           
           relTypeToAdd.nodes = _.filter(labeled, function(i){
               return i.relType === x;
           });
           
           labelToAdd.relTypes.push(relTypeToAdd);
       });
       
       toRet.push(labelToAdd);
   });
        res.json(toRet);
        console.log(toRet);
        
    }
    });

    // var systems = [{
    //     id: 2,
    //     name: 'System 2'
    // }, {
    //     id: 3,
    //     name: 'System 3'
    // }];

    // var datasets = [{
    //     id: 2,
    //     name: 'Set 2'
    // }, {
    //     id: 3,
    //     name: 'Set 3'
    // }];

    // var dataElements = [{
    //     id: 45,
    //     name: 'Element 2'
    // }, {
    //     id: 56,
    //     name: 'Element 3'
    // }];

    // var relationships = [{
    //     type: 'Systems',
    //     values: systems
    // }, {
    //     type: 'Data Sets',
    //     values: datasets
    // }, {
    //     type: 'Data Elements',
    //     values: null
    // }];

    // res.json(relationships);
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