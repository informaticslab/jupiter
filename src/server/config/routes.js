//references to controllers go here
var index = require('../controllers/index');
var nodes = require('../controllers/nodes');
var users = require('../controllers/users');
var auth = require('./auth');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
    var redirecturlto="/apollo/#/main";


module.exports = function(app) {
    app.get('/apollo/partials/*', function(req, res) {
        res.render('partials/' + req.params);
        if(req.originalUrl!="/apollo/partials/navbar-login")
        {
            redirecturlto=req.originalUrl;
        }    
    });

    app.get('/apollo/api/users',auth.requiresRole('admin'), users.getUsers);
    app.post('/apollo/api/saveUser', users.createUser);



    app.get('/apollo/api/node/all', nodes.getNodeNameAll);
    app.get('/apollo/api/node/:id', nodes.getNodeById);
    app.get('/apollo/api/node/:id/labels', nodes.getLabelsForNode);
    app.get('/apollo/api/node/:id/relations', nodes.getRelationsForNode);
    app.get('/apollo/api/node/relationships/:id', nodes.getRelationshipValues);
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
    //app.get('/apollo/api/export/csvnodedetails/:id/:attributes', nodes.exportCSVNodeDetails);
    app.get('/apollo/api/attributes/getValues/:attr', nodes.getAttributeValues);
    app.get('/apollo/api/export/adhoccsv/:query', nodes.getAdhocQueryRelatedNodeTypesResultsCSV);
    app.get('/apollo/api/mongo/all', nodes.getMongoAll);
    app.get('/apollo/api/mongo/getstatus/:id', nodes.getMongoStatus);
    app.post('/apollo/api/mongo/postupdatecr', nodes.postUpdateCR);
    app.post('/apollo/api/mongo/postaddcr',nodes.postAddCR);  //testing authorization
    app.post('/apollo/api/mongo/postapprovecr', nodes.postApproveCR);
    app.post('/apollo/api/mongo/postdeclinecr', nodes.postDeclineCR);
    app.post('/apollo/api/mongo/posteditcr', nodes.postEditCR);

    app.get('/apollo/api/mongo/users/all', nodes.getUsers);
    app.post('/apollo/api/mongo/users/updateRights', nodes.updateRights);
    //app.post('/apollo/api/mongo/postrollbackcr', nodes.postRollBackCR);

    app.get('/apollo/api/mongo/latestChanges', nodes.getLatestChanges);

    
    //app.get('/apollo/api/neo/nextnodeid/:label', nodes.getNextNeoID);

    app.post('/apollo/login', auth.authenticate); //Email/password route

    app.get('/apollo/api/getpiv', auth.authenticatePIV); //PIV route

    app.post('/apollo/logout', function(req,res) {
        req.logout();
        //req.session.destroy();
        res.end();
    });
    
    app.post('/apollo/api/mongo/postdeletecr', nodes.postDeleteCR);
    app.post('/apollo/api/mongo/deletecr', nodes.deleteMongoCR);
    app.get('/apollo/api/mongo/:id', nodes.getCR);
    app.get('/apollo/api/mongo/log/:id', nodes.getCRLog);


    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/apollo/auth/facebook',auth.authenticateFB);

    app.get('/apollo/redirect', function(req,res) {

        if(redirecturlto.search("/partials/"))
        {
            redirecturlto=redirecturlto.replace("partials","#");
        }
        else
        {
            redirecturlto="/apollo/#/main";
        }
        res.redirect(redirecturlto);    
    });

    // handle the callback after facebook has authenticated the user
    app.get('/apollo/auth/facebook/callback',
        passport.authenticate('facebook', {
            scope           : ['email'], 
            successRedirect : '/apollo/redirect',
            failureRedirect : '/apollo/#/main'
        }));

    
    //this goes at the bottom.  It is the catchall for everything not defined above.  Silly.
    app.get('/apollo/*', index.index);

    //catchall for invalid GET requests
    app.use(function(err, req, res, next) {
      console.error(err.stack);
      res.redirect('/apollo/#/main');
      //res.status(500).send('Something broke!');
    });
};	