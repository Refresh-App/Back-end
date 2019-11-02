const authRouter = require("express").Router();
const axios = require("axios");
const jwt = require(_jwt);

//database Model
const dbModel = require("./authModel");
//Encryption Authentication
const bcrypt = require("bcrypt");
const HashFactor = parseInt(process.env.HASH) || 10;

//User Input Validation
const validateNewUser = require("./validation/register");
const validateLogin = require("./validation/login");

//GitHub
const gitID = process.env.GITHUB_CLIENT_ID;
const gitSecret = process.env.GITHUB_CLIENT_SECRET;
const gitRedirect = "https://apidevnow.com/gitAuth";
//Maybe one Wan'ts to register with Github, thats nice
authRouter.get("/gitAuth", (req, res) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: gitId,
        clientSecret: gitSecret,
        callbackURL: gitRedirect
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ githubId: profile.id }, function(err, user) {
          console.log("error", err, "User", user);
          console.log(cb(err, user));
          res.status(200).json({ message: "test complete" });
        });
      }
    )
  );
});

//Register ->Requires{username:'',password:''}
authRouter.post("/register", validateNewUser, (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, HashFactor);
  user.password = hash;
  dbModel
    .addUser(user)
    .then(newUser => {
      //Just to Besure
      delete newUser.password;
      payload = {
        ...newUser,
        token_type: "Basic ",
        token: jwt.genToken(newUser)
      };
      console.log("payload", payload);
      res.status(201).send({ message: "Welcome da the Club Yo!", ...payload });
    })
    .catch(err => res.status(400).json({ errors: err }));
});

//Register ->Requires{username:'',password:''}
authRouter.post("/login", validateLogin, (req, res) => {
  const { password } = req.body;
  const user = req.user;
  if (user && bcrypt.compareSync(password, user.password)) {
    delete user.password;
    payload = {
      ...user,
      token_type: "Basic ",
      token: jwt.genToken(user)
    };
    res.status(200).json({ message: "Login Success", ...payload });
  } else {
    res
      .status(401)
      .json({ errors: [{ password: "Invalid Username Or Password" }] });
  }
});

module.exports = authRouter;
