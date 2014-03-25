var express = require('express');
module.exports = function(app, config) {
    app.configure(function() {
        app.use('/apollo/',express.static(config.rootPath + '/public'));
        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');
    });
}