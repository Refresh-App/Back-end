const facebookRouter = require("express").Router();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

//Config facebook Auth
const fbId = process.env.FACEBOOK_APP_ID;
const fbSecret = process.env.FACEBOOK_CLIENT_SECRET;
const fbRedirect = "https://apidevnow.com/facebookAuth/return";

//Bring in the userModel
const User = require("../authModel");

//InitialIze PassPort
facebookRouter.use(passport.initialize());
//Declare Strategy Vars
passport.use(
  new FacebookStrategy(
    {
      clientID: fbId,
      clientSecret: fbSecret,
      callbackURL: fbRedirect,
      profileFields: ['id', 'displayName', 'name', 'photos', 'email'],
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      done(null, profile, accessToken);
    }
  )
);

//Facebook Login URL
facebookRouter.get("/", passport.authenticate("facebook"));

//facebook Call Back
facebookRouter.get("/return",
  passport.authenticate("facebook", {
    scope: ['email'],
    failureRedirect: "/login",
    session: false
    
  }),
  (req, res) => {
    console.log("req", req.user);
    delete req.user._raw
    const setToken = `
    <h1>Thank You ${req.user.displayName}
    <script>
      (function(){
        window.opener.postMessage('${JSON.stringify(req.user)}', "*");
        window.close()
      })()
    </script>`
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(setToken))
  });

  facebookRouter.get("/terms", (req,res) =>{
    res.status(200).json({message:'You agree to protect your data to the best of our known abilities, but, will be held liable for nothing'});
  });

module.exports = facebookRouter;
