var neodb = require('../lib/neo4jConnection');

exports.getRelationsForNode = function(req, res) {

    var systems = [{
        id: 2,
        name: 'System 2'
    }, {
        id: 3,
        name: 'System 3'
    }];

    var datasets = [{
        id: 2,
        name: 'Set 2'
    }, {
        id: 3,
        name: 'Set 3'
    }];

    var dataElements = [{
        id: 45,
        name: 'Element 2'
    }, {
        id: 56,
        name: 'Element 3'
    }];

    var relationships = [{
        type: 'Systems',
        values: systems
    }, {
        type: 'Data Sets',
        values: datasets
    }, {
        type: 'Data Elements',
        values: null
    }];

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

        res.json(results[0]['labels(n)']);
    });
}

exports.getNodeById = function(req, res) {

    neodb.db.getNodeById(req.params.id, function(err, node) {
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
    });
};