var passport = require('passport');

exports.authenticate = function(req,res,next){
            var auth = passport.authenticate('local', function(err, user) {
            if (err) {return next(err);}
            if(!user) {res.send({success:false})}
            req.logIn(user, function(err) {
                if(err) {return next(err);}
                res.send({success:true, user:user});
            })
        })
        auth(req,res,next);
};

// exports.requiresApiLogin = function(req,res,next) {
//     if(!req.isAuthenticated()){
//         res.status(403);
//         res.end();
//     }else {
//         next();
//     }
// };


exports.requiresLogin = function(req,res,next) {
    if(!req.isAuthenticated()){
        res.redirect('/');
    } else {
        next();
    }
};


exports.requiresRole =function(role) {
    return function (req,res,next) {
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
            console.log(role); 
        } else {
            next();
        }
    }
};




exports.authPropertiesLocal = {

    'facebookAuth' : {
        'clientID'      : '1429109474024840', // your App ID
        'clientSecret'  : '71ce33ce1aaa2da3d859d78a3848c164', // your App Secret
        'callbackURL'   : 'http://localhost:8089/apollo/auth/facebook/callback'
    },

    // 'twitterAuth' : {
    //     'consumerKey'       : 'your-consumer-key-here',
    //     'consumerSecret'    : 'your-client-secret-here',
    //     'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    // },

    // 'googleAuth' : {
    //     'clientID'      : 'your-secret-clientID-here',
    //     'clientSecret'  : 'your-client-secret-here',
    //     'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    // }

};

exports.authProperties = {

    'facebookAuth' : {
        'clientID'      : '1501295270085876', // your App ID
        'clientSecret'  : 'd96bbe79faf92c6aa88fc9e4dba53501', // your App Secret
        'callbackURL'   : 'http://sectest.phiresearchlab.org/apollo/auth/facebook/callback'
    },

    // 'twitterAuth' : {
    //     'consumerKey'       : 'your-consumer-key-here',
    //     'consumerSecret'    : 'your-client-secret-here',
    //     'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    // },

    // 'googleAuth' : {
    //     'clientID'      : 'your-secret-clientID-here',
    //     'clientSecret'  : 'your-client-secret-here',
    //     'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    // }

};

 