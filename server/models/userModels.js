const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        required: true,
        default: 'User'
    },
    otp: {
        type: String,
        required: false
    },
    otpExpiry: {
        type: Date,
        required: false
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;