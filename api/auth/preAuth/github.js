const gitHubRouter = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

//Config GitHub Auth
const gitId = process.env.GITHUB_CLIENT_ID;
const gitSecret = process.env.GITHUB_CLIENT_SECRET;
const gitRedirect = "https://apidevnow.com/gitAuth";

//Declare Strategy Vars
passport.use(
  new GitHubStrategy(
    {
      clientID: gitId,
      clientSecret: gitSecret,
      callbackURL: gitRedirect
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log('Profile',  profile)
        console.log('accessToken',  accessToken)
        console.log('refreshToken',  refreshToken)
      User.findOrCreate({ githubId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);


gitHubRouter.get(
  "/",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send("Working");
  }
);

module.exports = gitHubRouter;
