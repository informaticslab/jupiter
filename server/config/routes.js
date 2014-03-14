//references to controllers go here

var index = require('../controllers/index');
module.exports = function(app){
  app.get('/', index.index); 
};