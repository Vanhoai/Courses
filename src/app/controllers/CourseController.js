const Course = require("../models/Course");
const { mongooseToObject } = require("../../utils/mongoose");

class CourseController {
    // [GET] /courses/:slug
    async show(req, res, next) {
        try {
            const slug = req.params.slug;
            const course = await Course.findOne({ slug: slug });
            console.log(course);
            console.log(req.params.slug);
            res.render("courses/show", { course: mongooseToObject(course) });
            // res.status(200).json(course);
        } catch (err) {
            next(err);
        }
    }

    // [GET] /courses/:id
    // async show(req, res, next) {
    //     try {
    //         const id = req.params.id;
    //         const course = await Course.findById({ _id: id });
    //         res.render("courses/show", { course: mongooseToObject(course) });
    //         // res.status(200).json(course);
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    // [GET] /courses/create
    async create(req, res, next) {
        res.render("courses/create");
    }

    // [POST] /courses/store
    async store(req, res, next) {
        try {
            // const course = new Course(req.body);
            // course.save();
            const course = await Course.create(req.body);
            // res.status(200).json(course);
            res.redirect("/");
        } catch (err) {
            next(err);
        }
    }

    // [GET] /courses/:id/edit
    async edit(req, res, next) {
        try {
            const id = req.params.id;
            const course = await Course.findById(id);
            res.render("courses/edit", {
                course: mongooseToObject(course),
            });
            // res.status(200).json(course);
        } catch (err) {
            next(err);
        }
    }

    // [PUT] /courses/:id
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const course = await Course.findByIdAndUpdate(id, req.body);
            console.log(course);
            res.redirect("/");
            // res.status(200).json(course);
        } catch (err) {
            next(err);
        }
    }

    // [DELETE] /courses/:id
    async destroy(req, res, next) {
        try {
            const id = req.params.id;
            const course = await Course.deleteOne({ _id: id });
            res.redirect("back");
            // res.status(200).json(course);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CourseController();
