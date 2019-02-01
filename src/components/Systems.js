import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../styleguides/Container';
import sample_channels from '../data/sample_channels';
import determineUsername from '../utils/determineUsername';
import Flex from '../styleguides/Flex';

const StyledSystemWrapper = styled(({ ...props }) => <Link {...props} />)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
`;

const StyledInitials = styled.div`
  padding: 4rem;
  background-color: salmon;
  color: #fff;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;

const StyledName = styled.h2`
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 1.35rem;
  font-weight: 300;
`;

export default function Systems() {
  return (
    <Container gutterTop>
      <Flex>
        {sample_channels.map(c => {
          return (
            <Flex
              child
              basis={'33%'}
              key={c.id}
              alignItems="center"
              justify="center"
            >
              <StyledSystemWrapper to={`/${c.id}`}>
                <StyledInitials>{determineUsername(c.name)}</StyledInitials>
                <StyledName>{c.name}</StyledName>
              </StyledSystemWrapper>
            </Flex>
          );
        })}
      </Flex>
    </Container>
  );
}
