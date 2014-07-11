/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var fs = require('fs');
var https = require('https');
var clientCertificateAuth = require('client-certificate-auth');
var express = require('express'),
    app = express();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
//configure express further
var config = require('./server/config/config'); //may pass env later

require('./server/config/express')(app, config);
//mongoose goes here
// passport goes here
require('./server/config/routes.js')(app);
//require('./lib/mongouser');
app.listen(8089);
console.log('Express server listening on port 8089');

var opts = {
  // Server SSL private key and certificate
  key: fs.readFileSync('/Users/pmw3/secureapp/certificates/cert.pem'),
  cert: fs.readFileSync('/Users/pmw3/secureapp/certificates/cert.pem'),
  // issuer/CA certificate against which the client certificate will be
  // validated. A certificate that is not signed by a provided CA will be
  // rejected at the protocol layer.
  ca: fs.readFileSync('/Users/pmw3/secureapp/certificates/cert.pem'),
  // request a certificate, but don't necessarily reject connections from
  // clients providing an untrusted or no certificate. This lets us protect only
  // certain routes, or send a helpful error message to unauthenticated clients.
  requestCert: true,
  rejectUnauthorized: false
};

var secapp = express();

// add clientCertificateAuth to the middleware stack, passing it a callback
// which will do further examination of the provided certificate.
secapp.use(clientCertificateAuth(checkAuth));
secapp.use(secapp.router);
secapp.use(function(err, req, res, next) { console.log(err); next(); });

secapp.get('/', function(req, res) {
  res.send('Authorized!');
});

var checkAuth = function(cert) {
 /*
  * allow access if certificate subject Common Name is 'Doug Prishpreed'.
  * this is one of many ways you can authorize only certain authenticated
  * certificate-holders; you might instead choose to check the certificate
  * fingerprint, or apply some sort of role-based security based on e.g. the OU
  * field of the certificate. You can also link into another layer of
  * auth or session middleware here; for instance, you might pass the subject CN
  * as a username to log the user in to your underlying authentication/session
  * management layer.
  */
  //return cert.subject.CN === 'Doug Prishpreed';
  return true
};

https.createServer(opts, secapp).listen(4000);
console.log('SECURE Express server listening on port 4000');
