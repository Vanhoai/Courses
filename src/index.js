const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const POST = process.env.POST || 5000;
require("dotenv").config();
const app = express();

// middleware
const SortMiddleware = require("./app/middlewares/SortMiddleware");

app.use(SortMiddleware);
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
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const currentType = field === sort.column ? sort.type : "default";

                const icons = {
                    default: "fas fa-sort",
                    asc: "fas fa-sort-amount-down",
                    desc: "fa-solid fa-arrow-down-short-wide",
                };

                const types = {
                    default: "desc",
                    asc: "desc",
                    desc: "asc",
                };

                const icon = icons[currentType];
                const type = types[currentType];

                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
            },
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(methodOverride("_method"));

// init router
const router = require("./routes");
router(app);

app.use(express.static(path.join(__dirname, "public")));
// HTTP logger
app.use(morgan("combined"));

// connect db
const db = require("./config/db");
db.connect({
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.listen(POST, () => {
    console.log(`Server is running at http://localhost:${POST}`);
});
