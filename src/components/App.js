import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Comments from './Comments';
import styled from 'styled-components';
import Channels from './Channels';
import Posts from './Posts';
import Flex from '../styleguides/Flex';
import Container from '../styleguides/Container';
import history from '../utils/history';
import goBack from '../utils/goBack';
import { arrowBack } from '../icons';

const AppTitleWrapper = styled.nav`
  background: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  top: 0;
  z-index: 1;
  position: sticky;
  box-shadow: 0px 7px 10px 1px rgb(0, 0, 0, 0.4);
  border-bottom: 5px solid #624694;
  height: 80px;
`;

const BackButton = styled.button`
  border: 2px solid #624694;
  padding: 0.5rem 1rem;
  background-color: transparent;
  margin-left: 1rem;
  cursor: pointer;
`;

const AppTitle = styled.h1`
  color: #fff;
  font-size: 3rem;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  text-align: center;

  @media all and (max-width: 450px) {
    font-size: 1.8rem;
  }
`;

export default function App(props) {
  return (
    <>
      <Flex basis={'7%'}>
        <Container>
          <AppTitleWrapper>
            {history.location.pathname.includes('/') &&
            history.location.pathname !== '/' ? (
              <BackButton
                onClick={() => history.push(goBack(history.location.pathname))}
              >
                {arrowBack}
              </BackButton>
            ) : (
              <Flex basis={'25%'} />
            )}
            <AppTitle>
              KOMNTR{' '}
              <span role="img" aria-label="logo">
                😼
              </span>
            </AppTitle>
            <Flex basis={'25%'} />
          </AppTitleWrapper>
        </Container>
      </Flex>
      <Switch>
        <Route path="/" exact component={Channels} />
        <Route path="/:channelId" exact component={Posts} />
        <Route path="/:channelId/:postId" exact component={Comments} />
      </Switch>
    </>
  );
}
