const express = require('express');
const cors = require('cors');
const User = require('../src/models/User');
const generateToken = require('./common/generateToken');
const bcrypt = require('bcryptjs');
const Image = require('../src/models/Image');
const fileUpload = require('express-fileupload');
const app = express();

app.use(express.json());
app.use(cors());

const port = 2000;

app.get('/users', async (req, res) => {
   const name = await User.find().sort({ createdAt: 1 });
   res.send(name);
});

app.post('/createAccount', async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const hash = await bcrypt.hash(password, 10);

      const user = await User.create({
         name,
         email,
         password: hash,
      });

      res.status(200).send(user);
   } catch (e) {
      console.log(e);
      res.status(400).send({
         message: 'Erro ao processar seus dados.',
         error: e,
      });
   }
});

app.post('/login', async (req, res) => {
   const { email, password } = req.body;

   console.log(req.body);

   const user = await User.findOne({ email }).select('+password');

   if (!user) {
      res.status(200).send({
         error: 'Usuário não cadastrado.',
      });
   }

   const match = await bcrypt.compare(password, user.password);

   if (!match) {
      res.status(200).send({
         error: 'Senha inválida.',
      });
   }

   const token = generateToken({ id: user.id });

   res.status(201).send({
      token,
      user,
   });
});

//upload image

app.use(
   fileUpload({
      limits: { filesize: 50 * 1024 * 1024 },
   })
);

app.get('/image/:id', async (req, res) => {
   const _id = req.params.id;
   try {
      const find = await Image.findById(_id).exec((err, rpta) => {
         res.set('Content-Type', rpta.image.contentType);

         res.status(200).send({ iamge: rpta.image.data, message: 'Sucesso' });
      });
   } catch (error) {
      res.status(200).send({ error: 'Error' });
   }
});

app.post('/uploadImage', (req, res) => {
   let image = req.files.variable;

   let data = {
      name: 'test name',
   };

   let Image = new Image(data);
   console.log(image);

   Image.image.data = req.files.variable.data;
   Image.image.contentType = req.files.variable.mimetype;

   Image.save((err, rpta) => {
      if (err) {
         res.json({
            err: err,
         });
      }
      res.json({
         result: image,
      });
   });
});

app.listen(port, () => {
   console.log(`Server running on localhost:${port}`);
});
