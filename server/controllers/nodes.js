var neodb = require('../lib/neo4jConnection');

exports.getNodeById = function (req, res) { 
    var node = neodb.db.getNodeById(req.params.id, function(err, node){
        if (err) {
            console.error('Error retreiving node from database:', err);
            res.send(500,'error retreiving node from database');
        } else {
            //console.log('node looks like' , node.toJSON());
            //var nodeblurb = node.toJSON();
            //var labelURL = nodeblurb._data.labels;
            var nodedata = node.data;
            //var nodeid = node.id;
            //console.log('Node label url:',  labelURL);
            //console.log('Node id:', nodeid );
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
                  console.log('results of label pull: ', results);
              var labels = results.map(function (result) {
                return result['labels(n)'];
              });
                nodedata.labels = labels
                        res.json(nodedata)

        })
    }})
};