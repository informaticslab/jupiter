/* jshint node: true */
'use strict';
var parse = require('csv-parse');
var fs = require('fs');
var neodb = require('../lib/neo4jConnection');


exports.upload = function(req, res) {
	var nodeId = '';
	var body = req.body;

	for (var i = 0; i < body[0].length; i++) {
		nodeId = nodeId + body[0][i];
	}
	var filePath = req.files.file.path;
	var originalFileName = req.files.file.originalFilename;
	originalFileName = originalFileName.substring(0, originalFileName.indexOf('.'));
	var input = fs.createReadStream(filePath);
	var query = "MATCH (n {id:'" + nodeId + "'}) SET n.filePath = '" + filePath + "', n.localFileName = '" + originalFileName + "' RETURN n";


	neodb.db.query(query, function(err, result) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			var parser = parse(function(err, data) {

				var headers = data[0];
				var ts = Math.round((new Date()).getTime() / 1000);

				var matchClause = 'match (a:Dataset),(b:Concept) where a.id="' + nodeId + '" AND b.id = "CN0"';
				var createPattern = '';
				var builtQuery = '';
				var elementQueryId = '';

				var builtQuery = matchClause + ' create ';
				for (var i = 0; i < headers.length; i++) {
					var elementId = 'DE' + nodeId + ts + (i + 1);
					var elementQueryId = headers[i].charAt(0) + i;
					if ((i + 1) === headers.length) {
						createPattern = '(' + elementQueryId + ':DataElement{name:"' + headers[i] + '", id:"' + elementId + '"})<-[:CONTAINS{`relationshipDescription`:"N/A"}]-(a), ('+ elementQueryId +')-[:SHARES_MEANING_WITH{`relationshipDescription`:"N/A"}]->(b)';
					} else {
						createPattern = '(' + elementQueryId + ':DataElement{name:"' + headers[i] + '", id:"' + elementId + '"})<-[:CONTAINS{`relationshipDescription`:"N/A"}]-(a), ('+ elementQueryId +')-[:SHARES_MEANING_WITH{`relationshipDescription`:"N/A"}]->(b),';
					}

					builtQuery = builtQuery + createPattern;
				}

				builtQuery = builtQuery + 'return a';

				neodb.db.query(builtQuery, function(err, result) {
					if (err) {
						console.log(err);
						res.send(err);
					} else {
						res.send(result);
					}
				});

			});


			fs.createReadStream(filePath).pipe(parser);


		}
	});
};

exports.getDataFile = function(req, res) {

	var nodeId = req.params.id;

	var query = 'match (n) where n.id="' + nodeId + '" RETURN n';
	neodb.db.query(query, function(err, result) {
		if (result[0] != null && result[0]['n'] != null && result[0]['n']['data'] != null) {
			var data = result[0]['n']['data'];
			var filePath = data.filePath;

			var parser = parse({
				columns: true
			}, function(err, gridData) {
				res.send(gridData);
			});

			fs.createReadStream(filePath).pipe(parser);
		} else {
			console.log('ERROR: No node at this location');
		}


	});

};

exports.deleteFile = function(req, res) {
	var id = req.body.id;
	var query = 'match (n) where n.id="' + id + '" RETURN n';
	var deleteQuery = 'match (n {id:"' + id + '"}) remove n.filePath, n.localFileName return n';

	neodb.db.query(query, function(err, result) {
		if (result[0] != null && result[0]['n'] != null && result[0]['n']['data'] != null) {
			var data = result[0]['n']['data'];
			var filePath = data.filePath;
			neodb.db.query(deleteQuery, function(err, result) {
				if (err) {
					console.log('error deleting file');
					res.send(err);
				} else {
					fs.unlinkSync(filePath);
					res.send({
						success: true,
						result: result
					});
				}
			});
		} else {
			console.log('ERROR: No node at this location');
			res.send(err);
		}
	});
};