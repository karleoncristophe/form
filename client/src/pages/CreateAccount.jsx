import { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import * as location from '../assets/icons/1055-world-locations.json';
import styled from 'styled-components';
import api from '../services/api';
import { message } from 'antd';

const Container = styled.div`
  display: flex;
  background: #e0e0e0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  font-family: 'Inter', sans-serif;
`;

const SignUpContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 600px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 0 1.2em #b4b4b4;
`;

const CreateAccountContent = styled.form`
  display: flex;
  font-family: 'Acme', sans-serif;
  padding: 10px;
  flex-direction: column;
  width: 500px;
  border-radius: 10px;
`;

const Title = styled.h1`
  line-height: 20px;
  font-size: 2.7rem;
  font-weight: 600;
`;

const SubTitle = styled.span`
  font-size: 1.2rem;
  margin-bottom: 20px;
  font-weight: 500;
  color: #302f2f;
`;

const InputText = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
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
  border: none;
  height: 55px;
  width: 100%;
  border-radius: 15px;
  margin-top: 20px;
  background: #ffa908;
  font-size: 1.2rem;
  color: #ffffff;
  box-shadow: 0 0 1em #9c9c9c;
  &&:hover {
    background: #dd9510;
    transform: translateY(-3px);
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
      <SignUpContent>
        {loading ? (
          <Lottie options={defaultLocation} height={200} width={200} />
        ) : (
          <CreateAccountContent>
            <Title>Sing Up</Title>
            <SubTitle>Create an account and enjoy!</SubTitle>
            <InputText>Name</InputText>
            <Input
              autoFocus
              placeholder="Type a name."
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <InputText>Email</InputText>
            <Input
              placeholder="Type a email."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <InputText>Password</InputText>
            <Input
              name="password"
              autoComplete="on"
              type="password"
              placeholder="Type a password."
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Link to="/">
              <GoToHome onClick={submit}>Create an Account</GoToHome>
            </Link>
          </CreateAccountContent>
        )}
      </SignUpContent>
    </Container>
  );
};

export default CrateAccount;
