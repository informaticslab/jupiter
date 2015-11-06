var mongoose = require('mongoose'),
	crypto = require('crypto');

module.exports = function(config) {
	
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error..'));
	db.once('open',function callback(){
		//console.log('connected to jupiter user');
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
			hash = hashPwd(salt,'user1');
			User.create({firstName:'User1',lastName:'test',email:'user1@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user1',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user2');
			User.create({firstName:'User2',lastName:'test',email:'user2@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user2',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user3');
			User.create({firstName:'User3',lastName:'test',email:'user3@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user3',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user4');
			User.create({firstName:'User4',lastName:'test',email:'user4@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user4',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user5');
			User.create({firstName:'User5',lastName:'test',email:'user5@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user5',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user6');
			User.create({firstName:'User6',lastName:'test',email:'user6@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user6',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});


			salt = createSalt();
			hash = hashPwd(salt,'user7');
			User.create({firstName:'User7',lastName:'test',email:'user7@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user7',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user8');
			User.create({firstName:'User8',lastName:'test',email:'user8@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user8',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user9');
			User.create({firstName:'User9',lastName:'test',email:'user9@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user9',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user10');
			User.create({firstName:'User10',lastName:'test',email:'user10@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user10',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user11');
			User.create({firstName:'User11',lastName:'test',email:'user11@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user11',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user12');
			User.create({firstName:'User12',lastName:'test',email:'user12@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user12',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user13');
			User.create({firstName:'User13',lastName:'test',email:'user13@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user13',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user14');
			User.create({firstName:'User14',lastName:'test',email:'user14@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user14',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			salt = createSalt();
			hash = hashPwd(salt,'user15');
			User.create({firstName:'User15',lastName:'test',email:'user15@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'user15',provider:'local',lastLogin: new Date()},function(err, docs) {
			  if (err){
			  	console.log(err);
			  } 
			  else
			  {
			  	//console.log(docs);	
			  }
			  
			});

			// salt = createSalt();
			// hash = hashPwd(salt,'sdavid');
			// User.create({firstName:'Sanjith',lastName:'David',email:'sdavid@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:false,levelTwo: false, levelThree:true},displayName:'Sanjith David',provider:'local',lastLogin: new Date()},function(err, docs) {
			//   if (err){
			//   	console.log(err);
			//   } 
			//   else
			//   {
			//   	//console.log(docs);	
			//   }
			  
			// });
			// salt = createSalt();
			// hash = hashPwd(salt,'kta');
			// User.create({firstName:'Michael',lastName:'Ta',email:'kta@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:false,levelTwo: false, levelThree:true},displayName: 'Michael Ta',provider:'local',lastLogin: new Date()},function(err, docs) {
			//   if (err){
			//   	console.log(err);
			//   } 
			//   else
			//   {
			//   	//console.log(docs);	
			//   }
			  
			// });
			// salt = createSalt();
			// hash = hashPwd(salt,'sdavidsu');
			// User.create({id:'0010',firstName:'Sanjith SU',lastName:'David',email:'sdavidsu@cdc.gov',salt:salt, hashed_pwd: hash, roles:{levelOne:true,levelTwo: true, levelThree:true},displayName:'Sanjith David SU', provider:'local',lastLogin: new Date()},function(err, docs) {
			//   if (err){
			//   	console.log(err);
			//   } 
			//   else
			//   {
			//   	//console.log(docs);	
			//   }
			  
			// });

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

