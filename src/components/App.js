import React, { useContext } from 'react';
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
import { TitleContext } from '../context/AppTitleContext';

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
  border-bottom: 5px solid ${props => props.borderColor};
  height: 80px;
  transition: all 0.5s ease-in-out;
`;

const BackButton = styled.button`
  border: 0;
  padding: 0.5rem 1rem;
  background-color: transparent;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
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
  white-space: nowrap;

  @media all and (max-width: 450px) {
    font-size: 1.4rem;
    text-overflow: ellipsis;
    width: 280px;
    overflow: hidden;
  }
`;

export default function App(props) {
  let { state } = useContext(TitleContext);

  return (
    <>
      <Flex basis={'7%'}>
        <Container>
          <AppTitleWrapper borderColor={state.titleColor}>
            {history.location.pathname.includes('/') &&
            history.location.pathname !== '/' ? (
              <BackButton
                borderColor={state.titleColor}
                onClick={() => history.push(goBack(history.location.pathname))}
              >
                {arrowBack}
              </BackButton>
            ) : (
              <Flex basis={'25%'} />
            )}
            <AppTitle>{state.title}</AppTitle>
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
