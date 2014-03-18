var neodb = require('../lib/neo4jConnection');

exports.getNodeById = function (req, res) { 
    var node = neodb.db.getNodeById(req.params.id, function(err, node){
        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(500,'error retreiving node from database');
        } else {
            var nodedata = {
                name : node.data.name
                ,id : req.params.id
            };
            nodedata.attributes=[];
            for (var propt in node.data){
                nodedata.attributes.push({'key':propt, 'value':node.data[propt]})
            }
            var query = [
              'START n=node({nodeId}) ',
              'RETURN labels(n)'
            ].join('\n');

            var params = {
              nodeId:+req.params.id
            };

            neodb.db.query(query, params, function (err, results) {
            if (err) {
                console.error('Error retreiving labels from database:', err);
            res.send(500,'error retreiving label from database')
            }
              //console.log('results of label pull: ', results);
            nodedata.labels = results.map(function (result) {
                return result['labels(n)'];
            });
            res.json(nodedata)        
            })
    }})
};