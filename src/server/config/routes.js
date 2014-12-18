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
    app.get('/apollo/api/stats/nodes/:id', nodes.getPortalStatisticsNodes);
    app.get('/apollo/api/stats/nodes', nodes.getPortalStatisticsNodes);
    app.get('/apollo/api/stats/nodesvalidated/:id', nodes.getPortalStatisticsNodesValidated);
    app.get('/apollo/api/stats/relations', nodes.getPortalStatisticsRelations);
    app.get('/apollo/api/dashboard/validationStatus/:id', nodes.getValidationStatus);
    app.get('/apollo/api/relationships/all', nodes.getAllRelationships);
    app.get('/apollo/api/activitytypes/all', nodes.getAllNodeTypes);
    app.get('/apollo/api/adhoc/:query', nodes.getAdhocQueryResults);
    app.get('/apollo/api/adhoc/relatednoodetypes/:query', nodes.getAdhocQueryRelatedNodeTypesResults);
    //app.get('/apollo/api/dashboard/validationStatusDetails/:query', nodes.getValidationStatusDetails);
    app.get('/apollo/api/node/advancedSearch/:id', nodes.getAdvancedSearchData);
    app.get('/apollo/api/node/searchByName/:searchTerm', nodes.searchByName);
    app.get('/apollo/api/node/searchSysTreeByName/:searchTerm',nodes.searchSysTreeByName);
    app.get('/apollo/api/node/name/:id', nodes.getNodeNameById);
    app.get('/apollo/api/lab/nodes', nodes.getAllNodes);
    app.get('/apollo/api/lab/relations', nodes.getAllRealtionsForAllNodes);
    app.get('/apollo/api/node/managed/:id', nodes.getManagedSystems);
    app.get('/apollo/api/export/csv/:id/:qparam', nodes.exportCSV);
    app.get('/apollo/api/export/csvrelations/:id', nodes.exportCSVNodeRelations);
    app.get('/apollo/api/attributes/getValues/:attr', nodes.getAttributeValues);
    app.get('/apollo/api/export/adhoccsv/:query', nodes.getAdhocQueryRelatedNodeTypesResultsCSV);
    app.get('/apollo/api/mongo/all', nodes.getMongoAll);
    app.post('/apollo/api/mongo/postcr', nodes.postMongoCR);
    app.post('/apollo/api/mongo/deletecr', nodes.deleteMongoCR);
    app.get('/apollo/api/mongo/:id', nodes.getCR);
    
    //this goes at the bottom.  It is the catchall for everything not defined above.  Silly.
    app.get('/apollo/*', index.index);
};	