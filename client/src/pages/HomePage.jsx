import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { message } from 'antd';
// import ImageUpload from '../common/ImageUpload';
import api from '../services/api';
import ToDoList from '../common/ToDoList';

const Container = styled.div`
  background: #3f3e3e;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  border-left: none;
  border-right: none;
  border-top: none;
`;

const Text = styled.p`
  color: #ffff;
  font-size: 2rem;
`;

const Input = styled.input``;

const TextArea = styled.textarea``;

const Button = styled.button``;

const LogIn = () => {
  const [me, setMe] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [toDoList, setToDoList] = useState([]);
  // eslint-disable-next-line
  const [state, setState] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(prev => !prev);
  };

  const handleDelete = async (id, e) => {
    await api.delete(`/deleteToDoList/${id}`);
    const deleteItem = await toDoList.filter(get => get._id !== id);
    setToDoList(deleteItem);
  };

  const handleUpdateName = async (id, e) => {
    const body = {
      name: name,
    };

    try {
      // eslint-disable-next-line
      const { data } = await api.put(`/updateUsers/${id}`, body);
      message.success('Updated username.');
    } catch (error) {
      message.error('Username not updated.');
    }
    setName('');
    window.location.reload();
  };

  const handleUpdateItem = async (id, e) => {
    const body = {
      title: editTitle,
      todo: editTodo,
    };

    try {
      // eslint-disable-next-line
      const { data } = await api.put(`/updateToDoList/${id}`, body);

      message.success('Updated list.');
    } catch (error) {
      message.error('List not updated.');
    }

    // editTitle('');
    // editTodo('');
  };

  const handleAddItem = async () => {
    const body = {
      title: title,
      todo: todo,
      user: me?._id,
    };

    try {
      // eslint-disable-next-line
      const { data } = await api.post('createToDoList', body);
      const newList = { title, todo };
      const addItem = toDoList;
      addItem.push(newList);
      setToDoList(addItem);
    } catch (error) {
      console.log(error);
    }
    setTitle('');
    setTodo('');
  };

  useEffect(() => {
    const getInformations = async () => {
      const { data } = await api.get('me');

      setMe(data);
    };
    getInformations();
    return () => {
      setState({}); // update an unmounted component
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getInformations = async () => {
      const { data } = await api.get('toDoList');

      setToDoList(data);
    };
    getInformations();
    return () => {
      setState({}); // update an unmounted component
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Content>
        <Text>Your Informations.</Text>
        <Text>Id: {me?._id}</Text>
        <Text>Name: {me?.name}</Text>
        <Text>Email: {me?.email}</Text>
      </Content>
      <Content>
        <Text>Update your name here.</Text>

        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Update your name here"
        />
        <Button
          onClick={e => handleUpdateName(me?._id, e)}
          disabled={name === ''}
        >
          Update
        </Button>
      </Content>

      <Content>
        <Text>To-do list</Text>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="List"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
        <Button onClick={handleAddItem} disabled={todo === '' || title === ''}>
          Add Item
        </Button>
        {toDoList?.map((data, index) => (
          <ToDoList
            key={data._id + index.toString()}
            data={data}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            openEdit={openEdit}
            handleDelete={handleDelete}
            handleOpenEdit={handleOpenEdit}
            handleUpdateItem={handleUpdateItem}
          />
        ))}
      </Content>
    </Container>
  );
};

export default LogIn;
