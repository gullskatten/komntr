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

const MessageFieldWrapper = styled.div`
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

  &::placeholder {
    color: #777;
    font-family: 'Roboto', sans-serif;
  }
`;

const CreateMessageButton = styled.button`
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

const CreateMessageButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #111;
`;

const CreateMessageButtonText = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.1rem;
`;

const ChannelTag = styled.span`
  padding: 0.5rem;
  font-size: 5rem;
  font-weight: bold;
  margin-right: 10px;
  color: ${props => props.color};
  transition: color 0.5s ease-in-out;
`;

export default function CreateChannel(props) {
  const { dispatch } = useContext(TitleContext);
  const userContext = useContext(UserContext);
  const [hasLoadedCategory, setHasLoadedCategory] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');

  const {
    match: {
      params: { categoryId }
    }
  } = props;

  const [fetchingCategory, category] = useApi({
    endpoint: `categories/${categoryId}`,
    fetchOnMount: true,
    initialData: null,
    onSuccess: currentCategory => {
      setHasLoadedCategory(true);
      dispatch({
        type: 'set-title',
        data: {
          title: 'Opprett ny channel',
          titleColor: '#624694'
        }
      });
    },
    onError: e => {
      setHasLoadedCategory(true);
    }
  });

  function resetInput() {
    setChannelName('');
    setChannelDescription('');
  }

  // eslint-disable-next-line
  const [creating, res, err, submitNewChannel] = useApi({
    endpoint: `categories/${categoryId}/channels`,
    method: 'POST',
    body: {
      name: channelName,
      description: channelDescription
    },
    onSuccess: newChannel => {
      resetInput();
      props.history.push(`/${categoryId}/${newChannel._id}`);
    },
    onError: e => {
      // TODO: Fortell brukeren at dette feilet!
    }
  });

  if (hasLoadedCategory && (category === undefined || category === null)) {
    return <NoContentFound label="Fant ikke kanalen du lette etter.." />;
  }
  return (
    <Busy busy={creating || fetchingCategory}>
      <MessageFieldWrapper loggedIn={userContext.data.loggedIn}>
        {userContext.data.loggedIn ? (
          <>
            <InputWrapper>
              <ChannelTag color={determineColorForString(channelName)}>
                #
              </ChannelTag>
              <StyledInput
                disabled={creating}
                placeholder="Gi kanalen et navn.."
                value={channelName}
                onChange={e => setChannelName(e.target.value)}
              />
            </InputWrapper>
            <StyledInput
              disabled={creating}
              placeholder={`(Valgfritt) Angi en kort beskrivelse av ${channelName ||
                'kanalen'}..`}
              value={channelDescription}
              onChange={e => setChannelDescription(e.target.value)}
            />
            <CreateMessageButtonWrapper>
              {channelName.length > 0 && (
                <CreateMessageButton onClick={submitNewChannel}>
                  <CreateMessageButtonText>OPPRETT</CreateMessageButtonText>
                </CreateMessageButton>
              )}
            </CreateMessageButtonWrapper>
          </>
        ) : (
          <LoginHandler buttonText="Logg inn med Google for å opprette en channel" />
        )}
      </MessageFieldWrapper>
    </Busy>
  );
}
