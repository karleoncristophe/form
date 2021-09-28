const mongoose = require('../libs/Mongoose');

const TokenSchema = new mongoose.Schema(
   {
      user: {
         type: String,
         required: true,
      },
      token: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: {
         createdAt: 'createdAt',
         updatedAt: 'updatedAt',
      },
   }
);

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
