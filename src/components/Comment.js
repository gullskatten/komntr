import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Tooltip } from 'react-tippy';
import {
  CommentWrapper,
  CircularIconWrapper,
  CommentUsername,
  CommentText
} from '../styleguides/CommentStyles';
import determineUsername from '../utils/determineUsername';

export const CommentContentWrapper = styled.div`
  display: flex;
  margin-left: 0.8rem;
`;

export const CommentTextWrapper = styled.div`
  margin: 0 1.5rem;
  padding: 0.8rem 1rem;
  border-radius: 15px;
  background-color: #555;
  display: flex;
  align-items: center;
  position: relative;

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
  }
`;

const Comment = ({ comment, isOwn }) => {
  return (
    <CommentWrapper>
      <CommentContentWrapper>
        <Tooltip title={comment.createdBy} position="top">
          <CircularIconWrapper>
            <CommentUsername>
              {determineUsername(comment.createdBy)}
            </CommentUsername>
          </CircularIconWrapper>
        </Tooltip>
        <Tooltip
          title={`Sendt ${moment(comment.created).calendar()}`}
          position="bottom"
        >
          <CommentTextWrapper isOwn={isOwn}>
            <CommentText>
              {comment.comment || 'Ingen kommentartekst.'}
            </CommentText>
          </CommentTextWrapper>
        </Tooltip>
      </CommentContentWrapper>
    </CommentWrapper>
  );
};
export default Comment;
