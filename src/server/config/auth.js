var passport = require('passport');
var mongoose = require('mongoose');

exports.authenticate = function(req,res,next){
        var auth = passport.authenticate('local', function(err, user) {
        if (err) 
            {return next(err);}
        if(!user) 
            {res.send({success:false})}
        req.logIn(user, function(err) {
            if(err) {return next(err);}
            res.send({success:true, user:user});
        })
    })
    auth(req,res,next);
};


exports.authenticateFB =  function(req, res, next){
        var auth = passport.authenticate('facebook',{ scope : ['email'] },function(err,user){
            if(err)
                {return next(err);}
            if(!user)
                {res.send({sucess:false})}
            req.logIn(user,function(err) {
                if(err)
                {return next(err);}
                res.send({sucess:true, user:user});
            })
        })
        auth(req,res,next);
};


exports.authenticatePIV = function(req, res) {


    //TODO: Look at handling "Cancel Button"

    var authorized=req.connection.authorized;
    var User =  mongoose.model('User');
    var protocol = req.connection.npnProtocol;
    console.log("authorized",authorized);
  
    var pivinfo=req.connection.getPeerCertificate().subject;
    console.log(pivinfo);

    if(pivinfo != undefined){

    var pivUserID = pivinfo.UID.substr(0,pivinfo.UID.indexOf(' '));
    //var  pivUserName= pivinfo.UID.substr(pivinfo.UID.indexOf('=')+1);   
    
    var pivLastName;

   

   
    var pivUserName = pivinfo.UID.substring(pivinfo.UID.indexOf('CN=')+3, pivinfo.UID.indexOf('-A')-1);

    var pivFirstName = pivUserName.substring(0,pivUserName.indexOf(' '));

     //if(pivUserName.indexOf('.') != null){
        pivLastName = pivUserName.substring(pivUserName.lastIndexOf(' '));
    // } else {
    //     pivLastName = pivUserName.substring(pivUserName.lastindexOf(' ')+1);
    // }

        //var pivDisplayName = pivDisplayName.slice('.');
     var pivDisplayName = pivFirstName +pivLastName;
    
    //console.log(pivUserID);
     console.log(pivUserName);
     console.log(pivFirstName);
     console.log(pivLastName);
     console.log('DISPLAY------' + pivDisplayName);


        User.findOne({'id': pivUserID}, function(err, user) {
            if (err) {
                return err
            }
            else if(user){
                if(authorized){
                    res.send({success:true, user:user});
                    console.log(user);
                }  else{
                res.send({success:false});
                console.log(req.connection.authorizationError);
                // res.send(req.connection.authorizationError);
                }   
            }
            else{
                //var userResource = {_v:null, _id:pivUserID, firstName: pivFirstName,lastName: pivLastName ,displayName:pivUserName, salt:null, hashed_pwd: null};
                var newUser = new User();
                newUser.id = pivUserID;
                newUser.firstName = pivFirstName;
                newUser.lastName = pivLastName;
                newUser.displayName = pivDisplayName;

                console.log("newUser",newUser);

                newUser.save(function(err){
                    if (err){
                            throw err;
                        } else{
                        res.send({success:true, user:newUser});
                        }
                });
                
            }
        });      
    }

    else
    {
        console.log("failed need to reroute to index");
        res.send({success:false});
    }
            
    
    //  var userResource = {_v:null, _id:pivUserID, firstName: pivUserName,lastName: null ,username:'XYT8', salt:null, hashed_pwd: null};
    // if(authorized)
    // {
    //     res.send({success:true, user:userResource});
    //     // console.log(pivinfo);
    //     // console.log(pivInfoAll);
    //     //res.send(userResource);
    //     //var currentUser = findUser(pivUserID);
    //     //console.log(dbUser);
        
    // }
    // else
    // {
    //     res.send({success:false});
    //     console.log(req.connection.authorizationError);
    //     // res.send(req.connection.authorizationError);
    // }
    

};

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
