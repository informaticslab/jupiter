var express = require('express');
var neo4j = require('neo4j');

module.exports = function(app, db) {
    app.get('/addremove/:string', function(req, res){
      res.type('text/plain');
      res.send(req.params.string);
    });
};