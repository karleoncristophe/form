import { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import * as location from '../assets/icons/1055-world-locations.json';
import styled from 'styled-components';
import api from '../services/api';
import { message } from 'antd';

const Container = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100vw;
   height: 100vh;
`;
const CreateAccountContent = styled.form`
   display: flex;
   font-family: 'Acme', sans-serif;
   padding: 10px;
   flex-direction: column;
   background: #faebeb16;
   width: 500px;
   border-radius: 10px;
`;

const Title = styled.h1`
   font-size: 3em;
   font-weight: 400;
   color: red;
`;

const SubTitle = styled.span`
   font-size: 1.2rem;
   color: #ffffff;
`;

const Input = styled.input`
   margin-top: 8px;
   margin-bottom: 10px;
   height: 50px;
   width: 100%;
   border-radius: 5px;
   border: 1px solid #d4d4d4;
   font-size: 1rem;
   padding: 10px;
   outline: none;

   &&:hover {
      border: 1px solid #ff2a2a;
   }

   &&:focus {
      border: 2px solid #ff2a2a;
   }
`;

const ButtonContent = styled.div`
   margin-top: 40px;

   display: flex;
   justify-content: center;
`;

const GoToHome = styled.button`
   border: none;
   margin-right: 20px;
   height: 65px;
   width: 200px;
   border-radius: 15px;
   background: #ffffff;
   font-size: 1.2rem;
   color: #ff2a2a;

   &&:hover {
      background: #ff2a2a;
      transition: 1s;
      color: #ffffff;
   }
`;

const defaultLocation = {
   loop: true,
   autoplay: true,
   animationData: location.default,
   rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
   },
};

const CrateAccount = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);

   const submit = async () => {
      setLoading(true);

      const body = {
         name: `${name}`,
         email: `${email}`,
         password: `${password}`,
      };

      const { data } = await api.post('/users', body);

      if (data.email) {
         message.info('Conta criada com sucesso.');
      }

      if (!data.email) {
         message.error(data.error);
      }

      setLoading(false);
   };

   return (
      <Container>
         {loading ? (
            <Lottie options={defaultLocation} height={200} width={200} />
         ) : (
            <CreateAccountContent>
               <Title>Create Account </Title>
               <SubTitle>Name</SubTitle>
               <Input
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
               />
               <SubTitle>Email</SubTitle>
               <Input
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
               <SubTitle>Password</SubTitle>
               <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
               <ButtonContent>
                  <Link to="/">
                     <GoToHome onClick={submit}>Create Account</GoToHome>
                  </Link>
               </ButtonContent>
            </CreateAccountContent>
         )}
      </Container>
   );
};

export default CrateAccount;
