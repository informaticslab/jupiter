var passport = require('passport'),
	mongoose = require('mongoose'),
	LocalStrategy = require('passport-local');

var auth = require('../lib/oAuthProperties').authProperties;

var FacebookStrategy = require('passport-facebook').Strategy;

var User = mongoose.model('User');
var Loghistory = mongoose.model('loghistorySchema');
var auditLog = require('../config/auditLog')

var type ='login';
var userId ="";
var displayName = "";
var notes = "";

module.exports = function(){
	
	//SESSION SETUP
	passport.serializeUser(function(user,done) {
		if(user) {
			done(null, user._id);
		}
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({_id:id}).exec(function(err,user) {
			if(user) {
				return done(null,user);
			} else {
				return done(null,false);
			}
		})
	});


	//LOCAL STRATEGY
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {
		User.findOne({email:email}).exec(function(err,user) {
			if(user && user.authenticate(password)) {
				//console.log(user);
				user.lastLogin = new Date();
                user.save(function(err) {
            		if (err){
            			throw err;
            		} else {
                         userId = user._id;
                         displayName = user.displayName;
                         notes = 'USER_TYPE: LOCAL';
                         auditLog.add(type,userId,displayName,notes);
            			 return done(null, user); // user found, return that user
                       
            		}
            	})
			} else {
				return done(null,false);
			}
		})
	}
	));


	//FACEBOOK STRATEGY
	passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : auth.facebookAuth.clientID,
        clientSecret    : auth.facebookAuth.clientSecret,
        callbackURL     : auth.facebookAuth.callbackURL,
        profileFields	: ['id', 'displayName','email','first_name','last_name']

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {


    	//console.log("profile",profile);

        // asynchronous
        process.nextTick(function() {	

            // find the user in the database based on their facebook id
            User.findOne({ 'id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                	user.lastLogin = new Date();
                	user.save(function(err) {
                		if (err){
                			throw err;
                		} else {
                             userId = user._id;
                             displayName = user.displayName;
                             notes = 'USER_TYPE: FACEBOOK';
                             auditLog.add(type,userId,displayName,notes);
                			 return done(null, user); // user found, return that user
                		}
                	})

                   
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.id    = profile.id; // set the users facebook id                   
                    newUser.token = token; // we will save the token that facebook provides to the user                    
                    //newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.familyName;
                    newUser.displayName = profile.name.givenName+' '+profile.name.familyName;
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.lastLogin = new Date();
                    newUser.provider = 'facebook';

                    //console.log("newUser",newUser);
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err) {
                            throw err;
                        } else {
                        // if successful, return the new user
                            userId = newUser._id;
                            displayName = newUser.displayName;
                            notes = 'USER_TYPE: FACEBOOK';
                            auditLog.add(type,userId,displayName,notes);
                            return done(null, newUser);
                        }

                    });
                }

            });
			
			// var newLoghistory = new Loghistory();

			// // set all of the facebook information in our user model
			// newLoghistory.id    = profile.id; // set the users facebook id                   
			// newLoghistory.loginDateTime = new Date();                 

			// console.log("First Name Info",profile.displayName);
			// // save our user to the database
			// newLoghistory.save(function(err) {
			// if (err)
			// throw err;

			// // if successful, return the new user
			// return done(null, newLoghistory);
			// });
		
        });

    }));

}