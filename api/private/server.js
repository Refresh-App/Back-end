const privateRouter = require("express").Router();
const mailRouter = require("./mailer/sendMail");
const adminRouter = require("./admin/admin");
const userRouter = require("./users/users");
const rolesRouter = require("../public/roles/roles")


const jwt = require(_jwt);

privateRouter.use("/mailerYo", mailRouter);
privateRouter.use("/admin", jwt.chkRole(), adminRouter);
privateRouter.use("/users", userRouter);
privateRouter.use("/roles", rolesRouter);
module.exports = privateRouter;
