import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;
const usersController = {
    index: async (req, res) => {
        const user = await User.findOne({ username: req.query.username, password: req.query.password });
        // console.log(user);

        if (user) {
            // res.json({ secretKey });
            const accessToken = jwt.sign({ user }, secretKey, { expiresIn: '1d' });
            const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: '10d' });
            res.json({ user, accessToken, refreshToken });
        } else {
            // console.log('yse');
            res.status(401).json({ message: 'Invalid username or password' });
        }
        // res.json({ hi: true });
    },
    list: async (req, res) => {
        const users = await User.find({});
        res.json(users);
    },
    listDeleted: async (req, res) => {
        const users = await User.findDeleted({});
        res.json(users);
    },
    details: async (req, res) => {
        const users = await User.find({ _id: req.params.id });
        res.json({ users, userAuth: req.user });
        // res.json({ no: true });
    },
    update: async (req, res) => {
        const userUpdate = await User.updateOne({ _id: req.params.id }, { $set: req.body });
        res.json(userUpdate);
    },
    delete: async (req, res) => {
        const userDeleteId = req.params.id;
        const userDelete = await User.delete({ _id: userDeleteId });

        res.json(userDelete);
    },
    deleteForever: async (req, res) => {
        const userDeleteId = req.params.id;
        const userDelete = await User.deleteOne({ _id: userDeleteId });

        res.json(userDelete);
    },
    restore: async (req, res) => {
        const userDeleteId = req.params.id;
        const userRestored = await User.findOneAndUpdateDeleted(
            { _id: userDeleteId },
            {
                deleted: false,
            },
        );

        res.json(userRestored);
    },

    // protected methods
    store: async (req, res) => {
        const newUser = await User.create(req.body);
        res.json({ message: 'User registered successfully', newUser });
    },
};

export default usersController;
