/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express'),
    app = express();

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
//var bodyParser = require('body-parser');
//configure express further
var config = require('./server/config/config'); //may pass env later
require('./server/config/express')(app, config);
//mongoose goes here
// passport goes here
require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes.js')(app);


//require('./lib/mongouser');
app.listen(8089);
console.log('Express server listening on port 8089'); 




var https = require('https'),      // module for https
    fs =    require('fs');         // required to read certs and keys

var options = {
    key:    fs.readFileSync('/sec/certs/server-key.pem'),
    cert:   fs.readFileSync('/sec/certs/server-cert.pem'),
    ca:     [fs.readFileSync('/sec/certs/gd_bundle-g2.crt'),fs.readFileSync('/sec/certs/HHSPIVcachn.pem')],
    requestCert:        true,
    rejectUnauthorized: true,
};

https.createServer(options, app).listen(4400);
