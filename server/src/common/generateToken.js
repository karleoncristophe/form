require('dotenv').config();
const jwt = require('jsonwebtoken');

const APPKEY = process.env.APPKEY;

const generateToken = params => {
    return jwt.sign(params, APPKEY, {
        expiresIn: '100d',
    });
};

module.exports = generateToken;
