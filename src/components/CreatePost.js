import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { fadeInBottom } from '../utils/animations';
import useApi from '../hooks/useApi';
import Busy from './Busy';
import { UserContext } from '../context/UserContext';
import { TitleContext } from '../context/AppTitleContext';
import LoginHandler from './LoginHandler';
import determineColorForString from '../utils/determineColorForString';
import NoContentFound from './NoResults';

const CommentFieldWrapper = styled.div`
  background-color: #222;

  ${props =>
    !props.loggedIn &&
    css`
      padding: 2rem;
      text-align: center;
    `};
`;

const InputWrapper = styled.div`
  width: 100%;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
 
  padding: 0.6rem 0.8rem;
  outline: 0;
  font-size: 2.5rem;
  transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
  border: 0;
  background-color: #111;
  color: #fff;
  outline: none;
  resize: none;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 135px;

  &:focus {
    box-shadow: 0 -10px 10px -5px rgba(0, 0, 0, 0.3);
  }

  &::placeholder {
    color: #777;
    font-family: 'Roboto', sans-serif;
  }
`;

const PostCommentButton = styled.button`
  outline: 0;
  padding: 0.5rem 1rem;
  background-color: #946ddc;
  border: 0;
  border-bottom: 4px solid #624694;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation: ${fadeInBottom} 0.25s ease-in-out 0s 1;
`;

const PostCommentButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #111;
`;

const PostCommentButtonText = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.1rem;
`;

const PostTag = styled.span`
  padding: 0.5rem;
  font-size: 5rem;
  font-weight: bold;
  margin-right: 10px;
  color: ${props => props.color};
  transition: color 0.5s ease-in-out;
`;

export default function CreatePost(props) {

  const { dispatch } = useContext(TitleContext);
  const userContext = useContext(UserContext);
  const [hasLoadedChannel, setHasLoadedChannel] = useState(false);
  const [postName, setPostName] = useState('');

  const {
    match: {
      params: { channelId }
    }
  } = props;

  const [fetchingChannel, channel] = useApi({
    endpoint: `categories/${channelId}`,
    fetchOnMount: true,
    initialData: null,
    onSuccess: currentChannel => {
      setHasLoadedChannel(true);
      dispatch({
        type: 'set-title',
        data: {
          title: "Opprett ny post",
          titleColor: "#624694"
        }
      });
    },
    onError: e => {
      setHasLoadedChannel(true);
    }  
  });

  
  function handleInputChange(e) {
    setPostName(e.target.value);
  }

  function resetInput() {
    setPostName('');
  }

  // eslint-disable-next-line
  const [creating, res, err, submitNewPost] = useApi({
    endpoint: `categories/${channelId}/`,
    method: 'POST',
    body: {
      body: postName
    },
    onSuccess: newPost => {
      resetInput();
      props.history.push(`/${channelId}/${newPost.id}`)
    },
    onError: e => {

    }
  });

  if(hasLoadedChannel && (channel === undefined || channel === null)) {
    return (
      <NoContentFound label="Fant ikke kanalen du lette etter.." />
    )
  }
  return (
    <Busy busy={creating || fetchingChannel}>
      <CommentFieldWrapper loggedIn={userContext.data.loggedIn}>
        {userContext.data.loggedIn ? (
          <>
            <InputWrapper>
              <PostTag color={determineColorForString(postName)}>#</PostTag>
              <StyledInput
                disabled={creating}
                placeholder="Gi posten et navn.."
                value={postName}
                onChange={handleInputChange}
              />
            </InputWrapper>
            <StyledInput
                disabled={creating}
                placeholder="Gi posten en beskrivelse.."
                value={postName}
                onChange={handleInputChange}
              />
            <PostCommentButtonWrapper>
              {postName.length > 0 && (
                <PostCommentButton onClick={submitNewPost}>
                  <PostCommentButtonText>OPPRETT</PostCommentButtonText>
                </PostCommentButton>
              )}
            </PostCommentButtonWrapper>
          </>
        ) : (
          <LoginHandler buttonText="Logg inn med Google for å opprette en post" />
        )}
      </CommentFieldWrapper>
    </Busy>
  );
}
