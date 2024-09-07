import mongoose from "../dbConfig.js";

const courseSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
