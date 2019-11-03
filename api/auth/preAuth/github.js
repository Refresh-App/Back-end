const gitHubRouter = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require('../authModel')
//Config GitHub Auth
const gitId = process.env.GITHUB_CLIENT_ID;
const gitSecret = process.env.GITHUB_CLIENT_SECRET;
const gitRedirect = "https://apidevnow.com/gitAuth";

//Define User Object
const User = {}
//Declare Strategy Vars
passport.use(
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
);


gitHubRouter.get( "/",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send("Working");
  }
);

module.exports = gitHubRouter;
