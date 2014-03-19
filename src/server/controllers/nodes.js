var neodb = require('../lib/neo4jConnection');
var async = require('async');

exports.getNodeById = function(req, res) {

    var nodedata = {};

    var setNodeAttributes = function(node) {
        nodedata.name = node.data.name;
        nodedata.id = req.params.id;

        nodedata.attributes = [];

        for (var prop in node.data) {
            nodedata.attributes.push({
                'key': prop,
                'value': node.data[prop]
            })
        }
    };

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

    var getRelationships = function(node, callback) {
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

        callback(relationships);
    };

    var nodeRetrieved = function(err, node) {
        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(500, 'error retreiving node from database');
        } else {

            setNodeAttributes(node);
            getLabels(req.params.id, function(labels) {
                nodedata.labels = labels;
                getRelationships(node, function(relationships) {
                    nodedata.relationships = relationships;
                    res.json(nodedata);
                });
            });
        }
    };

    neodb.db.getNodeById(req.params.id, nodeRetrieved);
};