const publicRouter = require("express").Router();
const rolesRouter = require("./roles/roles")

publicRouter.use("/roles", rolesRouter);

module.exports = publicRouter;
