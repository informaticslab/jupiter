var express = require('express');

module.exports = function(app) {
    app.get('/reverse/:string', function(req, res){
      res.type('text/plain');
      res.send(req.params.string.split("").reverse().join(""));
    });
};