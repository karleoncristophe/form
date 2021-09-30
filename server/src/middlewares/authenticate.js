const jwt = require('jsonwebtoken');
require('dotenv').config();

const APPKEY = process.env.APPKEY;

const authenticate = (req, res, next) => {
   const header = req.headers.authorization;

   if (header) {
      const token = header.replace('Bearer ', '');

      try {
         jwt.verify(token, APPKEY);
         return next();
      } catch (e) {
         next(res.status(400).send({ error: 'Acesso negado.' }));
      }
   }
};

module.exports = authenticate;
