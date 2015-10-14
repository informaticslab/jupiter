
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
	// console.log(nodeId);
	// console.log('formData', formData);
	var filePath = req.files.file.path;
	var originalFileName = req.files.file.originalFilename;
	originalFileName =  originalFileName.substring(0,originalFileName.indexOf('.'));
	var input = fs.createReadStream(filePath);
	// console.log('REQ', req);
	//console.log('input',input);
	//console.log('filepath', filePath);
	var query = "MATCH (n {id:'"+nodeId+"'}) SET n.filePath = '"+filePath+"', n.localFileName = '"+originalFileName+"' RETURN n";


	neodb.db.query(query,function(err, result){
		if(err) {
			console.log(err);
			res.send(err);
		} else {
			console.log(result);
			res.send(result);

			var parser = parse(function(err,data){
				// console.log('callback data', data[0]);
				//TODO: CREATE QUERY BUILDER FOR MASS NODE AND RELATIONSHIP CREATION


				// var headers = data[0];
				// console.log(headers);
				// // console.log(data);
				// var ts = Math.round((new Date()).getTime() / 1000);
				// var idObjArray = [];

				// res.send(data);

				// for(var i = 0; i < headers.length; i++) {
				// 	var newObj ={};
				// 	newObj.name = headers[i];
				// 	newObj.id = 'DE-'+nodeId+'-'+ts+'-'+(i+1);
				// 	idObjArray.push(newObj);	
				// }
				// console.log(idObjArray);
				// var params = {ids: idObjArray};
				// var query = 'create (n {'+params+'}) RETURN n';
				
				// neodb.db.query(query, function(err, result) {
				// 	console.log(result);
				// });
			});


		fs.createReadStream(filePath).pipe(parser); 


		}
	});
};

exports.getDataFile = function(req,res){
	//TODO
	var nodeId = req.params.id;
	// console.log(nodeId);

	var query = 'match (n) where n.id="'+nodeId+'" RETURN n';
	neodb.db.query(query, function(err, result) {
		if (result[0] != null && result[0]['n'] != null && result[0]['n']['data'] != null) {
			var data =result[0]['n']['data'];
			var filePath = data.filePath;
			// console.log(filePath);

			var parser = parse({columns:true}, function(err, gridData) { 
				res.send(gridData);
			});

			fs.createReadStream(filePath).pipe(parser); 
		} else {
			console.log('ERROR: No node at this location');
		}
		

	});

	//res.send('done');
	
};

exports.deleteFile = function(req, res) {
	//TODO
	// console.log(req.body);
	var id = req.body.id;
	var query = 'match (n) where n.id="'+id+'" RETURN n';
	var deleteQuery = 'match (n {id:"'+id+'"}) remove n.filePath, n.localFileName return n';

	neodb.db.query(query, function(err, result) {
		if (result[0] != null && result[0]['n'] != null && result[0]['n']['data'] != null) {
			var data =result[0]['n']['data'];
			var filePath = data.filePath;
			// console.log(filePath);
			neodb.db.query(deleteQuery, function(err, result) {
				if(err) {
					console.log('error deleting file');
					res.send(err);
				} else {
					fs.unlinkSync(filePath);
					res.send({
						success: true,
						result:result
					});
				}
			});
		} else {
			console.log('ERROR: No node at this location');
			res.send(err);
		}
	});
};



