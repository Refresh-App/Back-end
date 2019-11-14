const primaryRouter = require("express").Router();

//Authentication
const jwt = require("./auth/preAuth/jwt");

//Bring in the Routes
const privateRouter = require("./private/privateRouter");


//Login, Register, GoogleAuth, FaceBookAuth, GitHubAuth
const authRouter = require("./auth/auth");

//Implement Routes
primaryRouter.use("/", authRouter);
primaryRouter.use("/", rolesRouter);
primaryRouter.use("/", privateRouter);

module.exports = primaryRouter;
