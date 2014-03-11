var express = require('express');
var neo4j = require('neo4j');

module.exports = function(app, db) {
    var nodeID, returnString;
    app.get('/addremove/:string', function(req, res){
    var node = db.createNode({hello: req.params.string});     // instantaneous, but...
node.save(function (err, node) {    // ...this is what actually persists.
    if (err) {
        console.error('Error saving new node to database:', err);
    } else {
        console.log('Node saved to database with id:', node.id);
        nodeID= node.id;
    
    
    
    db.getNodeById(nodeID, function (err, node) {    
    if (err) {
        console.error('Error retreiving node from database:', err);
    } else {
       console.log('Node retreived from database with id:', nodeID);
        //console.log('node looks like' , node);
        var nodedata = node.data;
         console.log('Node retreived from database in JSON:', nodedata);
        returnString = nodedata.hello;
    node.delete( function (err) {    // ...this is what actually persists.
    if (err) {
        console.error('Error deleting node from database:', err);
    } else {
        console.log('Node deleted from database with id: ', nodeID );
              res.type('text/plain');
            res.send(returnString);
    }
    });
    }
    });
    }
    });
    });
};