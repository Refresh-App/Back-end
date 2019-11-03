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


gitHubRouter.get('/gitAuth',async (req,res,next)=>{
    console.log('here')
  const cast = await passport.authenticate("github",(err,user,info)=>{
    cb()
  })
  console.log(cast)
 
});

module.exports = gitHubRouter;



