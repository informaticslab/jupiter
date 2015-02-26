var express = require('express'),
csv = require('express-csv'),
	cookieParser = require('cookie-parser'),
	session = require('express-session')
	passport = require('passport');
module.exports = function(app, config) {
    app.configure(function() {
        app.use('/apollo/',express.static(config.rootPath + '/public'));
        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');
        app.use(cookieParser());
        app.use(express.bodyParser());
        app.use(session({secret:'use the force',resave:false,saveUninitialized:false}));
        app.use(passport.initialize());
        app.use(passport.session());
    });
}