require('dotenv').config();
const mongoose = require('mongoose');
const DB = process.env.DB;

const connect = async () => {
   try {
      const db = await mongoose.connect(DB, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log('Mongodb is connected!');
      return db;
   } catch (e) {
      console.log(e);
   }
};

connect();

module.exports = mongoose;
