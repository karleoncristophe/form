import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import api from '../services/api';
const Container = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
`;

const InformatiosContent = styled.div``;

const Text = styled.p`
   color: #ffff;
   font-size: 2rem;
`;

const LogIn = () => {
   const [user, setUser] = useState([]);

   const fetchUsers = async () => {
      const response = await api.get('users');
      const data = await response.data;
      console.log(data);
      setUser(data);
   };

   useEffect(() => {
      fetchUsers();
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
