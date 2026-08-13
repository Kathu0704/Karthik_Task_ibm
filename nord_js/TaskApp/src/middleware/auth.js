const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {

    try {

        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).send({
                error: 'Please authenticate'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).send({
                error: 'User not found'
            });
        }

        req.user = user;
        req.token = token;

        next();

    } catch (error) {

        res.status(401).send({
            error: 'Please authenticate'
        });

    }
};

module.exports = auth;