//references to controllers go here
var index = require('../controllers/index');
var nodes = require('../controllers/nodes');
var users = require('../controllers/users');
var auth = require('./auth');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
    var redirecturlto="/jupiter/#/main";


module.exports = function(app) {
    app.get('/jupiter/partials/*', function(req, res) {
        res.render('partials/' + req.params);
        if(req.originalUrl!="/jupiter/partials/navbar-login")
        {
            redirecturlto=req.originalUrl;
        }    
    });

    app.get('/jupiter/api/users',auth.requiresRole('admin'), users.getUsers);
    app.post('/jupiter/api/saveUser', users.createUser);



    app.get('/jupiter/api/node/all', nodes.getNodeNameAll);
    app.get('/jupiter/api/node/:id', nodes.getNodeById);
    app.get('/jupiter/api/node/:id/labels', nodes.getLabelsForNode);
    app.get('/jupiter/api/node/:id/relations', nodes.getRelationsForNode);
    app.get('/jupiter/api/node/relationships/:id', nodes.getRelationshipValues);
    app.get('/jupiter/api/node/search/:query', nodes.searchNodesByString);
    app.get('/jupiter/api/node/search/label/:query', nodes.searchNodesByLabel);
    app.get('/jupiter/api/node/viewer/:id', nodes.getNodesForLinkageViewer);
    app.get('/jupiter/api/stats/nodes/:id', nodes.getPortalStatisticsNodes);
    app.get('/jupiter/api/stats/nodes', nodes.getPortalStatisticsNodes);
    app.get('/jupiter/api/stats/nodesvalidated/:id', nodes.getPortalStatisticsNodesValidated);
    app.get('/jupiter/api/stats/relations', nodes.getPortalStatisticsRelations);
    app.get('/jupiter/api/dashboard/validationStatus/:id', nodes.getValidationStatus);
    app.get('/jupiter/api/relationships/all', nodes.getAllRelationships);
    app.get('/jupiter/api/activitytypes/all', nodes.getAllNodeTypes);
    app.get('/jupiter/api/adhoc/:query', nodes.getAdhocQueryResults);
    app.get('/jupiter/api/adhoc/relatednoodetypes/:query', nodes.getAdhocQueryRelatedNodeTypesResults);
    //app.get('/jupiter/api/dashboard/validationStatusDetails/:query', nodes.getValidationStatusDetails);
    app.get('/jupiter/api/node/advancedSearch/:id', nodes.getAdvancedSearchData);
    app.get('/jupiter/api/node/searchByName/:searchTerm', nodes.searchByName);
    app.get('/jupiter/api/node/searchSysTreeByName/:searchTerm',nodes.searchSysTreeByName);
    app.get('/jupiter/api/node/name/:id', nodes.getNodeNameById);
    app.get('/jupiter/api/lab/nodes', nodes.getAllNodes);
    app.get('/jupiter/api/lab/relations', nodes.getAllRealtionsForAllNodes);
    app.get('/jupiter/api/node/managed/:id', nodes.getManagedSystems);
    app.get('/jupiter/api/export/csv/:id/:qparam', nodes.exportCSV);
    app.get('/jupiter/api/export/csvrelations/:id', nodes.exportCSVNodeRelations);
    //app.get('/jupiter/api/export/csvnodedetails/:id/:attributes', nodes.exportCSVNodeDetails);
    app.get('/jupiter/api/attributes/getValues/:attr', nodes.getAttributeValues);
    app.get('/jupiter/api/export/adhoccsv/:query', nodes.getAdhocQueryRelatedNodeTypesResultsCSV);
    app.get('/jupiter/api/mongo/all', nodes.getMongoAll);
    app.get('/jupiter/api/mongo/getstatus/:id', nodes.getMongoStatus);
    app.post('/jupiter/api/mongo/postupdatecr', nodes.postUpdateCR);
    app.post('/jupiter/api/mongo/postaddcr',nodes.postAddCR);  //testing authorization
    app.post('/jupiter/api/mongo/postapprovecr', nodes.postApproveCR);
    app.post('/jupiter/api/mongo/postdeclinecr', nodes.postDeclineCR);
    app.post('/jupiter/api/mongo/posteditcr', nodes.postEditCR);

    app.get('/jupiter/api/mongo/users/all', nodes.getUsers);
    app.post('/jupiter/api/mongo/users/updateRights', nodes.updateRights);
    //app.post('/jupiter/api/mongo/postrollbackcr', nodes.postRollBackCR);

    app.get('/jupiter/api/mongo/latestChanges', nodes.getLatestChanges);

    
    //app.get('/jupiter/api/neo/nextnodeid/:label', nodes.getNextNeoID);

    app.post('/jupiter/login', auth.authenticate); //Email/password route

    app.get('/jupiter/api/getpiv', auth.authenticatePIV); //PIV route

    app.post('/jupiter/logout', function(req,res) {
        req.logout();
        //req.session.destroy();
        res.end();
    });
    
    app.post('/jupiter/api/mongo/postdeletecr', nodes.postDeleteCR);
    app.post('/jupiter/api/mongo/deletecr', nodes.deleteMongoCR);
    app.get('/jupiter/api/mongo/:id', nodes.getCR);
    app.get('/jupiter/api/mongo/log/:id', nodes.getCRLog);


    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/jupiter/auth/facebook',auth.authenticateFB);

    app.get('/jupiter/redirect', function(req,res) {

        if(redirecturlto.search("/partials/"))
        {
            redirecturlto=redirecturlto.replace("partials","#");
        }
        else
        {
            redirecturlto="/jupiter/#/main";
        }
        res.redirect(redirecturlto);    
    });

    // handle the callback after facebook has authenticated the user
    app.get('/jupiter/auth/facebook/callback',
        passport.authenticate('facebook', {
            scope           : ['email'], 
            successRedirect : '/jupiter/redirect',
            failureRedirect : '/jupiter/#/main'
        }));

    
    //this goes at the bottom.  It is the catchall for everything not defined above.  Silly.
    app.get('/jupiter/*', index.index);

    //catchall for invalid GET requests
    app.use(function(err, req, res, next) {
      console.error(err.stack);
      res.redirect('/jupiter/#/main');
      //res.status(500).send('Something broke!');
    });
};	