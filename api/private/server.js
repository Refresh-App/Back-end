const privateRouter = require("express").Router();
const mailRouter = require("./mailer/sendMail");
const adminRouter = require("./admin/admin");
const userRouter = require("./users/users");
const rolesRouter = require("../public/roles/roles");
const questionsRouter = require("./questions/questions")


const jwt = require(_jwt);

privateRouter.use("/mailerYo", mailRouter);
privateRouter.use("/admin", jwt.chkRole(), adminRouter);
privateRouter.use("/users", userRouter);
privateRouter.use("/roles", rolesRouter);
privateRouter.use("/questions", questionsRouter);

module.exports = privateRouter;
