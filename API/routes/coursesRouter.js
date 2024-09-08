import express from "express";
import coursesController from "../controllers/coursesController.js";

const router = express.Router();

router.get("/", coursesController.index);
router.get("/:id", coursesController.details);
router.post("/", coursesController.store);
router.patch("/:id", coursesController.update);
router.delete("/:id", coursesController.delete);

export default router;
