const gitHubRouter = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
res.send('')
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


gitHubRouter.get('/gitAuth',(req,res,next)=>{
  passport.authenticate("github",(err,user,info)=>{
    console.log('user', user, err, info )
    res.json(user,err,info)
  })
 
});

module.exports = gitHubRouter;



