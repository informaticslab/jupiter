//references to controllers go here

var index = require('../controllers/index');
module.exports = function(app){
    
    app.get('/partials/*', function(req,resp){
        res.render('../../public/app/' +req.params); 
    });
    app.get('*', index.index); 
};