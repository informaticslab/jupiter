var User = require('mongoose').model('User');
var crypto = require('crypto');
var auditLog = require('../config/auditLog')

exports.getUsers =  function(req,res) {
    User.find({}).exec(function(err,collection) {
        res.send(collection);
    })
};

exports.createUser = function(req,res,next) {
	var userData = req.body;
	userData.salt = createSalt();
	userData.hashed_pwd = hashPwd(userData.salt, userData.password);

	var type ='rights';
    var userId ='';
    var displayName = '';
    var notes = '';

    console.log(userData);

	User.findOne({email:userData.email}).exec(function(err, user){
		if(user) {
			res.send({success:false});
		} else {

			var newUser = new User();

	        newUser.firstName = userData.firstName;
	        newUser.lastName = userData.lastName;
	        newUser.displayName = userData.firstName+' '+userData.lastName;
	        newUser.email = userData.email;
	        newUser.lastLogin = new Date();
	        newUser.provider = 'local';
	        newUser.salt = userData.salt;
	        newUser.hashed_pwd = userData.hashed_pwd;
			
			newUser.save(function(err){
				if(err){
					throw err;
				} else {
					res.send({success:true});
				}
			})

			userId = userData.adminUserId;
			displayName = userData.adminUserDisplayName;
			notes = 'Created new local user; ID: '+ newUser._id+'('+newUser.displayName+')';

			auditLog.add(type,userId,displayName,notes);

		}
	})
	// User.create(userData, function(err, user) {
	// 	if(err){
	// 		if(err.toString().indexOf('E11000') > -1) {
	// 			err = new Error('Duplicate Email');
	// 		}
	// 		res.status(400);
	// 		return res.send({reason: err.toString()});
	// 	} 
	// })
}


function createSalt(){
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}
