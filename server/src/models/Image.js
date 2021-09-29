const mongoose = require('../libs/Mongoose');

const ImageSchema = new mongoose.Schema({
   name: String,
   description: String,
   image: {
      data: Buffer,
      contentType: String,
   },
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;
