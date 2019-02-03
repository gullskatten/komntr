import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import determineColorForString from '../utils/determineColorForString';

const StyledObjectLink = styled(({ ...props }) => <Link {...props} />)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  padding: 1rem;
  border-bottom: 1px solid #624694;
`;

const PostName = styled.h2`
  color: #946ddc;
  margin: 0.5rem 0;
`;

const PostDescription = styled.p`
  color: #fff;
  margin: 0;
`;

const PostTag = styled.span`
  margin-right: 10px;
  color: ${props => props.color};
`;

export default function CreatePostItem({ channelId }) {
  
  if (!channelId) {
    return null;
  }

  return (
    <StyledObjectLink to={`/${channelId}/create`}>
      <PostName>
        <PostTag color={determineColorForString("Opprett en ny post")}>+</PostTag>
        Opprett en ny post
      </PostName>
      <PostDescription>Trykk her for å opprette en ny post.</PostDescription>
    </StyledObjectLink>
  );
}
