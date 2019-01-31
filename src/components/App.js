import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Comments from './Comments';
import styled from 'styled-components';
import Systems from './Systems';
import Objects from './Objects';
import Flex from '../styleguides/Flex';
import Container from '../styleguides/Container';

const AppTitleWrapper = styled.nav`
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0;
  z-index: 1;
  position: sticky;
  padding: 1rem 0;
  box-shadow: 0px 7px 10px 1px rgb(0, 0, 0, 0.4);
  border-bottom: 5px solid #624694;
`;

const AppTitle = styled.h1`
  color: #fff;
  font-size: 3rem;
  margin: 0;
  padding: 0;

  @media all and (max-width: 450px) {
    font-size: 1.8rem;
  }
`;

export default function App() {
  return (
    <BrowserRouter>
      <>
        <Flex basis={'7%'}>
          <Container>
            <AppTitleWrapper>
              <AppTitle>
                KOMNTR{' '}
                <span role="img" aria-label="logo">
                  😼
                </span>
              </AppTitle>
            </AppTitleWrapper>
          </Container>
        </Flex>
        <Switch>
          <Route path="/" exact component={Systems} />
          <Route path="/:systemId" exact component={Objects} />
          <Route path="/:systemId/:objectId" exact component={Comments} />
        </Switch>
      </>
    </BrowserRouter>
  );
}
