//LOCAL

module.exports = {
  MONGO_DOMAIN: 'mongodb://localhost:27017/jupiter',
  NEO_DOMAIN: 	'http://localhost:7474',

  FACEBOOK_ID:      '1429109474024840',
  FACEBOOK_SECRET:  '71ce33ce1aaa2da3d859d78a3848c164',
  FACEBOOK_CALLBACK: 'http://localhost:8089/auth/facebook/callback',

  ACCESS_LOG: __dirname+'/access_log',

  mysqlhost: '127.0.0.1',
  mysqluser: 'jupiterapp',
  mysqlpassword: 'jupiterwebapp',
  mysqldatabase: 'jupiter'

};

//jupiterDev

// MONGO_DOMAIN: 
// NEO_DOMAIN: 	

//FACBOOK_ID      : '656663327793594', 
//FACEBOOK_SECRET: 'c798e54fa699da3041de84d64f492b39', 
//FACEBOOK_CALLBACK: 'http://jupiterdev.phiresearchlab.org/auth/facebook/callback'

//jupiterTest

// MONGO_DOMAIN: 
// NEO_DOMAIN:

//FACEBOOK_ID: '1530749310479360', 
//FACEBOOK_SECRET'  : '405b8e4a47df445cf58fc9c0f557d843', 
//FACEBOOK_CALLBACK : 'http://jupitertest.phiresearchlab.org/auth/facebook/callback'
