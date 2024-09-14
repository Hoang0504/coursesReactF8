import { authenticateToken } from '../middleware/authMiddleware.js';
import coursesPublicRouter from './public/coursesRouter.js';
import userPublicPublicRouter from './public/usersRouter.js';
import coursesPrivateRouter from './private/coursesRouter.js';
import userPrivateRouter from './private/usersRouter.js';

const route = (app) => {
    // Public route
    app.use('/public/api/courses', coursesPublicRouter);
    app.use('/public/api/users', userPublicPublicRouter);

    // Private route
    app.use('/protected/api/courses', authenticateToken, coursesPrivateRouter);
    app.use('/protected/api/users', authenticateToken, userPrivateRouter);
};

export default route;
