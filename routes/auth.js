const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/google',passport.authenticate('google-signup',{scope:['profile','email']}));

router.get('/google/callback',passport.authenticate('google-signup',{failureRedirect:'/'}),(req,res)=>{
    console.log("hello")
    res.redirect('/mainApp');
})

router.get('/facebook', passport.authenticate('facebook-signup'));

router.get('/facebook/callback',passport.authenticate('facebook-signup',{failureRedirect:'/'}),(req,res)=>{
    console.log("hello")
    res.redirect('/mainApp');
})
router.get('/linkedin', passport.authenticate('linkedin-signup'));

router.get('/linkedin/callback',passport.authenticate('linkedin-signup',{failureRedirect:'/'}),(req,res)=>{
    console.log("hello")
    res.redirect('/mainApp');
})
router.get('/github', passport.authenticate('github-signup',{ scope: [ 'user:email' ] }));

router.get('/github/callback',passport.authenticate('github-signup',{failureRedirect:'/'}),(req,res)=>{
    console.log("hello")
    res.redirect('/mainApp');
})

module.exports = router;