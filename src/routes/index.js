const newRoute = require("./news");

function routes(app) {
    app.use("/new", newRoute);
}

module.exports = routes;
