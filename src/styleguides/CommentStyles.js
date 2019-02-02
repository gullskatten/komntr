import styled, { css } from 'styled-components';

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;

  ${props => props.isLast && css`
    margin-bottom: 60px;
  `}
`;

export const CommentText = styled.span`
  color: #fff;
  max-width: 500px;
  font-family: 'Roboto', sans-serif;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const CircularIconWrapper = styled.div`
  padding: 15px;
  background-color: ${props => props.color || "#000"};
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
