const jwt = require('jsonwebtoken');
require('dotenv').config();

const APPKEY = process.env.APPKEY;

const authorization = (req, res, next) => {
   const header = req.headers.authorization;

   if (header) {
      const token = header.replace('Bearer ', '');

      try {
         jwt.verify(token, APPKEY);
         return next();
      } catch (e) {
         next(res.status(401).send({ error: 'Acesso negado.' }));
      }
   }
   next();
};

module.exports = authorization;
