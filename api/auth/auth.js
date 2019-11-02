const authRouter = require("express").Router();
const axios = require('axios')
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
const gitId = process.env.GITHUB_CLIENT_ID;
const gitSecret = process.env.GITHUB_CLIENT_SECRET;

//Maybe one Wan'ts to register with Github, thats nice
app.get("/gitAuth", (req, res) => {
  console.log('req',req)
  const requestToken = req.query.code;
  axios.post(
 `https://github.com/login/oauth/access_token?client_id=${gitID}&client_secret=${gitSecret}&code=${requestToken}`,
  ).then(response => {
    console.log('response')
    const accessToken = response.data.access_token;
    res.redirect(`/welcome.html?access_token=${accessToken}`);
  });
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
