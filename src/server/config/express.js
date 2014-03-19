var express = require('express');
module.exports = function(app, config){
    app.configure(function(){
          
        app.set('views', config.rootPath + '/server/views');

        app.use(express.static(config.rootPath + '/public'));
        app.set('view engine', 'jade');
    });
}