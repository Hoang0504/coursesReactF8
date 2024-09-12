import express from 'express';
import coursesRouter from './coursesRouter.js';
import usersRouter from './usersRouter.js';

const router = express.Router();
// const options = {
// public: () => {
router.use('/courses', coursesRouter);
router.use('/users', usersRouter);
// },
// private: () => {
// router.use('/users', usersRouter);
//     },
// };

export default router;
// export default { options, router };
