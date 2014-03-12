/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');

var express = require('express'),
    app = express();
    
require('./lib/reverser')(app);
require('./lib/neo4jconnect')(app, db);


app.listen(8089);
  console.log('Express server listening on port 8080');