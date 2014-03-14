//references to controllers go here

var index = require('../controllers/index');
module.exports = function(app){
    
    app.get('/partials/*', function(req,res){
        res.render('partials/' +req.params); 
    });
    
    app.get('*', index.index);
};