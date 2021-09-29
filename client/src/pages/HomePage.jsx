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

   console.log(user);

   useEffect(() => {
      const getInformations = async () => {
         try {
            const { data } = await api.get('users');
            setUser(data);
         } catch (error) {
            console.log(error);
         }
      };
      getInformations();
   }, []);

   return (
      <Container>
         <InformatiosContent>
            <Text>Id: {user?.id}</Text>
            <Text>Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
         </InformatiosContent>
      </Container>
   );
};

export default LogIn;
