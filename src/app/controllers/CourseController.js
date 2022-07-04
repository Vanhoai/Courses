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
            res.redirect("/me/stored/courses");
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
            const course = await Course.delete({ _id: id });
            res.redirect("back");
            // res.status(200).json(course);
        } catch (err) {
            next(err);
        }
    }

    // [PATCH] /courses/:id/restore
    async restore(req, res, next) {
        try {
            const id = req.params.id;
            const course = await Course.restore({ _id: id });
            res.redirect("back");
            // res.status(200).json(course);
        } catch (err) {
            next(err);
        }
    }

    // [DELETE] /courses/:id/remove
    async remove(req, res, next) {
        try {
            const id = req.params.id;
            const course = await Course.deleteOne({ _id: id });
            res.redirect("back");
            // res.status(200).json(course);
        } catch (err) {
            next(err);
        }
    }

    // [POST] /courses/handle-form-action
    async handleFormAction(req, res, next) {
        try {
            const action = req.body.action;
            const ids = req.body.courseIds;
            switch (action) {
                case "delete":
                    await Course.delete({ _id: { $in: ids } });
                    res.redirect("/me/stored/courses");
                    // res.status(200).json("deleted successfully");
                    break;
                case "restore":
                    await Course.restore({ _id: { $in: ids } });
                    res.redirect("/me/stored/courses");

                    // em xinh nhu mot thien than <333

                    break;
                default:
                    res.status(400).json({
                        message: "Invalid action",
                    });
            }
            // res.status(200).json(req.body);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CourseController();
