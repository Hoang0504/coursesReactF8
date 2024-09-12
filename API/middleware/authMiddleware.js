import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    // res.json({ token, secretKey });
    if (!token) {
        req.isAuthenticated = false;
        return next();
    }

    // Verify token (you can use jwt.verify)
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden, invalid token' });
        }
        req.isAuthenticated = true;
        req.user = user;
        next(); // If token is valid, proceed to the route
    });
};

export { authenticateToken };
