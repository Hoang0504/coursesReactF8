import express from "express";
import coursesController from "../controllers/coursesController.js";

const router = express.Router();

router.get("/", coursesController.index);
router.post("/", coursesController.store);
router.patch("/", coursesController.update);
router.delete("/", coursesController.delete);

export default router;
