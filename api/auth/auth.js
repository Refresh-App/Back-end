const authRouter = require('express').Router()
const jwt = require(_jwt)

//database Model
const dbModel = require('./authModel')
//Encryption Authentication
const bcrypt = require('bcrypt')
const HashFactor = parseInt(process.env.HASH) || 10

//Validation
const validateNewUser = require('./validation/register')
const validateLogin = require('./validation/login')

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
        console.log('payload',payload)
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

module.exports=authRouter