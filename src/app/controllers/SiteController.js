const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class SiteController {
    // [GET] /new
    async index(req, res, next) {
        try {
            let courses = await Course.find({});
            res.render("home", { courses: multipleMongooseToObject(courses) });
            // res.status(200).json(courses);
        } catch (err) {
            next(err);
        }
    }

    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
