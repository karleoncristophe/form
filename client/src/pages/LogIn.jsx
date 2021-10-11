import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { Checkbox, message } from 'antd';

const Conteiner = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100vw;
   height: 100vh;
   background: #e0e0e0;
   background-size: cover;
`;

const SignInContent = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 600px;
   height: 700px;
   border-radius: 15px;
   background: white;
   box-shadow: 10px 5px 5px -1px gray;
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

const Title = styled.span`
   font-size: 2.8rem;

   font-weight: 400;
`;

const SubTitle = styled.span`
   font-size: 1rem;
   margin-bottom: 20px;
   font-weight: 400;
   color: #302f2f;
`;

const TextInput = styled.span`
   font-size: 1.2rem;
   color: #5a5858;
`;

const Input = styled.input`
   margin-top: 8px;
   margin-bottom: 10px;
   height: 50px;
   width: 100%;
   /* border-radius: 5px; */
   font-size: 1rem;
   padding: 10px;
   outline: none;
   background: none;
   border: 1.5px solid#ffa500;
   border-top: none;
   border-right: none;
   border-left: none;
`;

const SignIn = styled.button`
   border: none;
   height: 55px;
   width: 100%;
   border-radius: 15px;
   margin-top: 30px;
   background: #ffa500;
   font-size: 1.2rem;
   box-shadow: 0px 5px 5px -1px gray;
   color: #ffff;

   &&:hover {
      transition: 1s;
      transform: translateY(-3px);
      background: #bb7e0c;
   }
`;

const SignUp = styled.button`
   border: none;
   height: 55px;
   width: 100%;
   border-radius: 15px;
   margin-top: 20px;
   background: #ffffff;
   font-size: 1.2rem;
   color: #ffa500;

   &&:hover {
      background: #ffa500;
      transform: translateY(-3px);
      transition: 1s;
      box-shadow: 0px 5px 5px -1px gray;
      color: #ffffff;
   }
`;

const CheckContent = styled.div`
   display: flex;
   justify-content: space-between;
   margin-top: 10px;
`;

const CheckboxInput = styled(Checkbox)`
   font-size: 1rem;
`;

const Span = styled.span`
   font-size: 1rem;
   color: #ffa500;
`;

const CreateAccountContent = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   margin-top: 20px;
`;

const CreateAccount = styled.span`
   font-size: 1rem;
   font-family: Arial, Helvetica, sans-serif;
   padding: 0px 13px 0px 13px;
   color: #5a5858;
`;

const Line = styled.div`
   display: flex;
   width: 30%;
   height: 1px;
   background: #bebaba;
`;

const LogIn = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const clear = () => {
      setEmail('');
      setPassword('');
   };
   const onChange = e => {
      console.log(`checked = ${e.target.checked}`);
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
      <Conteiner>
         <SignInContent>
            <GetStartedContent>
               <Title>Sign In</Title>
               <SubTitle>Welcome, we missed you!</SubTitle>
               <TextInput>Your Email</TextInput>
               <Input
                  autoFocus
                  placeholder="Enter you "
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
               <TextInput>Password</TextInput>
               <Input
                  type="password"
                  placeholder="Enter you password."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
               <CheckContent>
                  <CheckboxInput onChange={onChange}>
                     {' '}
                     Remember me
                  </CheckboxInput>
                  <Span>Forgot Password?</Span>
               </CheckContent>

               <Link to="/homePage">
                  <SignIn
                     disabled={email === '' || password === ''}
                     onClick={submit}
                  >
                     Sign In
                  </SignIn>
               </Link>

               <CreateAccountContent>
                  <Line />
                  <CreateAccount>or create account</CreateAccount>
                  <Line />
               </CreateAccountContent>
               <Link to="/createAccount">
                  <SignUp disabled={email !== '' || password !== ''}>
                     Sign Up
                  </SignUp>
               </Link>
            </GetStartedContent>
         </SignInContent>
      </Conteiner>
   );
};

export default LogIn;
