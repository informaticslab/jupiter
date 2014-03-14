//references to controllers go here

var index = require('../controllers/index');
var neodb = require('../lib/neo4jConnection');
module.exports = function(app){
    
    app.get('/partials/*', function(req,res){
        res.render('partials/' +req.params); 
    });
    
    
   


    app.get('/api/node/:id', function(req, res){
        var node = neodb.db.getNodeById(req.params.id, function (err, node) {    
    if (err) {
        console.error('Error retreiving node from database:', err);
        res.send(500,'error retreiving node from database');
    } else {
        //console.log('node looks like' , node);
        var nodedata = node.data;
         console.log('Node retreived from database in JSON:', nodedata);
        res.json(nodedata)
//      res.json(
//          {
//              name:'foo',
//              id:req.params.id
//          });
    }
        })
        });
        
    
    
    //this goes at the bottom.  It is the catchall for everything not defined above.  Silly.
    app.get('*', index.index);
};