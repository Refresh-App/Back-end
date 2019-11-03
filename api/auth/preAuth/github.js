const gitHubRouter = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

//Config GitHub Auth
const gitId = process.env.GITHUB_CLIENT_ID;
const gitSecret = process.env.GITHUB_CLIENT_SECRET;
const gitRedirect = "https://apidevnow.com/gitAuth";

//Define User Object
const User = require('../authModel')

//Declare Strategy Vars
passport.use(
  new GitHubStrategy(
    {
      clientID: gitId,
      clientSecret: gitSecret,
      callbackURL: gitRedirect
    },
    function(accessToken, refreshToken, profile, next) {
        console.log('Profile',  profile)
        console.log('accessToken',  accessToken)
        console.log('refreshToken',  refreshToken)
      User.addUser({ username: profile.id,password:'333444' },(err,user)=>{
        next()
      })
        
    }
  )
);


gitHubRouter.get( "/",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
      console.log('req',req)
    // Successful authentication, redirect home.
    res.send("Working");
  }
);

module.exports = gitHubRouter;
