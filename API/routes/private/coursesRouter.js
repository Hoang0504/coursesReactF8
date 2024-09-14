import express from 'express';
import coursesController from '../../controllers/coursesController.js';

const router = express.Router();

router.get('/list-deleted', coursesController.listDeleted);
router.get('/:id', coursesController.details);
router.get('/', coursesController.index);
router.post('/', coursesController.store);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id/delete-forever', coursesController.deleteForever);
router.delete('/:id', coursesController.delete);

export default router;
