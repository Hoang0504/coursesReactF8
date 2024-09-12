import { authenticateToken } from '../middleware/authMiddleware.js';
import apiRouter from './apiRouter.js';

const route = (app) => {
    app.use('/api', authenticateToken, apiRouter);
};

export default route;
