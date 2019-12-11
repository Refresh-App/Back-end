const axios = require("axios");
const rootUrl =
  "https://" + process.env.ROOT_URL || "http://localhost:" + process.env.PORT;
module.exports = {
  docGen
};

function docGen(routes) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJCYXNpYyAiLCJ1c2VyX2lkIjoxMSwidXNlcl9yb2xlcyI6W3siaWQiOjJ9XSwiaWF0IjoxNTc1OTMyOTE2LCJleHAiOjE1NzY1Mzc3MTZ9.toMHY7uf9V00xcgWRaYXOZ6OVPJNX3-tJQd2Pn-6HnI";
  return (req, res, next) => {
    let newObj = {};
    Object.keys(routes).forEach(async routeGroup => {
      axiosCalls = [];
      routes[routeGroup].forEach((route, i) => {
        if (route.method === "DELETE") {
          axiosCalls.push(
            axios[route.method.toLowerCase()](rootUrl + route.route)
          );
        }
        if (route.method === "GET") {
         
          axiosCalls.push(
            axios[route.method.toLowerCase()](rootUrl + route.route, {
              headers: {
                Authorization: `${token}`
              }
            })
          );
        }
        if (route.method === "PUT") {
          axiosCalls.push(
            axios[route.method.toLowerCase()](
              rootUrl + route.route,
              route.expects,
              {
                headers: {
                  Authorization: `${token}`
                }
              }
            )
          );
        }
        if (route.method === "POST") {
          axiosCalls.push(
            axios[route.method.toLowerCase()](
              rootUrl + route.route,
              route.expects,
              {
                headers: {
                  Authorization: `${token}`
                }
              }
            )
          );
        }
      });
      const resolved = [];
      await Promise.all(
        axiosCalls.map((p, i) =>
          p
            .then(res =>
              resolved.push({ ...routes[routeGroup][i], returns: res.data })
            )
            .catch(() =>
              resolved.push({
                ...routes[routeGroup][i],
                returns: "Not Functioning"
              })
            )
        )
      );
      newObj[routeGroup] = resolved;
    });
    //New object Returned before Above is fully resolved
    req.routes = newObj;
    setTimeout(function() {
      next();
    }, 3000);
  };
}
