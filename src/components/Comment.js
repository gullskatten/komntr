import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Tooltip } from "react-tippy";
import {
  CommentWrapper,
  CircularIconWrapper,
  CommentUsername,
  CommentText
} from "../styleguides/CommentStyles";
import determineInitials from "../utils/determineInitials";
import determineColorForString from "../utils/determineColorForString";

const CommentContentWrapper = styled.div`
  display: flex;
  margin-left: 0.8rem;
`;

const CommentTextPadder = styled.div`
  margin: 0.2rem 0;
`;

const CommentTextWrapper = styled.div`
  margin: 0 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  background-color: #555;
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    background-color: #555;
    content: "\00a0";
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

const Username = styled.p`
  margin: 0;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2px;
`;

const Comment = ({ comment, isLast }) => {
  return (
    <CommentWrapper isLast={isLast}>
      <CommentContentWrapper>
        <Tooltip title={comment.createdBy} position="top">
          <CircularIconWrapper
            color={determineColorForString(comment.createdBy)}
          >
            <CommentUsername>
              {determineInitials(comment.createdBy)}
            </CommentUsername>
          </CircularIconWrapper>
        </Tooltip>
        <Tooltip
          title={`Sendt ${moment(comment.created).calendar()}`}
          position="bottom"
        >
          <CommentTextWrapper>
            <Username>{comment.createdBy}</Username>
            <CommentTextPadder>
              <CommentText>
                {comment.comment || "Ingen kommentartekst."}
              </CommentText>
            </CommentTextPadder>
          </CommentTextWrapper>
        </Tooltip>
      </CommentContentWrapper>
    </CommentWrapper>
  );
};
export default Comment;
