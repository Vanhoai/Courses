const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class CourseController {
    // [GET] /me/stored/courses
    async stored(req, res, next) {
        try {
            let courses = await Course.find({});

            // http://localhost:5000/me/stored/courses?_sort&column=createdAt&type=asc
            if (req.query.hasOwnProperty("_sort")) {
                courses = courses.sort();
            }

            // chan em :>>>

            const count = await Course.countDocumentsDeleted({});
            res.render("me/stored", { courses: multipleMongooseToObject(courses), count });
            // res.status(200).json(courses);
        } catch (err) {
            next(err);
        }
    }

    // [GET] /me/trash/courses
    async trash(req, res, next) {
        try {
            const courses = await Course.findDeleted({});
            res.render("me/trash", {
                courses: multipleMongooseToObject(courses),
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CourseController();
