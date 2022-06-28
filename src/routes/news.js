const express = require("express");
const route = express.Router();

const newController = require("../app/controllers/newController");

route.get("/", newController.index);

module.exports = route;
