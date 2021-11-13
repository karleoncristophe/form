const routes = require('express').Router();
const USER = require('../models/User');
const IMAGE = require('../models/Image');
const TODOLIST = require('../models/ToDoList');
const bcrypt = require('bcryptjs');
const generateToken = require('../common/generateToken');
const multer = require('multer');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

// ==>> USERS ==>>
routes.get('/users', async (req, res) => {
  const users = await USER.find().sort({ createdAt: 1 });
  res.status(200).send(users);
});

routes.get('/me', authenticate, async (req, res) => {
  const me = await USER.findOne({ _id: req.logged });
  res.status(200).send(me);
});

routes.post('/createAccount', async (req, res) => {
  const { name, email, password } = req.body;

  if (await USER.findOne({ email })) {
    res.status(400).send({
      error: 'There is already a registered user with this email.',
    });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await USER.create({
      name,
      email,
      password: hash,
    });

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({
      message: 'Error processing your data.',
      error: e,
    });
  }
});

routes.delete('/deleteUser/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  const user = await USER.findById({ _id: id });

  await user.remove();

  return res.status(200).send({ message: 'Deleted image.' });
});

routes.put('/updateUsers/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const objects = { name: name };

  try {
    const updateData = await USER.findOneAndUpdate(
      {
        _id: id,
      },
      objects,
      { new: true }
    );

    res.status(200).send(updateData);
  } catch (error) {
    res.status(403).send({
      error: 'Error while updating.',
    });
  }
});

routes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await USER.findOne({ email }).select('+password');

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

// ==>> TODO LIST ==>>
routes.get('/toDoList', async (req, res) => {
  const todo = await TODOLIST.find().sort({ createdAt: 1 });
  res.status(200).send(todo);
});

routes.post('/createToDoList', async (req, res) => {
  const { title, todo } = req.body;

  try {
    const toDo = await TODOLIST.create({
      title,
      todo,
    });

    res.status(201).send(toDo);
  } catch (e) {
    res.status(400).send({
      message: 'Error creating list.',
      error: e,
    });
  }
});

routes.delete('/deleteToDoList/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  const todo = await TODOLIST.findById({ _id: id });

  await todo.remove();

  return res.status(200).send({ message: 'Deleted list.' });
});

routes.put('/updateToDoList/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, todo } = req.body;
  const objects = { title: title, todo: todo };

  try {
    const updateData = await TODOLIST.findOneAndUpdate(
      {
        _id: id,
      },
      objects,
      { new: true }
    );

    res.status(200).send(updateData);
  } catch (error) {
    res.status(403).send({
      error: 'Error while updating.',
    });
  }
});

// ==>> IMAGES ==>>
routes.get('/image', async (req, res) => {
  const image = await IMAGE.find().sort({ createdAt: 1 });
  res.status(200).send(image);
});

routes.get('/imageMe', async (req, res) => {
  const image = await IMAGE.findOne({ _id: req.logged });
  res.status(200).send(image);
});

routes.post(
  '/postImage',
  authenticate,
  multer(upload).single('file'),
  async (req, res) => {
    const { originalname: name, size, key, url = '' } = req.file;

    try {
      const image = await IMAGE.create({
        name,
        size,
        key,
        url,
      });
      res.status(201).send({
        image,
      });
    } catch (error) {
      res.status(400).send({
        error: 'Image was not posted.',
      });
    }
  }
);

routes.put('/updateImage/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { key } = req.body;
  const objects = { key: key };

  try {
    const updateData = await IMAGE.findOneAndUpdate(
      {
        _id: id,
      },
      objects,
      { new: true }
    );

    res.status(200).send(updateData);
  } catch (error) {
    res.status(403).send({
      error: 'Error while updating.',
    });
  }
});

routes.delete('/deleteImage/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  const image = await IMAGE.findById({ _id: id });

  await image.remove();

  return res.status(200).send({ message: 'Deleted image.' });
});

module.exports = routes;
