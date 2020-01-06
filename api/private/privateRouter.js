const privateRouter = require("express").Router();
const mailRouter = require("./mailer/sendMail");
const adminRouter = require("./admin/admin");
const answersRouter = require("./answers/answers");
const userRouter = require("./users/users");
const questionsRouter = require("./questions/questions");
const profileRouter = require("./profile/profile");
const missionRouter = require("./missions/missions");
const questionGroupsRouter = require("./questionsgroups/questionsGroups");
const userMissionsRouter = require("./user_missions/userMissions");
const inputTypesRouter = require('./input_type/input_type')
const iconsRouter=require('./icons/icons')
const teamsRouter=require('./teams/team')
const teamSubscriptionsRouter=require('./team_subscriptions/teamSubscription')
const pointsRouter=require('./points/points')
const rolesRouter = require("./roles/roles");
const jwt = require(_jwt);

//all routes https://apidevnow.com/<route>
privateRouter.use("/admin", jwt.chkRole(1), adminRouter);
privateRouter.use("/answers", answersRouter);
privateRouter.use("/mailerYo", mailRouter);
privateRouter.use("/missions", missionRouter);
privateRouter.use("/profile", profileRouter);
privateRouter.use("/users", userRouter);
privateRouter.use("/questions", questionsRouter);
privateRouter.use("/questiongroups", questionGroupsRouter);
privateRouter.use("/usermissions", userMissionsRouter);
privateRouter.use("/inputtypes", inputTypesRouter);
privateRouter.use("/icons", iconsRouter);
privateRouter.use('/teams',teamsRouter)
privateRouter.use('/team-subscriptions',teamSubscriptionsRouter)
privateRouter.use('/points',pointsRouter)
privateRouter.use('/roles',rolesRouter)

//Used For Documentation and Testing
privateRouter.routes = [
  ...adminRouter.routes,
  ...answersRouter.routes,
  ...missionRouter.routes,
  ...profileRouter.routes,
  ...userRouter.routes,
  ...questionsRouter.routes,
  ...questionGroupsRouter.routes,
  ...userMissionsRouter.routes,
  ...inputTypesRouter.routes,
  ...iconsRouter.routes,
  ...teamsRouter.routes,
  ...pointsRouter.routes,
  ...teamSubscriptionsRouter.routes,
  ...rolesRouter.routes
];

module.exports = privateRouter;
