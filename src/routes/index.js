const newRoute = require("./news");
const siteRoute = require("./site");
const coursesRoute = require("./courses");
const meRoute = require("./me");

function routes(app) {
    app.use("/courses", coursesRoute);
    app.use("/new", newRoute);
    app.use("/me", meRoute);
    app.use("/", siteRoute);
}

module.exports = routes;
