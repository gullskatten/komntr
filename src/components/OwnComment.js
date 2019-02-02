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
import determineInitials from '../utils/determineInitials';
import determineColorForString from '../utils/determineColorForString';

const OwnCommentWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 0.8rem;
`;

export const CommentTextWrapper = styled.div`
  margin: 0 1.5rem;
  padding: 0.8rem 1rem;
  border-radius: 15px;
  background-color: #624694;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    background-color: #624694;
    content: '\00a0';
    display: block;
    height: 16px;
    position: absolute;
    top: 6px;
    right: -1px;
    transform: rotate(24deg) skew(-33deg);
    -moz-transform: rotate(24deg) skew(-33deg);
    -ms-transform: rotate(24deg) skew(-33deg);
    -o-transform: rotate(24deg) skew(-33deg);
    -webkit-transform: rotate(24deg) skew(-33deg);
    width: 12px;
  }
`;

export default function OwnComment(props) {
  const { comment, isLast } = props;

  return (
    <CommentWrapper isLast={isLast}>
      <OwnCommentWrapper>
        <Tooltip
          title={`Sendt ${moment(comment.created).calendar()}`}
          position="bottom"
        >
          <CommentTextWrapper secondary>
            <CommentText>
              {comment.comment || 'Ingen kommentartekst.'}
            </CommentText>
          </CommentTextWrapper>
        </Tooltip>
        <Tooltip title={comment.createdBy} position="top">
          <CircularIconWrapper color={"#624694"}>
            <CommentUsername>
              {determineInitials(comment.createdBy)}
            </CommentUsername>
          </CircularIconWrapper>
        </Tooltip>
      </OwnCommentWrapper>
    </CommentWrapper>
  );
}
