const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }
});


// Hash password before saving
userSchema.pre('save', async function () {

    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});


// Compare password
userSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password);

};


// Generate JWT token
userSchema.methods.generateAuthToken = function () {

    const token = jwt.sign(
        {
            _id: this._id.toString()
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    return token;
};


const User = mongoose.model('User', userSchema);

module.exports = User;