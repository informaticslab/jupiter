//references to controllers go here
var index = require('../controllers/index');
var nodes = require('../controllers/nodes');
var users = require('../controllers/users');
var data = require('../controllers/data');
var auth = require('./auth');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
    var redirecturlto="/#/main";


module.exports = function(app) {
    app.get('/partials/*', function(req, res) {
        res.render('partials/' + req.params);
        // if(req.originalUrl!="/partials/navbar-login")
        // {
        //     redirecturlto=req.originalUrl;
        // }    
    });

    app.get('/api/users',auth.requiresRole('admin'), users.getUsers);
    app.post('/api/saveUser', users.createUser);



    app.get('/api/node/all', nodes.getNodeNameAll);
    app.get('/api/node/:id', nodes.getNodeById);
    app.get('/api/node/:id/labels', nodes.getLabelsForNode);
    app.get('/api/node/:id/relations', nodes.getRelationsForNode);
    app.get('/api/node/relationships/:id', nodes.getRelationshipValues);
    app.get('/api/node/search/:query', nodes.searchNodesByString);
    app.get('/api/node/search/label/:query', nodes.searchNodesByLabel);
    app.get('/api/node/viewer/:id', nodes.getNodesForLinkageViewer);
    app.get('/api/node/dataElements/:id', nodes.getDataElements);
    app.get('/api/stats/nodes/:id', nodes.getPortalStatisticsNodes);
    app.get('/api/stats/nodes', nodes.getPortalStatisticsNodes);
    app.get('/api/stats/nodesvalidated/:id', nodes.getPortalStatisticsNodesValidated);
    app.get('/api/stats/relations', nodes.getPortalStatisticsRelations);
    app.get('/api/dashboard/validationStatus/:id', nodes.getValidationStatus);
    app.get('/api/relationships/all', nodes.getAllRelationships);
    app.get('/api/activitytypes/all', nodes.getAllNodeTypes);
    app.get('/api/adhoc/:query', nodes.getAdhocQueryResults);
    app.post('/api/node/save/saveDE', nodes.saveDataElements);

    app.get('/api/adhoc/relatednoodetypes/:query', nodes.getAdhocQueryRelatedNodeTypesResults);
    //app.get('/api/dashboard/validationStatusDetails/:query', nodes.getValidationStatusDetails);
    app.get('/api/node/advancedSearch/:id', nodes.getAdvancedSearchData);
    app.get('/api/node/searchByName/:searchTerm', nodes.searchByName);
    app.get('/api/node/searchSysTreeByName/:searchTerm',nodes.searchSysTreeByName);
    app.get('/api/node/name/:id', nodes.getNodeNameById);
    app.get('/api/lab/nodes', nodes.getAllNodes);
    app.get('/api/lab/relations', nodes.getAllRealtionsForAllNodes);
    app.get('/api/node/managed/:id', nodes.getManagedSystems);
    app.get('/api/export/csv/:id/:qparam', nodes.exportCSV);
    app.get('/api/export/csvrelations/:id', nodes.exportCSVNodeRelations);
    //app.get('/api/export/csvnodedetails/:id/:attributes', nodes.exportCSVNodeDetails);
    app.get('/api/attributes/getValues/:attr', nodes.getAttributeValues);
    app.get('/api/export/adhoccsv/:query', nodes.getAdhocQueryRelatedNodeTypesResultsCSV);
    app.get('/api/mongo/all', nodes.getMongoAll);
    app.get('/api/mongo/getstatus/:id', nodes.getMongoStatus);
    app.post('/api/mongo/postupdatecr', nodes.postUpdateCR);
    app.post('/api/mongo/postaddcr',nodes.postAddCR);  //testing authorization
    app.post('/api/mongo/postapprovecr', nodes.postApproveCR);
    app.post('/api/mongo/postdeclinecr', nodes.postDeclineCR);
    app.post('/api/mongo/posteditcr', nodes.postEditCR);

    app.post('/api/fileUpload', data.upload);
    // app.post('/api/updateDataNode', data.updateNode);
    app.get('/api/getDataFile:id', data.getDataFile);
    app.post('/api/deletefile', data.deleteFile);

    app.get('/api/mongo/users/all', nodes.getUsers);
    app.post('/api/mongo/users/updateRights', nodes.updateRights);
    //app.post('/api/mongo/postrollbackcr', nodes.postRollBackCR);

    app.get('/api/mongo/latestChanges', nodes.getLatestChanges);

    
    //app.get('/api/neo/nextnodeid/:label', nodes.getNextNeoID);

    app.post('/login', auth.authenticate); //Email/password route

    app.get('/api/getpiv', auth.authenticatePIV); //PIV route

    app.post('/logout', function(req,res) {
        req.logout();
        //req.session.destroy();
        res.end();
    });
    
    app.post('/api/mongo/postdeletecr', nodes.postDeleteCR);
    app.post('/api/mongo/deletecr', nodes.deleteMongoCR);
    app.get('/api/mongo/:id', nodes.getCR);
    app.get('/api/mongo/log/:id', nodes.getCRLog);


    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook',auth.authenticateFB);

    app.get('/redirect', function(req,res) {

        if(redirecturlto.search("/partials/"))
        {
            redirecturlto=redirecturlto.replace("partials","#");
        }
        else
        {
            redirecturlto="/#/main";
        }
        res.redirect(redirecturlto);    
    });

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            scope           : ['email'], 
            successRedirect : '/redirect',
            failureRedirect : '/#/main'
        }));

    
    //this goes at the bottom.  It is the catchall for everything not defined above.  Silly.
    app.get('/*', index.index);

    //catchall for invalid GET requests
    app.use(function(err, req, res, next) {
      console.error(err.stack);
      res.redirect('/#/main');
      //res.status(500).send('Something broke!');
    });
};	