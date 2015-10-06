
var parse =require('csv-parse');
var mysql = require('../lib/mysqlConnection');
var fs = require('fs');
var neodb = require('../lib/neo4jConnection');


exports.upload = function(req, res){
	//TODO
	//console.log('FILES',req.files);
	var filePath = req.files.file.path;
	var originalFileName = req.files.file.originalFilename;
	originalFileName =  originalFileName.substring(0,originalFileName.indexOf('.'));
	var input = fs.createReadStream(filePath);

	console.log('input',input);
	//console.log('filepath', filePath);
	
	
	var parser = parse(function(err,data){
		console.log('callback data', data[0]);
	});

	fs.createReadStream(filePath).pipe(parser); 

	var sqlImport = "load data local infile ? into table ?? fields terminated by ','";

	// mysql.query(sqlImport,[filePath, originalFileName], function(err, result) {
	// 	if(err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log(result);
	// 	}
	// });

	res.send('done');
};


exports.getFile = function(req,res){
	//TODO
};