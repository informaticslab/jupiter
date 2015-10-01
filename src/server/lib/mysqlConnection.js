var properties = require('../lib/envProperties');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : properties.mysqlhost,
  user     : properties.mysqluser,
  password : properties.mysqlpassword,
  database : properties.mysqldatabase,
  multipleStatements: true,
  //debug  : true 
  // port     : '/tmp/mysql.sock' 
});
connection.connect( function(err) {
	if(err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected to mysql db as id ' + connection.threadId);
});

module.exports = connection;