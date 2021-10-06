const routes = require('express').Router();
const User = require('../models/User');
const Image = require('../models/Image');
const bcrypt = require('bcryptjs');
const generateToken = require('../common/generateToken');
const multer = require('multer');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

routes.get('/users', async (req, res) => {
   const name = await User.find().sort({ createdAt: 1 });
   res.send(name);
});

routes.get('/me', authenticate, async (req, res) => {
   const user = await User.findOne({ _id: req.logged });
   res.status(200).send(user);
});

routes.post('/users', async (req, res) => {
   const { name, email, password } = req.body;

   if (await User.findOne({ email })) {
      res.status(400).send({
         error: 'There is already a registered user with this email.',
      });
   }

   try {
      const hash = await bcrypt.hash(password, 10);

      const user = await User.create({
         name,
         email,
         password: hash,
      });

      res.status(201).send(user);
   } catch (e) {
      console.log(e);
      res.status(400).send({
         message: 'Error processing your data.',
         error: e,
      });
   }
});

routes.delete('/deleteUser/:id', async (req, res) => {
   const { id } = req.params;

   const user = await User.findById({ _id: id });

   await user.remove();

   return res.status(200).send({ message: 'Deleted image.' });
});

routes.put('/users/:id', authenticate, async (req, res) => {
   const { id } = req.params;
   const { name } = req.body;
   const objects = { name: name };

   try {
      const updateData = await User.findOneAndUpdate(
         {
            _id: id,
         },
         objects,
         { new: true }
      );

      res.status(200).send(updateData);

      console.log(updateData);
   } catch (error) {
      res.status(403).send({
         error: 'Error while updating.',
      });
   }
});

routes.post('/login', async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email }).select('+password');

   if (!user) {
      res.status(400).send({
         error: 'User not registered.',
      });
   }

   const match = await bcrypt.compare(password, user.password);

   if (!match) {
      res.status(400).send({
         error: 'Invalid password.',
      });
   }

   const token = generateToken({ id: user.id });

   res.status(201).send({
      token,
      user,
   });
});

routes.get('/image', async (req, res) => {
   const image = await Image.find().sort({ createdAt: 1 });
   res.send(image);
});

routes.post('/postImage', multer(upload).single('file'), async (req, res) => {
   const { originalname: name, size, filename: key } = req.file;

   try {
      const uploadImage = await Image.create({
         name,
         size,
         key,
      });
      res.status(201).send({
         uploadImage,
      });
   } catch (error) {
      res.status(400).send({
         error: 'Image was not posted.',
      });
   }
});

routes.delete('/imageDelete/:id', async (req, res) => {
   const { id } = req.params;

   const image = await Image.findById({ _id: id });

   await image.remove();

   return res.status(200).send({ message: 'Deleted image.' });
});

module.exports = routes;
