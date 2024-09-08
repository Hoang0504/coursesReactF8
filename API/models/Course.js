import mongoose from "../dbConfig.js";
import mongooseDelate from "mongoose-delete";

const courseSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
  },
  { timestamps: true }
);

courseSchema.plugin(mongooseDelate, {
  deleted: true,
  deletedAt: true,
  overrideMethods: "all",
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
