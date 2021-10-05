const express = require('express');
const cors = require('cors');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('./common/generateToken');
const authenticate = require('./middlewares/authenticate');

const app = express();

app.use(express.json());
app.use(cors());
const port = 4000;

//  endpoints for users
app.get('/users', async (req, res) => {
   const name = await User.find().sort({ createdAt: 1 });
   res.send(name);
});

app.get('/me', authenticate, async (req, res) => {
   const user = await User.findOne({ _id: req.logged });
   res.status(200).send(user);
});

app.post('/users', async (req, res) => {
   const { name, email, password } = req.body;

   if (await User.findOne({ email })) {
      res.status(400).send({
         error: 'Já existe um usuário cadastrado com esse email.',
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
         message: 'Erro ao processar seus dados.',
         error: e,
      });
   }
});

app.put('/users/:id', authenticate, async (req, res) => {
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
         error: 'Erro ao atualizar',
      });
   }
});

app.post('/login', async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email }).select('+password');

   if (!user) {
      res.status(400).send({
         error: 'Usuário não cadastrado.',
      });
   }

   const match = await bcrypt.compare(password, user.password);

   if (!match) {
      res.status(400).send({
         error: 'Senha inválida.',
      });
   }

   const token = generateToken({ id: user.id });

   res.status(201).send({
      token,
      user,
   });
});

const server = app.listen(port, () => {
   console.log(`Example app listening at localhost:${port}`);
});
