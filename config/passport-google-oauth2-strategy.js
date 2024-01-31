const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');

// tell passport to use new stretegy for google login

passport.use(new googleStrategy({
        clientID: '352545805766-6asvhdp09l3sp6sau3oss03tdskkn9b6.apps.googleusercontent.com',

        clientSecret: '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',

        callbackURL: 'http://localhost:5000/auth/google/callback',
        passReqToCallback: true,

    },
    async function(request, accessToken, refreseToken, profile, done) {
        // console.log(profile);
        // find user
        try {
            const user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                return done(null, user);
            }
            if (!user) {
                // if not found, creat user and set it as req.user
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                if (newUser) {
                    return done(null, newUser);
                }

            }

        } catch (error) {
            console.log('error in google strategy passport', error);
        }


    }
));
module.exports = passport;