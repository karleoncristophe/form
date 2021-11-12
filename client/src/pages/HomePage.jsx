import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageUpload from '../common/ImageUpload';
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

const LogIn = () => {
  const [user, setUser] = useState('');
  // eslint-disable-next-line
  const [state, setState] = useState({});

  useEffect(() => {
    const getInformations = async () => {
      const { data } = await api.get('me');

      setUser(data);
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
        <Text>Id: {user?._id}</Text>
        <Text>Name: {user?.name}</Text>
        <Text>Email: {user?.email}</Text>
      </InformatiosContent>
      <ImageUpload />
    </Container>
  );
};

export default LogIn;
