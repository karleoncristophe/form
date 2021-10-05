const { isValidObjectId } = require('mongoose');
const mongoose = require('../libs/Mongoose');

const UserSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },

      email: {
         type: String,
         lowercase: true,
         unique: true,
      },

      password: {
         type: String,
         select: false,
      },
   },
   {
      timestamps: {
         createdAt: 'createdAt',
         updatedAt: 'updatedAt',
      },
   }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
