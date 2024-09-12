import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();
// const options = {
//     public: () => {
router.get('/:id', usersController.details);
router.get('/', usersController.index);
// },
// private: () => {
router.post('/', usersController.store);
//     },
// };

// export default { options, router };
export default router;
