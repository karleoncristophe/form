import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   width: 100vw;
   height: 100vh;
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
   const [user, setUser] = useState([]);

   const location = useLocation();
   // eslint-disable-next-line
   const dataEmail = location.state.token;

   const fetchUsers = async () => {
      const response = await api.get('clients');
      const data = await response.data;

      console.log(data);
      setUser(data);
   };

   useEffect(() => {
      fetchUsers();

      // eslint-disable-next-line
   }, []);

   return (
      <Container>
         {user?.map((item, index) => (
            <InformatiosContent key={item.id + index.toString()}>
               <Text>Id: {item._id}</Text>
               <Text>Name: {item.name}</Text>
               <Text>Email: {item.email}</Text>
            </InformatiosContent>
         ))}
      </Container>
   );
};

export default LogIn;
