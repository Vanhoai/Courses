const express = require("express");
const route = express.Router();

const meController = require("../app/controllers/MeController");

// [GET] /me/stored/courses
route.get("/stored/courses", meController.stored);
// [GET] /me/trash/courses
route.get("/trash/courses", meController.trash);

module.exports = route;
