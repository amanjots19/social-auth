const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy
const GithubStrategy = require('passport-github2').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const config = require('../config.json')

module.exports = function(passport) {
    passport.use('google-signup',new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL:'http://localhost:3000/auth/google/callback',
        passReqToCallback:true
    },
    async (request,accessToken,refreshToken,profile,done)=>{
        try{
            let user = await User.findOne({authId:profile.id})
            if(user){
                done(null,user)
            }else{
                    const newUser = new User({
                    authId:profile.id,
                    name: profile.displayName,
                    email:profile.emails[0].value
                })
                console.log(profile)
                user = await User.create(newUser);
                done(null,user)
            }

        }catch(e){
            console.log(e);
        }
    }));

    passport.use('facebook-signup',new FacebookStrategy({
        clientID: config.FACEBOOK_CLIENT_ID,
        clientSecret: config.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields : ['id', 'email', 'name']
    },
    async (request,accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        try{
            let user = await User.findOne({authId:profile.id})
            if(user){
                done(null,user)
            }else{
                    const newUser = new User({
                    authId:profile.id,
                    name: profile._json.first_name + " " + profile._json.last_name,
                    email:profile.emails[0].value
                })
                console.log(profile)
                user = await User.create(newUser);
                done(null,user)
            }

        }catch(e){
            console.log(e);
        }
    }));
    passport.use('linkedin-signup',new LinkedinStrategy({
        clientID: config.LINKEDIN_CLIENT_ID,
        clientSecret: config.LINKEDIN_CLIENT_SECRET,
        callbackURL:'http://localhost:3000/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_liteprofile']
    },
    async (request,accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        try{
            let user = await User.findOne({authId:profile.id})
            if(user){
                done(null,user)
            }else{
                    const newUser = new User({
                    authId:profile.id,
                    name: profile.username
                })
                console.log(profile)
                user = await User.create(newUser);
                done(null,user)
            }

        }catch(e){
            console.log(e);
        }
    }));
    passport.use('github-signup',new GithubStrategy({
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    async (request,accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        try{
            let user = await User.findOne({authId:profile.id})
            if(user){
                done(null,user)
            }else{
                    const newUser = new User({
                    authId:profile.id,
                    name: profile.username,
                })
                console.log(profile)
                user = await User.create(newUser);
                done(null,user)
            }

        }catch(e){
            console.log(e);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => {
          done(err, user);
        });
      });
}

