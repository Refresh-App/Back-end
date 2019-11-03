const gitHubRouter = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

//Config GitHub Auth
const gitId = process.env.GITHUB_CLIENT_ID;
const gitSecret = process.env.GITHUB_CLIENT_SECRET;
const gitRedirect = "https://apidevnow.com/gitAuth";

//Bring in the user model
const User = require('../authModel')

//Declare Strategy Vars
passport.use((req,res,next) =>{
  new GitHubStrategy(
    {
      clientID: gitId,
      clientSecret: gitSecret,
      callbackURL: gitRedirect
    },
    function(accessToken, refreshToken, profile) {
        console.log('user',profile)
      User.addUser({ username: profile.id })
        .then(res.status(200).json({...profile}))
        .catch(res.status(200).json({...profile}))
    }
  )
});

const auth =  passport.authenticate("github", { failureRedirect: "/login" })
gitHubRouter.get( "/", auth,(req,res)=>{
    // Successful authentication, redirect home.
    res.send("Working");
  }
);

module.exports = gitHubRouter;
