var neodb = require('../lib/neo4jConnection');

exports.getNodeById = function (req, res) { 
    var node = neodb.db.getNodeById(req.params.id, function(err, node){
        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(500,'error retreiving node from database');
        } else {
            //console.log('node looks like' , node);
            var nodedata = node.data;
            console.log('Node retreived from database in JSON:', nodedata);
            res.json(nodedata)

        }
    })
};