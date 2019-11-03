const gitHubRouter = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
//Config Secrets
const gitId = process.env.GITHUB_CLIENT_ID;
const gitSecret = process.env.GITHUB_CLIENT_SECRET;
const gitRedirect = "https://apidevnow.com/gitAuth";

//Declare Strategy Vars
passport.use(
  new GitHubStrategy(
    {
      clientID: "f248d7c7a624257a6899",
      clientSecret: "65122c45ab73f1f1620de07459e818a658f3b862",
      callbackURL: "https://apidevnow.com/gitAuth"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ githubId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);

gitHubRouter.get("/gitAuth", passport.authenticate("github"));

gitHubRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send("Working");
  }
);

module.exports = gitHubRouter;
