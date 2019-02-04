import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Tooltip } from "react-tippy";
import {
  MessageWrapper,
  CircularIconWrapper,
  MessageText
} from "../styleguides/MessageStyles";
import determineColorForString from "../utils/determineColorForString";

const OwnMessageWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 0.8rem;
`;

export const MessageContentWrapper = styled.div`
  margin: 0 1.5rem;
  padding: 0.8rem 1rem;
  border-radius: 15px;
  background-color: #624694;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    background-color: #624694;
    content: "\00a0";
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

const OwnMessage = ({ comment, isLast }) => {
  return (
    <MessageWrapper isLast={isLast}>
      <OwnMessageWrapper>
        <Tooltip
          title={`Sendt ${moment(comment.createdAt).calendar()}`}
          position="bottom"
        >
          <MessageContentWrapper>
            <MessageText>{comment.body || "Ingen kommentartekst."}</MessageText>
          </MessageContentWrapper>{" "}
        </Tooltip>

        <Tooltip title={comment.author.name} position="top">
          <CircularIconWrapper
            color={determineColorForString(comment.author.name)}
          >
            <img src={comment.author.profileImage} alt={comment.author.name} />
          </CircularIconWrapper>
        </Tooltip>
      </OwnMessageWrapper>
    </MessageWrapper>
  );
};
export default OwnMessage;
