const gitHubRouter = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

//Config GitHub Auth
const gitId = process.env.GITHUB_CLIENT_ID;
const gitSecret = process.env.GITHUB_CLIENT_SECRET;
const gitRedirect = "https://apidevnow.com/gitAuthReturn";

//Bring in the userModel
const User = require("../authModel");

//InitialIze PassPort
passport.initialize()

//Declare Strategy Vars
passport.use(
  new GitHubStrategy(
    {
      clientID: gitId,
      clientSecret: gitSecret,
      callbackURL: gitRedirect
    },
    function(accessToken, refreshToken, profile, done) {
      User.addUser({ username: profile.id, password: "3334d44" })
        .then(res => {
          done(null, profile);
        })
        .catch(err => done(err));
    }
  )
);

gitHubRouter.get("/gitAuth", passport.authenticate("github"));

gitHubRouter.get(
  "/gitAuthReturn",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("req", req.uesr);
    res.json({ message: "logged in", ...req });
  }
);

module.exports = gitHubRouter;
