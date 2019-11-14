const primaryRouter = require("express").Router();

//Authentication
const jwt = require("./auth/preAuth/jwt");

//Bring in the Routes
const publicRouter = require("./public/server");
const privateRouter = require("./private/server");
const roleRouter = require("./public/roles/roles");

//Login, Register, GoogleAuth, FaceBookAuth, GitHubAuth
const authRouter = require("./auth/auth");

//Implement Routes
primaryRouter.use("/", authRouter);
primaryRouter.use("/public", publicRouter);
primaryRouter.use("/public/roles", roleRouter);
primaryRouter.use("/", jwt.chkToken(), privateRouter);

module.exports = primaryRouter;
