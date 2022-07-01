const express = require("express");
const route = express.Router();

const courseController = require("../app/controllers/CourseController");

// [GET] /courses/create
route.get("/create", courseController.create);

// [GET] /courses/:slug
route.get("/:slug", courseController.show);

// [POST]  /courses/store
route.post("/store", courseController.store);

// [GET] /courses/:id/edit
route.get("/:id/edit", courseController.edit);

// [PUT] /courses/:id
route.put("/:id", courseController.update);

// [DELETE] /courses/:id
route.delete("/:id", courseController.destroy);

module.exports = route;
