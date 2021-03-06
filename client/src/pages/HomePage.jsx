import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { message, Drawer } from 'antd';
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
`;

const ContentList = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  align-items: center;
  height: 300px;
  ::-webkit-scrollbar {
    height: 10px;
    margin-top: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffffff;
    border-radius: 0.625rem;
  }
`;

const Title = styled.p`
  color: #ffffff;
  font-size: 2rem;
`;

const Text = styled.p`
  color: #000000;
  font-size: 1rem;
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
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line
  const [state, setState] = useState({});

  const handleLogout = () => {
    localStorage.removeItem('@form.token');
  };

  const handleAddItem = async () => {
    const body = {
      title: title,
      todo: todo,
      user: me?._id,
    };

    try {
      // eslint-disable-next-line
      const { postItem } = await api.post('createToDoList', body);
      const { data } = await api.get('toDoList');

      setToDoList(data);
    } catch (error) {
      console.log(error);
    }
    setTitle('');
    setTodo('');
  };

  const handleUpdateItem = async (id, e) => {
    const body = {
      title: editTitle,
      todo: editTodo,
    };

    try {
      if ((await editTitle) === '' || editTodo === '') {
        return message.warning('Unable to update! Please write something.');
      }
      // eslint-disable-next-line
      const { update } = await api.put(`/updateToDoList/${id}`, body);
      const { data } = await api.get('toDoList');
      setToDoList(data);
      message.success('Updated list.');
    } catch (error) {
      message.error('List not updated.');
    }

    setEditTitle('');
    setEditTodo('');
  };

  const handleUpdateName = async (id, e) => {
    const body = {
      name: name,
    };

    try {
      // eslint-disable-next-line
      const { update } = await api.put(`/updateUsers/${id}`, body);
      const { data } = await api.get('me');
      setMe(data);
      message.success('Updated username.');
    } catch (error) {
      message.error('Username not updated.');
    }
    setName('');
  };

  const handleDelete = async (id, e) => {
    try {
      await api.delete(`/deleteToDoList/${id}`);
      const { data } = await api.get('toDoList');
      setToDoList(data);
      message.success('Deleted list.');
    } catch (error) {
      message.error('Unable to delete list.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/deleteUser/${me._id}`);

      message.success('Deleted Account.');
    } catch (error) {
      message.error('Unable to delete account.');
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const getInformations = async () => {
      const { data } = await api.get('me');

      setMe(data);
    };
    getInformations();
    return () => {
      setState({});
    };
  }, []);

  useEffect(() => {
    const getInformations = async () => {
      const { data } = await api.get('toDoList');
      setToDoList(data);
    };

    getInformations();
    return () => {
      setState({});
    };
  }, []);

  return (
    <Container>
      <Button type="primary" onClick={showDrawer}>
        Open Profile
      </Button>
      <Drawer
        title="Your Informations"
        placement="left"
        onClose={onClose}
        visible={visible}
        width="400px"
      >
        <Content>
          <Content>
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
          <Link to="/">
            <Button
              onClick={handleLogout}
              style={{ marginTop: '20px', width: '100%' }}
            >
              logout
            </Button>
          </Link>{' '}
          <Link to="/">
            <Button
              onClick={handleDeleteAccount}
              style={{ marginTop: '10px', width: '100%', color: 'red' }}
            >
              Delete Account
            </Button>
          </Link>
        </Content>
      </Drawer>

      <Content>
        <Title>To-do list</Title>
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
        <ContentList>
          {toDoList?.map((data, index) => (
            <ToDoList
              key={data._id + index.toString()}
              data={data}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editTodo={editTodo}
              setEditTodo={setEditTodo}
              handleDelete={handleDelete}
              handleUpdateItem={handleUpdateItem}
            />
          ))}
        </ContentList>
      </Content>
    </Container>
  );
};

export default LogIn;
