import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { Checkbox, message } from 'antd';

const Conteiner = styled.div`
  display: flex;
  background: #e0e0e0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  font-family: 'Inter', sans-serif;
`;

const SignInContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 700px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 0 1.2em #b4b4b4;
`;

const GetStartedContent = styled.form`
  display: flex;
  padding: 10px;
  flex-direction: column;
  background: #faebeb16;
  width: 500px;
  border-radius: 10px;
`;

const Title = styled.h1`
  line-height: 25px;
  font-size: 2.7rem;
  font-weight: 600;
`;

const SubTitle = styled.span`
  font-size: 1rem;
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

const SignIn = styled.button`
  border: none;
  height: 55px;
  width: 100%;
  border-radius: 10px;
  margin-top: 30px;
  background: #e0e0e0;
  font-size: 1.2rem;
  color: #ffa908;

  &&:hover {
    transition: 1s;
    transform: translateY(-3px);
    color: #ffffff;
    box-shadow: 0 0 1em #b6b6b6;
    background: #ffa908;
  }
`;

const SignUp = styled.button`
  border: none;
  height: 55px;
  width: 100%;
  border-radius: 15px;
  margin-top: 20px;
  background: #ffa908;
  box-shadow: 0 0 1em #9c9c9c;
  font-size: 1.2rem;
  color: #ffffff;

  &&:hover {
    background: #dd9510;
    transform: translateY(-3px);
    transition: 1s;
    color: #ffffff;
  }
`;

const CheckboxContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const CheckboxInput = styled(Checkbox)`
  font-size: 1rem;
`;

const ForgotPassword = styled.span`
  font-size: 1rem;
  color: #ffa500;
  text-decoration: underline;
  cursor: pointer;

  &&:hover {
    color: #d68d06;
  }
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
  // eslint-disable-next-line
  const [state, setState] = useState({});
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
    return () => {
      setState({}); // update an unmounted component
    };
  };

  return (
    <Conteiner>
      <SignInContent>
        <GetStartedContent>
          <Title>Sign In</Title>
          <SubTitle>Welcome, we missed you!</SubTitle>
          <InputText>Your Email</InputText>
          <Input
            autoFocus
            placeholder="Enter you email. "
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <InputText>Password</InputText>
          <Input
            type="password"
            name="password"
            autoComplete="on"
            placeholder="Enter you password."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <CheckboxContent>
            <CheckboxInput onChange={onChange}>Remember me</CheckboxInput>
            <Link to="recoverPassword">
              <ForgotPassword>Forgot Password?</ForgotPassword>
            </Link>
          </CheckboxContent>

          <Link to="/homePage">
            <SignIn disabled={email === '' || password === ''} onClick={submit}>
              Sign In
            </SignIn>
          </Link>

          <CreateAccountContent>
            <Line />
            <CreateAccount>or create an account</CreateAccount>
            <Line />
          </CreateAccountContent>
          <Link to="/createAccount">
            <SignUp disabled={email !== '' || password !== ''}>Sign Up</SignUp>
          </Link>
        </GetStartedContent>
      </SignInContent>
    </Conteiner>
  );
};

export default LogIn;

//text effect
// const Title = styled.div`
//    ul li {
//       list-style: none;
//    }

//    ul li a {
//       position: relative;
//       display: block;
//       color: transparent;
//       -webkit-text-stroke: 1px #fff;
//       font-size: 2.3rem;
//       font-weight: 900;
//       text-decoration: none;
//       line-height: none;
//    }

//    ul li a:hover {
//       color: #fff;
//       -webkit-text-stroke: 1px #030303;
//       transition: 0.5s;
//    }

//    ul li a:before,
//    ul li a:after {
//       content: attr(data-text);
//       position: absolute;
//       top: 0;
//       left: 0;
//       transition: 0.5s;
//    }

//    ul li a:hover:before {
//       color: red;
//       z-index: 1;
//       -webkit-text-stroke: 1px #030303;
//       transform: translate(10px, -10px);
//    }

//    ul li a:hover:after {
//       color: #ffa500;
//       z-index: 2;
//       -webkit-text-stroke: 1px #030303;
//       transform: translate(20px, -20px);
//    }
// `;
