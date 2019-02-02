import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


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
    font-style: italic;
    margin: 0;
`;

export default function Post({ post }) {
  if (!post) {
    return null;
  }

  return (
    <StyledObjectLink to={`/${post.channelId}/${post.id}`}>
        <PostName>
            {post.name}
        </PostName>
       <PostDescription>
           There will be some description here later..
       </PostDescription>
    </StyledObjectLink>
  );
}
