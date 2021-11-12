import { Route } from 'react-router-dom';
import CreateAccount from '../pages/CreateAccount';
import LogIn from '../pages/LogIn';
import HomePage from '../pages/HomePage';
import styled from 'styled-components';
import RecoverPassword from '../pages/RecoverPassword';

const Container = styled.div`
  background: #3a3939;
  height: 100vh;
  width: 100vw;
  overflow: visible;
  overflow-x: hidden;
  font-family: 'Inter', sans-serif;
`;

const Router = () => {
  return (
    <Container>
      <Route exact path="/" component={LogIn} />

      <Route path="/createAccount" component={CreateAccount} />

      <Route path="/homePage" component={HomePage} />

      <Route path="/recoverPassword" component={RecoverPassword} />
    </Container>
  );
};

export default Router;
