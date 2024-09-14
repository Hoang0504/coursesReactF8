import express from 'express';
import usersController from '../../controllers/usersController.js';

const router = express.Router();

router.get('/:id', usersController.details);
router.get('/', usersController.index);
router.post('/', usersController.store);

export default router;
