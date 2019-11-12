const facebookRouter = require("express").Router();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require('./jwt');

//Config facebook Auth
const fbId = process.env.FACEBOOK_APP_ID;
const fbSecret = process.env.FACEBOOK_CLIENT_SECRET;
const fbRedirect = "https://apidevnow.com/facebookAuth/return";

//Bring in the userModel and Data Scrubber
const User = require("../authModel");
const profileScrubber = require('../profileScrubber')
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
      enableProof: true
    },
    function(accessToken, refreshToken, profile, done) { 
      profile = profileScrubber(profile)
      delete profile._raw
      User.findOrCreateByEmail(profile)
      .then(res =>{
        console.log(res)//Expecting usr{email,id,pw}
        done(null, {...profile,user:{...res}}, accessToken)
      })
    }
  )
);

//Facebook Login URL
facebookRouter.get("/", passport.authenticate("facebook",{scope: ['email', 'public_profile']}));

//facebook Call Back
facebookRouter.get("/return",
  passport.authenticate("facebook", {failureRedirect: "/login",session:false }),
  (req, res) => {
    const token = jwt.genToken(req.user.email)
    const setToken = `
    <script>
        window.opener.postMessage('${JSON.stringify({...req.user,token})}', "*");
        window.close()
    </script>`
    res.set('Content-Type', 'text/html');
    res.send(setToken)
  })

  facebookRouter.get("/terms", (req,res) =>{
    res.status(200).json({message:'Pretty much, we use your email to create your account, if you want to disconnect from your registration median, select forgot password and you will be switched to our local auth stratagey. If you want to nuke your account, go to settings and click the nuke button. We will do our best to protect your data, however, where there is a will there is a way. That being said, we take zeor liablity for any data breaches. Your data may be used for internal and external purposes, but, mainly to improve our product for you.'});
  });

module.exports = facebookRouter;
