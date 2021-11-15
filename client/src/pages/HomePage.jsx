import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { message } from 'antd';
// import ImageUpload from '../common/ImageUpload';
import api from '../services/api';

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

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => (props.openEdit ? '100%' : '0px')};
  transition: all ease 0.5s;
  overflow: hidden;
`;

const LogIn = () => {
  const [me, setMe] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');
  const [toDoList, setToDoList] = useState([]);
  // eslint-disable-next-line
  const [state, setState] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(prev => !prev);
  };

  const handleDelete = async (id, e) => {
    await api.delete(`/deleteToDoList/${id}`);
  };

  const updateName = () => {
    const body = {
      name: name,
    };

    try {
      // eslint-disable-next-line
      const { data } = api.put(`/updateUsers/${me?._id}`, body);
      message.success('Updated username.');
    } catch (error) {
      message.error('Username not updated.');
    }
    setName('');
    window.location.reload();
  };

  const postToDoList = () => {
    const body = {
      title: title,
      todo: todo,
      user: me?._id,
    };

    try {
      // eslint-disable-next-line
      const { data } = api.post('createToDoList', body);
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
        <Button onClick={updateName} disabled={name === ''}>
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
        <Button onClick={postToDoList}>Add Item</Button>
        {toDoList?.slice().map((data, index) => (
          <Content key={data._id + index.toString()}>
            <Text>{data?.title}</Text>
            <Text>{data?.todo}</Text>
            <Button onClick={handleOpenEdit}>
              {openEdit ? 'Close Edit' : 'Open Edit'}
            </Button>
            <EditContent openEdit={openEdit}>
              <Input placeholder="Edit Title" />
              <Input placeholder="Edit List" />
              <Button onClick={handleOpenEdit}>Confirm Edit</Button>
            </EditContent>
            <Button onClick={e => handleDelete(data._id, e)}>
              Delete Item
            </Button>
          </Content>
        ))}
      </Content>
    </Container>
  );
};

export default LogIn;
