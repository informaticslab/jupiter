//references to controllers go here

var index = require('../controllers/index');
var nodes = require('../controllers/nodes');
module.exports = function(app){
    
    app.get('/partials/*', function(req,res){
        res.render('partials/' +req.params); 
    });
    
    app.get('/api/node/:id', nodes.getNodeById);
    
    //this goes at the bottom.  It is the catchall for everything not defined above.  Silly.
    app.get('*', index.index);
};