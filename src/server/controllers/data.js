
var parse =require('csv-parse');
// var mysql = require('../lib/mysqlConnection');
var fs = require('fs');
var neodb = require('../lib/neo4jConnection');


exports.upload = function(req, res){
	var nodeId = '';
	// console.log('FILES',req.body);
	var body = req.body;

	for(var i =0; i < body[0].length; i++){
		nodeId = nodeId + body[0][i];
	}
	//console.log(nodeId);
	// console.log('formData', formData);
	var filePath = req.files.file.path;
	var originalFileName = req.files.file.originalFilename;
	originalFileName =  originalFileName.substring(0,originalFileName.indexOf('.'));
	var input = fs.createReadStream(filePath);
	// console.log('REQ', req);
	//console.log('input',input);
	//console.log('filepath', filePath);
	var query = "MATCH (n {id:'"+nodeId+"'}) SET n.fileLocation = '"+filePath+"', n.fileName = '"+originalFileName+"' RETURN n";


	neodb.db.query(query,function(err, result){
		if(err) {
			console.log(err);
			res.send(err);
		} else {
			console.log(result);
			res.send(result);

			var query = 'match (n:`DataElement`) return n.id as id, length(n.id) as len order by len desc, id desc limit 1';
	       

	        neodb.db.query(query, function(err, results) {
	            if (err) {
	                console.error('Error retreiving node from database:', err);
	                res.send(404, 'No node at that location');
	            } else {
	                //console.log(results[0].id);
	                var id = results[0].id;
	                var idalphanum = id;
	                var idnumstring = idalphanum.match(/\d*$/);
	                //console.log("idnumstring", idnumstring[0]);
	                var idnum = parseInt(idnumstring[0]);
	                idnum++;
	                //console.log(idnum);
	                idnew = idalphanum.replace(/\d*$/, idnum.toString());
	                console.log(idnew)
				}
			});
		}
	});
	
	var parser = parse(function(err,data){
		console.log('callback data', data[0]);

	});

	fs.createReadStream(filePath).pipe(parser); 

	//var sqlImport = "load data local infile ? into table ?? fields terminated by ','";

	// mysql.query(sqlImport,[filePath, originalFileName], function(err, result) {
	// 	if(err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log(result);
	// 	}
	// });
};


exports.parseCSV = function(req, res) {

};

// exports.updateNode = function(req,res) {
// 	console.log(req.body);
// };


exports.getFile = function(req,res){
	//TODO
};