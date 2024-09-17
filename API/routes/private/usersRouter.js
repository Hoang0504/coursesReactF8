import express from 'express';
import usersController from '../../controllers/usersController.js';

const router = express.Router();

router.get('/list', usersController.list);
router.get('/list-deleted', usersController.listDeleted);
router.get('/:id', usersController.details);
router.get('/', usersController.index);
router.post('/', usersController.store);
router.put('/:id', usersController.update);
router.patch('/:id/restore', usersController.restore);
router.delete('/:id/delete-forever', usersController.deleteForever);
router.delete('/:id', usersController.delete);

export default router;
