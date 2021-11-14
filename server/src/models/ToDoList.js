const mongoose = require('../libs/Mongoose');
const Schema = mongoose.Schema;

const TodoListSchema = new mongoose.Schema(
  {
    title: String,
    todo: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
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
