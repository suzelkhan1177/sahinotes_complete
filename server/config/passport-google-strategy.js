const passport = require('passport');
const googleStrategy  = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const env = require("../environment");


passport.use(new googleStrategy({
    clientID:   env.CLIENT_ID,
    clientSecret:  env.CLIENT_Secret,
    callbackURL:  env.CALL_BACK_URL
},
function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy passport',err);
            return;
        }
    
        //if user is found
        if(user){
            return done(null,user);
        }
        // if not found, create the user and set it as req.user
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error in google strategy passport',err);
                    return;
                }
                return done(null,user);

            });
        }
    });
}
));
module.exports=passport;