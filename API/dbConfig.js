import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/f8Db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });

export default mongoose;
