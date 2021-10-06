const mongoose = require('../libs/Mongoose');

const ImageSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      size: {
         type: Number,
         required: true,
      },
      key: {
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

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
