import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const StyledObjectLink = styled(({ ...props }) => <Link {...props} />)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
`;

export default function Post({ post }) {
  if (!post) {
    return null;
  }

  return (
    <StyledObjectLink to={`/${post.channelId}/${post.id}`}>
        {post.name} - {post.channelId}
    </StyledObjectLink>
  );
}
