const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const tokenTTL = process.env.TOKEN_TTL || '1d'
module.exports = {
  genToken,
  chkToken,
  chkRole
};

//Creates a new JWT Token
function genToken(user) {
  console.log("hasdhfpiohlewnrfodhjksmfns",user)
  const {user_id,userRoles} = user
  const payload = {
    tokenType: "Basic ",
    userId:user_id,
    userRoles
  };

  const options = {
    expiresIn: tokenTTL
  };

  return jwt.sign(payload, secret, options);
}

//Checks Role
function chkRole(role){
    return (req,res,next)=>{
        //Gets req.user from chkToken
        if(req.user && role === req.user.role){
            next()
        } else {
            next({token:'Invalid Access'})
        }
    }
}

//Verifies Existing Role and JWT token
function chkToken() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    //TOKEN
    token &&
      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          //Needs Time Validation
          next({ token: "Invalid Token, you will need to Log back in"})
        } else {
            req.user = {...req.user, decoded};
            next()
        }
      });
    //No Token, No Pass
    !token &&
    next({ token: "No Token Provided, you will need to Login" })
  };
}
