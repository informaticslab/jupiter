var neo4j = require('neo4j');
var properties = require('./envProperties');
var db = new neo4j.GraphDatabase(properties.NEO_DOMAIN);
exports.db = db;
