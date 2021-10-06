const jwt = require('jsonwebtoken');
require('dotenv').config();

const APPKEY = process.env.APPKEY;

const authenticate = (req, res, next) => {
   const header = req.headers.authorization;

   if (header) {
      const token = header.replace('Bearer ', '');

      try {
         const decoded = jwt.verify(token, APPKEY);

         req.logged = decoded.id;

         return next();
      } catch (e) {
         next(res.status(401).send({ error: 'Access denied.' }));
      }
   }
   next();
};

module.exports = authenticate;
