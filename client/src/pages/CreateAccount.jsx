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
   background: #e0e0e0;
   background-size: cover;
`;

const SignInContent = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 600px;
   height: 600px;
   border-radius: 15px;
   background: white;
   box-shadow: 10px 5px 5px -1px gray;
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
   font-size: 1rem;
   padding: 10px;
   outline: none;
   background: none;
   border: 1.5px solid#ffa500;
   border-top: none;
   border-right: none;
   border-left: none;

   &&:focus {
      border: 2px solid#ffa500;
      border-radius: 10px;
   }

   &&:hover {
      border: 2px solid#ffa500;
      border-radius: 10px;
   }
`;

const GoToHome = styled.button`
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

      const { data } = await api.post('/createAccount', body);

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
         <SignInContent>
            {loading ? (
               <Lottie options={defaultLocation} height={200} width={200} />
            ) : (
               <CreateAccountContent>
                  <Title>Create Account </Title>
                  <SubTitle>Welcome!</SubTitle>
                  <TextInput>Name</TextInput>
                  <Input
                     autoFocus
                     placeholder="Type a Name"
                     value={name}
                     onChange={e => setName(e.target.value)}
                  />
                  <TextInput>Email</TextInput>
                  <Input
                     placeholder="Type a Email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                  />
                  <TextInput>Password</TextInput>
                  <Input
                     type="password"
                     placeholder="Type a Password"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                  />

                  <Link to="/">
                     <GoToHome onClick={submit}>Create Account</GoToHome>
                  </Link>
               </CreateAccountContent>
            )}
         </SignInContent>
      </Container>
   );
};

export default CrateAccount;
