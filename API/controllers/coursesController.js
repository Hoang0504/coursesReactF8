import Course from "../models/Course.js";

const coursesController = {
  index: async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
  },
  store: async (req, res) => {
    const newCourse = await Course.create(req.body);
    res.json(newCourse);
  },
  update: async (req, res) => {
    const courseUpdate = await Course.updateOne(
      { _id: req.query.id },
      { $set: req.body }
    );
    res.json(courseUpdate);
  },
  delete: async (req, res) => {
    const courseDeleteId = req.query.id;
    const courseDelete = await Course.deleteOne({ _id: courseDeleteId });
    res.json(courseDelete);
  },
};

export default coursesController;
