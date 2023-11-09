const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: true
    },
    termsAndCondition: {
        type: Boolean,
        required: true
    }
});

// Hash and salt the password before saving to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.path('confirmPassword').validate(function (value) {
    return this.password === value;
}, 'Password and confirm password do not match');

const User = mongoose.model('User', userSchema);

module.exports = User;
