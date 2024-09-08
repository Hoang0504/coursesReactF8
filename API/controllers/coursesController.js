import Course from "../models/Course.js";

const coursesController = {
  index: async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
  },
  details: async (req, res) => {
    const courses = await Course.find({ _id: req.params.id });
    res.json(courses);
  },
  store: async (req, res) => {
    const newCourse = await Course.create(req.body);
    res.json(newCourse);
  },
  update: async (req, res) => {
    const courseUpdate = await Course.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(courseUpdate);
  },
  delete: async (req, res) => {
    const courseDeleteId = req.params.id;

    const courseDelete = await Course.deleteOne({ _id: courseDeleteId });
    res.json(courseDelete);
  },
};

export default coursesController;
