const express = require('express');
const cors = require('cors');
const User = require('../src/models/User');
const generateToken = require('./common/generateToken');
const bcrypt = require('bcryptjs');
const authorization = require('./middlewares/authorization');

const app = express();

app.use(express.json());
app.use(cors());

const port = 2000;

app.get('/clients', authorization, async (req, res) => {
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
      message: 'Login válido!',
      auth: true,
      token,
      user,
   });
});

app.listen(port, () => {
   console.log(`Server running on localhost:${port}`);
});
