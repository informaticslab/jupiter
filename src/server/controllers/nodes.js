var neodb = require('../lib/neo4jConnection');

var getLabels = function(id, callback) {
    var query = ['START n=node({nodeId}) ', 'RETURN labels(n)'].join('\n');

    var params = {
        nodeId: +id
    };

    neodb.db.query(query, params, function(err, results) {
        if (err) {
            console.error('Error retreiving labels from database:', err);
        }

        var labels = results.map(function(result) {
            return result['labels(n)'];
        });

        callback(labels);
    });
};

exports.getNodeById = function(req, res) {
    neodb.db.getNodeById(req.params.id, function(err, node) {
        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(500, 'error retreiving node from database');
        } else {

            var nodedata = {
                name: node.data.name,
                id: req.params.id
            };

            nodedata.attributes = [];

            for (var prop in node.data) {
                nodedata.attributes.push({
                    'key': prop,
                    'value': node.data[prop]
                })
            }

            getLabels(req.params.id, function(labels) {
                nodedata.labels = labels;
                res.json(nodedata)
            });
        }
    })
};