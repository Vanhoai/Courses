const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class CourseController {
    // [GET] /me/stored/courses
    async stored(req, res, next) {
        try {
            const courses = await Course.find({});
            res.render("me/stored", { courses: multipleMongooseToObject(courses) });
            // res.status(200).json(courses);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CourseController();
