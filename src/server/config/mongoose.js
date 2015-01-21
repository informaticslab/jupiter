var mongoose = require('mongoose'),
	crypto = require('crypto');

module.exports = function(config) {
	mongoose.connect(config.db)
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error..'));
	db.once('open',function callback(){
		console.log('connected to apollo user');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username : String,
		salt: String,
		hashed_pwd: String,
		roles: [String]
	});

	userSchema.methods = {
		authenticate: function (passwordToMatch){
			return hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
		}
	}

	var User = mongoose.model('User',userSchema);

	User.find({}).exec(function(err, collection){ 
		if(collection.length ==0) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt,'cdcuser');
			User.create({firstName:'CDCUser',lastName:'CDCUser',username:'cdcuser', salt:salt, hashed_pwd: hash, roles:['su']},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});
			salt = createSalt();
			hash = hashPwd(salt,'admin');
			User.create({firstName:'Tom',lastName:'Savel',username:'tsavel',salt:salt, hashed_pwd: hash, roles:['admin','su']},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});
			salt = createSalt();
			hash = hashPwd(salt,'sdavid');
			User.create({firstName:'Sanjith',lastName:'David',username:'sdavid',salt:salt, hashed_pwd: hash, roles:['su']},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});
			salt = createSalt();
			hash = hashPwd(salt,'kta');
			User.create({firstName:'Michael',lastName:'Ta',username:'kta',salt:salt, hashed_pwd: hash, roles:['su']},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});
			salt = createSalt();
			hash = hashPwd(salt,'sdavidsu');
			User.create({firstName:'Sanjith SU',lastName:'David',username:'sdavidsu',salt:salt, hashed_pwd: hash, roles:['admin','su']},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			}
	})
}

function createSalt(){
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}

