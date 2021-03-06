const primaryRouter = require("express").Router();
const axios = require("axios");
const rootUrl =
    "https://" + process.env.ROOT_URL || "http://localhost:" + process.env.PORT;
//Middleware
const jwt = require("./auth/preAuth/jwt");
const docs = require("./public/docs/docProcessor");
const { routesToArray } = require("./auth/preAuth/catalogAgent");

//Bring in the Routes
const privateRouter = require("./private/privateRouter");
const docsRouter = require("./public/docs/docs");
const authRouter = require("./auth/auth");

//Global Route Catalog
primaryRouter.routeCatalog = {
    Authentication: [...authRouter.routes],
    Private_Routes: [...privateRouter.routes]
};
const { routeCatalog } = primaryRouter;

//Implement Routes
primaryRouter.use("/", authRouter);
primaryRouter.use(
    "/",
    jwt.chkToken(routeCatalog.Private_Routes),
    privateRouter
);

//Auto Documentation Genorated from routeCatalog
primaryRouter.use("/docs", docs.defaultDocs(routeCatalog), docsRouter);

//Used For Testing
primaryRouter.get("/testRoutes", async(req, res) => {
    const axiosCalls = [];
    const routes = routesToArray(routeCatalog);
    console.log(routes)
    routes.forEach(async route => {
        await axiosCalls.push(axios[route.method.toLowerCase()](rootUrl + route.route));
    });

    const resolved = [];
    await Promise.all(
        axiosCalls.map(async (p, i) =>
            await p.then(res => resolved.push({...res.data, ...routes[i] })).catch(() => undefined)
        )
    );
    console.log(axiosCalls)

    res.json(resolved);
});

module.exports = primaryRouter;