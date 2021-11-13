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

const InformatiosContent = styled.div`
  border: 1px solid red;
  border-left: none;
  border-right: none;
  border-top: none;
`;

const Text = styled.p`
  color: #ffff;
  font-size: 2rem;
`;

const UpdateUserContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  border-left: none;
  border-right: none;
  border-top: none;
`;

const Input = styled.input``;

const Button = styled.button``;

const DeleteUserContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  border-left: none;
  border-right: none;
  border-top: none;
  margin-top: 10px;
`;

const LogIn = () => {
  const [me, setMe] = useState('');
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [state, setState] = useState({});

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

  return (
    <Container>
      <InformatiosContent>
        <Text>Your Informations.</Text>
        <Text>Id: {me?._id}</Text>
        <Text>Name: {me?.name}</Text>
        <Text>Email: {me?.email}</Text>
      </InformatiosContent>
      <UpdateUserContent>
        <Text>Update your name here.</Text>

        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Update your name here"
        />
        <Button onClick={updateName} disabled={name === ''}>
          Update
        </Button>
      </UpdateUserContent>
      <DeleteUserContent>
        <Text>Delete User</Text>
        <Button>Delete</Button>
      </DeleteUserContent>
    </Container>
  );
};

export default LogIn;
