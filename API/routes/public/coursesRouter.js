import express from 'express';
import coursesController from '../../controllers/coursesController.js';

const router = express.Router();

router.get('/:id', coursesController.details);
router.get('/', coursesController.index);

export default router;
