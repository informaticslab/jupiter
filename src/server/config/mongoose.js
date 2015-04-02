var mongoose = require('mongoose'),
	crypto = require('crypto');

module.exports = function(config) {
	
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error..'));
	db.once('open',function callback(){
		//console.log('connected to apollo user');
	});


	var userSchema = mongoose.Schema({
		id: String,
		firstName: String,
		lastName: String,
		//username : String,
		email: String,
		provider: String,
		salt: String,
		hashed_pwd: String,
		token: String,
		roles: {
				levelOne: Boolean,     
				levelTwo: Boolean,			
				levelThree: Boolean
			},
		displayName: String,
		lastLogin: Date
	});

	userSchema.methods = {
		authenticate: function (passwordToMatch){
			return hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
		}
	}

	var loghistorySchema = mongoose.Schema({
		id: String,
		loginDateTime: Date
	});

	var auditLogSchema =  mongoose.Schema({
		type: String,
		date: Date,
		userId: String,
		displayName: String,
		notes: String
	});

	var User = mongoose.model('User',userSchema);
	var Loghistory = mongoose.model('loghistorySchema',loghistorySchema);
	var Log = mongoose.model('auditLog',auditLogSchema);

	User.find({}).exec(function(err, collection){ 
		if(collection.length ==0) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt,'cdcuser');
			User.create({firstName:'CDCUser',lastName:'Test',email:'cdcuser@cdc.gov', salt:salt, hashed_pwd: hash, roles:{levelOne:false,levelTwo: false, levelThree:true},displayName:'CDCUser Test',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});
			salt = createSalt();
			hash = hashPwd(salt,'cdcuser1');
			User.create({firstName:'CDCUser1',lastName:'Test',email:'cdcuser1@cdc.gov', salt:salt, hashed_pwd: hash, roles:{levelOne:false,levelTwo: false, levelThree:true},displayName:'CDCUser1 Test',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});
			salt = createSalt();
			hash = hashPwd(salt,'cdcuser2');
			User.create({firstName:'CDCUser2',lastName:'Test',email:'cdcuser2@cdc.gov', salt:salt, hashed_pwd: hash, roles:{levelOne:false,levelTwo: false, levelThree:true},displayName:'CDCUser2 Test',provider:'local',lastLogin: new Date()},function(err, docs) {
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
			User.create({firstName:'Tom',lastName:'Savel',email:'tsavel@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'Tom Savel',provider:'local',lastLogin: new Date()},function(err, docs) {
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
			User.create({firstName:'Sanjith',lastName:'David',email:'sdavid@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:false,levelTwo: false, levelThree:true},displayName:'Sanjith David',provider:'local',lastLogin: new Date()},function(err, docs) {
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
			User.create({firstName:'Michael',lastName:'Ta',email:'kta@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:false,levelTwo: false, levelThree:true},displayName: 'Michael Ta',provider:'local',lastLogin: new Date()},function(err, docs) {
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
			User.create({id:'0010',firstName:'Sanjith SU',lastName:'David',email:'sdavidsu@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'Sanjith David SU', provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			// User.create({id:'1001619186',firstName:'Kiet',lastName:'Ta',email:'XYT8@cdc.gov',salt:null, hashed_pwd: null, provider:'PIV', roles:{levelOne:false,levelTwo: false levelThree:true},displayName:'Kiet Ta', provider:'PIV'},function(err, docs) {
			//   if (err){
			//   	console.log(err);
			//   } 
			//   else
			//   {
			//   	//console.log(docs);	
			//   }
			  
			// });

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

