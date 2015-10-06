
var mysql = require('../lib/mysqlConnection');
var fs = require('fs');


exports.upload = function(req, res){
	//TODO
	console.log('FILES',req.files);
	var filePath = req.files.file.path;
	var originalFileName = req.files.file.originalFilename;
	originalFileName =  originalFileName.substring(0,originalFileName.indexOf('.'));

	console.log('filepath', filePath);
	res.send('done');

	var sqlImport = "load data local infile ? into table ?? fields terminated by ','";

	mysql.query(sqlImport,[filePath, originalFileName], function(err, result) {
		if(err) {
			console.log(err);
		} else {
			console.log(result);
		}
	});
};


exports.getFile = function(req,res){
	//TODO
};