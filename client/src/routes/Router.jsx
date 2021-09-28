import { Route } from 'react-router-dom';
import CreateAccount from '../pages/CreateAccount';
import LogIn from '../pages/LogIn';
import HomePage from '../pages/HomePage';
import styled from 'styled-components';

const Container = styled.div`
   background: #2c2c2c;
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
      </Container>
   );
};

export default Router;
