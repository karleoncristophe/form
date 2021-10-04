const jwt = require('jsonwebtoken');
require('dotenv').config();

const APPKEY = process.env.APPKEY;

const authorization = (req, res, next) => {
   const header = req.headers.authorization;

   if (header) {
      const decoded = jwt.verify(token, APPKEY);

      req.logged = decoded.id;
      return next();
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
