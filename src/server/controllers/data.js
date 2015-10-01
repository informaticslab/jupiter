var parse =require('csv');
var mysql = require('../lib/mysqlConnection');

var fs = require('fs');


exports.upload = function(req, res){
	//TODO
	console.log('FILES',req.files);
	res.send('done');
};


exports.getFile = function(req,res){
	//TODO
};