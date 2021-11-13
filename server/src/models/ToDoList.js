const mongoose = require('../libs/Mongoose');

const TodoListSchema = new mongoose.Schema(
  {
    title: String,
    todo: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const ToDoList = mongoose.model('ToDoList', TodoListSchema);

module.exports = ToDoList;
