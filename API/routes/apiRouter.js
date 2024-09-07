import express from "express";
import coursesRouter from "./coursesRouter.js";

const router = express.Router();

router.use("/courses", coursesRouter);

export default router;
