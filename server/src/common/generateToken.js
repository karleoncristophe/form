require('dotenv').config();
const jwt = require('jsonwebtoken');

const APPKEY = process.env.APPKEY;

const generateToken = params => {
  return jwt.sign(params, APPKEY, {
    expiresIn: '1d',
  });
};

module.exports = generateToken;
