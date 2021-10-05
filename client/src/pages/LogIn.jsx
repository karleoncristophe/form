import { useState } from 'react';
import { Link } from 'react-router-dom';
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

const GetStartedContent = styled.form`
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
   color: #ff3535;
`;

const SubTitle = styled.span`
   font-size: 1.2rem;
   color: #ffff;
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

const SignUp = styled.button`
   border: none;
   margin-right: 20px;
   height: 65px;
   width: 200px;
   border-radius: 15px;
   background: #ff2a2a;
   font-size: 1.2rem;
   color: #ffff;

   &&:hover {
      background: #ffffff;
      transition: 1s;
      color: #ff2a2a;
   }
`;

const SignIn = styled.button`
   border: none;
   height: 65px;
   width: 200px;
   border-radius: 15px;
   background: #fdfdfd;
   font-size: 1.2rem;
   color: #e43131;

   &&:hover {
      background: #ff2a2a;
      transition: 1s;
      color: #ffffff;
   }
`;

const LogIn = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const clear = () => {
      setEmail('');
      setPassword('');
   };

   const submit = async () => {
      const body = {
         email,
         password,
      };

      try {
         const { data } = await api.post('/login', body);
         if (!!data.error) {
            message.error(data.error);
         }

         localStorage.setItem('@form.token', data.token);
      } catch (e) {
         console.log(e);
      }
      clear();
   };

   return (
      <Container>
         <GetStartedContent>
            <Title>Get Started </Title>

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
               <Link to="/homePage">
                  <SignUp
                     disabled={email === '' || password === ''}
                     onClick={submit}
                  >
                     Sign Up
                  </SignUp>
               </Link>
               {email || password !== '' ? (
                  ''
               ) : (
                  <Link to="/createAccount">
                     <SignIn disabled={email !== '' || password !== ''}>
                        Sign In
                     </SignIn>
                  </Link>
               )}
            </ButtonContent>
         </GetStartedContent>
      </Container>
   );
};

export default LogIn;
