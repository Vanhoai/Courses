const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const CourseSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        slug: { type: String, slug: "name", unique: true },
        videoID: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// add plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Course", CourseSchema);
