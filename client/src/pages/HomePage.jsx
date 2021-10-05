import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
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
   const [user, setUser] = useState();

   useEffect(() => {
      const getInformations = async () => {
         const { data } = await api.get('me');
         console.log(data);
         setUser(data);
      };
      getInformations();
   }, []);

   return (
      <Container>
         <InformatiosContent>
            <Text>Id: {user?._id}</Text>
            <Text>Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
         </InformatiosContent>
      </Container>
   );
};

export default LogIn;
