const primaryRouter = require("express").Router();

//Authentication
const jwt = require("./auth/preAuth/jwt");

//Bring in the Routes
const rolesRouter = require("./public/roles/roles");
const privateRouter = require("./private/server");


//Login, Register, GoogleAuth, FaceBookAuth, GitHubAuth
const authRouter = require("./auth/auth");

//Implement Routes
primaryRouter.use("/", authRouter);
primaryRouter.use("/roles", rolesRouter);
primaryRouter.use("/", privateRouter);

module.exports = primaryRouter;
