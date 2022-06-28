const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const POST = process.env.POST || 5000;
require("dotenv").config();
const app = express();

// middleware
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// set view engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// init router
const router = require("./routes");
router(app);

// use library
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));

// connect db
const db = require("./config/db");
db.connect();

app.listen(POST, () => {
    console.log(`Server is running at http://localhost:${POST}`);
});
