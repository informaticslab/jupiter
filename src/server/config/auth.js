var passport = require('passport');
var mongoose = require('mongoose');
var auditLog = require('../config/auditLog')


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
        } else {
            next();
        }
    }
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

    var authorized=req.connection.authorized;
    var User =  mongoose.model('User');
    var protocol = req.connection.npnProtocol;
    var type ='login';
    var userId ="";
    var displayName = "";
    var notes = "USER_TYPE: PIV";
    //console.log("authorized",authorized);

    var pivUserID, pivUserName,pivFirstName,pivLastName,pivDisplayName;
    var pivinfo=req.connection.getPeerCertificate().subject;
    //console.log(pivinfo);

    if(pivinfo != undefined && (pivinfo.UID != undefined || pivinfo.CN != undefined)){

        if(pivinfo.UID != undefined){
            pivUserID = pivinfo.UID.substr(0,pivinfo.UID.indexOf(' '));
            pivUserName = pivinfo.UID.substring(pivinfo.UID.indexOf('CN=')+3, pivinfo.UID.indexOf('-A')-1);
            pivFirstName = pivUserName.substring(0,pivUserName.indexOf(' '));
            pivLastName = pivUserName.substring(pivUserName.lastIndexOf(' '));
            pivDisplayName = pivFirstName +pivLastName;
            
        } else if(pivinfo.CN != undefined){
            pivUserID = pivinfo.CN.substring(pivinfo.CN.indexOf('ID=')+3);
            pivUserName = pivinfo.CN.substring(0, pivinfo.CN.indexOf('-A')-1);
            pivFirstName = pivUserName.substring(0,pivUserName.indexOf(' '));
            pivLastName = pivUserName.substring(pivUserName.lastIndexOf(' '));
            pivDisplayName = pivFirstName +pivLastName;
        }

        User.findOne({'id': pivUserID}, function(err, user) {
            if (err) {
                return err
            }
            else if(user){
                if(authorized){
                    user.lastLogin = new Date();
                    user.save(function(err) {
                        if (err){
                            throw err;
                        } else {
                             req.logIn(user, function(err) {
                                if(err) {return next(err);}
                                res.send({success:true, user:user});
                            })
                        }
                    });
                    userId = user._id;
                    displayName = user.displayName;

                    auditLog.add(type,userId,displayName,notes);
                   
                  
                }  else{
                res.send({success:false});
                //console.log(req.connection.authorizationError);
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
                newUser.provider = 'piv';
                newUser.lastLogin = new Date();

                newUser.save(function(err){
                    if (err){
                            throw err;
                        } else{
                            req.logIn(newUser, function(err) {
                                if(err) {return next(err);}
                                res.send({success:true, user:newUser});
                            })

                        }       
                });

                userId = newUser._id;
                displayName = newUser.displayName;

                auditLog.add(type,userId,displayName,notes);
               
                
            }
        });      
    }

    else
    {
        //console.log("Failed: No CN or UID field");
        res.send({success:false});
    }
     
};


