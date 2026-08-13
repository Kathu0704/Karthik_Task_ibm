const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();


// Signup
router.post('/users', async (req, res) => {

    try {

        const user = new User(req.body);

        await user.save();

        const token = user.generateAuthToken();

        res.status(201).send({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {

        res.status(400).send({
            error: error.message
        });

    }
});


// Login
router.post('/users/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({
                error: 'Invalid email or password'
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).send({
                error: 'Invalid email or password'
            });
        }

        const token = user.generateAuthToken();

        res.send({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {

        res.status(500).send({
            error: error.message
        });

    }
});


// Get profile
router.get('/users/me', auth, async (req, res) => {

    res.send({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });

});


module.exports = router;