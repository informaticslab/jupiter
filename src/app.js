/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
httpsPort = 4400;
httpPort = 8089;
var path = require('path');
var rootPath = path.normalize(__dirname + '/');
var properties = require('./server/lib/envProperties');


 var https = require('https'),      // module for https
 fs =    require('fs');         // required to read certs and keys

var express = require('express'),
    app = express();

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

//configure express further
var config = require('./server/config/config'); //may pass env later
require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes.js')(app);


if(properties.USESSL == 'false')
{
    //require('./lib/mongouser');
    app.listen(httpPort);
    console.log('Express server listening on port '+httpPort); 

    //https will still be used for client-authentication
    var options = {
        key:    fs.readFileSync(properties.SSL_KEY),
        cert:   fs.readFileSync(properties.SSL_CERT),
        ca:     [fs.readFileSync(properties.SSL_BUNDLE),
                fs.readFileSync(properties.CLIENT_CERT)],
        requestCert:        true,
        rejectUnauthorized: false,
    };

    https.createServer(options, app).listen(httpsPort);
}
else if(properties.USESSL == 'true')
{
     //https Now used for all communication
    var options = {
        key:    fs.readFileSync(properties.SSL_KEY),
        cert:   fs.readFileSync(properties.SSL_CERT),
        ca:     [fs.readFileSync(properties.SSL_BUNDLE),
                fs.readFileSync(properties.CLIENT_CERT)],
        requestCert:        true,
        rejectUnauthorized: false,
    };

    https.createServer(options, app).listen(httpsPort);
    console.log('Express server listening securely on port '+httpsPort);

    var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    //res.writeHead(301, { "Location": "https://localhost:4400" });
    res.end();
}).listen(httpPort);

console.log('Redirector listening on port ' + httpPort); 
}
