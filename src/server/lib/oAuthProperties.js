var properties = require('./envProperties');

module.exports = {
    authProperties : {

        'facebookAuth' : {   
            'clientID'      : properties.FACEBOOK_ID, 
            'clientSecret'  : properties.FACEBOOK_SECRET, 
            'callbackURL'   : properties.FACEBOOK_CALLBACK
        }

    }

};
