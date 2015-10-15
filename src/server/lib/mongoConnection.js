var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var properties = require('./envProperties');

// Connection URL
var url = properties.MONGO_DOMAIN;
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
  exports.mongodb=db;
});

mongoose.connect(url);