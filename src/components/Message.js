import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { Tooltip } from 'react-tippy';
import {
  MessageWrapper,
  CircularIconWrapper,
  MessageUsername,
  MessageText
} from '../styleguides/MessageStyles';
import determineColorForString from '../utils/determineColorForString';
import { UserContext } from '../context/UserContext';

const MessageContentWrapper = styled.div`
  display: flex;
  margin-left: 0.8rem;
`;

const MessageTextPadder = styled.div`
  margin: 0.2rem 0;
`;

const MessageTextWrapper = styled.div`
  margin: 0 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  background-color: #555;
  display: flex;
  flex-direction: column;
  position: relative;

  ${props =>
    props.ownMessage &&
    css`
      background-color: purple;
    `};

  &::before {
    background-color: #555;
    content: '\00a0';
    display: block;
    height: 16px;
    position: absolute;
    top: 6px;
    left: -1px;
    transform: rotate(24deg) skew(-33deg);
    -moz-transform: rotate(24deg) skew(-33deg);
    -ms-transform: rotate(24deg) skew(-33deg);
    -o-transform: rotate(24deg) skew(-33deg);
    -webkit-transform: rotate(24deg) skew(-33deg);
    width: 12px;

    ${props =>
      props.ownMessage &&
      css`
        background-color: purple;
      `};
  }
`;

const Username = styled.p`
  margin: 0;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2px;
`;

const Message = ({ comment, isLast }) => {
  const userContext = useContext(UserContext);

  return (
    <MessageWrapper isLast={isLast}>
      <MessageContentWrapper>
        <Tooltip title={comment.author.name} position="top">
          <CircularIconWrapper
            color={determineColorForString(comment.author.name)}
          >
            <MessageUsername>
              <img
                src={comment.author.profileImage}
                alt={comment.author.name}
              />
            </MessageUsername>
          </CircularIconWrapper>
        </Tooltip>
        <Tooltip
          title={`Sendt ${moment(comment.createdAt).calendar()}`}
          position="bottom"
        >
          <MessageTextWrapper
            ownMessage={comment.author.googleId === userContext.data.id}
          >
            <Username>{comment.author.name}</Username>
            <MessageTextPadder>
              <MessageText>
                {comment.body || 'Ingen kommentartekst.'}
              </MessageText>
            </MessageTextPadder>
          </MessageTextWrapper>
        </Tooltip>
      </MessageContentWrapper>
    </MessageWrapper>
  );
};
export default Message;
