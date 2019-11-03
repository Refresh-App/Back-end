const gitHubRouter = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

//Config GitHub Auth
const gitId = process.env.GITHUB_CLIENT_ID;
const gitSecret = process.env.GITHUB_CLIENT_SECRET;
const gitRedirect = "https://apidevnow.com/gitAuth";

//Bring in the userModel
const User = require('../authModel')

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
      User.addUser({ username: profile.id,password:'3334d44' },(err,user)=>{
        return cb(err, user);
      })  
    }
  )
);

app.get('/gitAuth', passport.authenticate('github'));

app.get('/gitAuth', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('req',req)
    res.json(req);
  });

module.exports = gitHubRouter;



