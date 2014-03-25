//references to controllers go here
var index = require('../controllers/index');
var nodes = require('../controllers/nodes');
module.exports = function(app) {
    app.get('/apollo/partials/*', function(req, res) {
        res.render('partials/' + req.params);
    });
    app.get('/apollo/api/node/:id', nodes.getNodeById);
    app.get('/apollo/api/node/:id/labels', nodes.getLabelsForNode);
    app.get('/apollo/api/node/:id/relations', nodes.getRelationsForNode);
    //this goes at the bottom.  It is the catchall for everything not defined above.  Silly.
    app.get('/apollo/*', index.index);
};	