var neodb = require('../lib/neo4jConnection');

exports.getRelationsForNode = function(req, res) {

    var relationships = {
        systems: [{
            id: 2,
            name: 'System 2'
        }, {
            id: 3,
            name: 'System 3'
        }],
        dataSets: [{
            id: 2,
            name: 'Set 2'
        }, {
            id: 3,
            name: 'Set 3'
        }]
    };

    res.json(relationships);
}

exports.getLabelsForNode = function(req, res) {

    var query = ['START n=node({nodeId}) ', 'RETURN labels(n)'].join('\n');

    var params = {
        nodeId: +req.params.id
    };

    neodb.db.query(query, params, function(err, results) {
        if (err) {
            console.error('Error retreiving labels from database:', err);
        }

        var labels = results.map(function(result) {
            return result['labels(n)'];
        });

        res.json(labels);
    });
}

exports.getNodeById = function(req, res) {

    var nodeRetrieved = function(err, node) {
        var nodedata = {};

        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(500, 'error retreiving node from database');
        } else {

            nodedata.name = node.data.name;
            nodedata.id = req.params.id;
            nodedata.attributes = [];

            for (var prop in node.data) {
                nodedata.attributes.push({
                    'key': prop,
                    'value': node.data[prop]
                })
            }

            res.json(nodedata);
        }
    };

    neodb.db.getNodeById(req.params.id, nodeRetrieved);
};