const express = require("express");
const route = express.Router();

const newController = require("../app/controllers/NewController");

route.get("/", newController.index);

module.exports = route;
