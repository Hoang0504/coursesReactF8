import mongoose from '../dbConfig.js';
import mongooseDelate from 'mongoose-delete';

const userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
    },
    { timestamps: true },
);

userSchema.plugin(mongooseDelate, {
    deleted: true,
    deletedAt: true,
    overrideMethods: 'all',
});

const User = mongoose.model('User', userSchema);

export default User;
