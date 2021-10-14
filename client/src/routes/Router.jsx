import { Route } from 'react-router-dom';
import CreateAccount from '../pages/CreateAccount';
import LogIn from '../pages/LogIn';
import HomePage from '../pages/HomePage';
import styled from 'styled-components';
import RecoverPassword from '../pages/RecoverPassword';

const Container = styled.div`
   background: #e0e0e0;
   height: 100vh;
   width: 100vw;
   overflow: visible;
   overflow-x: hidden;
   font-family: 'Inter', sans-serif;
`;

const Router = () => {
   return (
      <Container>
         <Route exact path="/">
            <LogIn />
         </Route>
         <Route path="/createAccount">
            <CreateAccount />
         </Route>

         <Route path="/homePage">
            <HomePage />
         </Route>

         <Route path="/recoverPassword">
            <RecoverPassword />
         </Route>
      </Container>
   );
};

export default Router;
