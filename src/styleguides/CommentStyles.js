import styled from 'styled-components';

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentText = styled.span`
  color: #fff;
  max-width: 500px;
`;

export const CircularIconWrapper = styled.div`
  padding: 15px;
  background-color: #000;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentUsername = styled.span`
  color: #fff;
  font-size: 1.2rem;
`;
