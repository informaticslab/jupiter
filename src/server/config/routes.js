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
    app.get('/apollo/api/node/search/:query', nodes.searchNodesByString);
    app.get('/apollo/api/node/search/label/:query', nodes.searchNodesByLabel);
    app.get('/apollo/api/node/viewer/:id', nodes.getNodesForLinkageViewer);
    app.get('/apollo/api/stats/nodes', nodes.getPortalStatisticsNodes);
    app.get('/apollo/api/stats/relations', nodes.getPortalStatisticsRelations);
    app.get('/apollo/api/node/advancedSearch/:id', nodes.getAdvancedSearchData);
    //this goes at the bottom.  It is the catchall for everything not defined above.  Silly.
    app.get('/apollo/*', index.index);
};	