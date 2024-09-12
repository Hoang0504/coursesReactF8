import express from 'express';
import cors from 'cors';
import route from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:3000', 'https://hoang0504.github.io'];

const corsOptions = {
    origin: (origin, callback) => {
        // Check if the request's origin is in the allowed origins list
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // If the origin is in the allowed list, or if there is no origin (for non-browser requests), allow the request
            callback(null, true);
        } else {
            // If the origin is not allowed, reject the request
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
route(app);

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
