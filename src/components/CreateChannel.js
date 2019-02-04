import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { fadeInBottom } from "../utils/animations";
import useApi from "../hooks/useApi";
import Busy from "./Busy";
import { UserContext } from "../context/UserContext";
import { TitleContext } from "../context/AppTitleContext";
import LoginHandler from "./LoginHandler";
import determineColorForString from "../utils/determineColorForString";
import NoContentFound from "./NoResults";
import Flex from "../styleguides/Flex";

const CreateChannelWrapper = styled.div`
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
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 135px;

  &::placeholder {
    color: #777;
    font-family: "Roboto", sans-serif;
  }

  @media all and (max-width: 600px) {
    font-size: 1rem;
    height: 60px;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 0.6rem 0.8rem;
  outline: 0;
  overflow: hidden;
  font-size: 1.5rem;
  border: 0;
  background-color: #111;
  color: #fff;
  outline: none;
  resize: none;
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 100px;

  &::placeholder {
    color: #777;
    font-family: "Roboto", sans-serif;
  }

  @media all and (max-width: 600px) {
    font-size: 1rem;
    height: 55px;
  }
`;

const CreateChannelButton = styled.button`
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

const CreateChannelButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #111;
`;

const CreateChannelButtonText = styled.span`
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

  @media all and (max-width: 600px) {
    font-size: 3rem;
  }
`;

const Error = styled.p`
  color: #d45f85;
  margin: 0;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  animation: ${fadeInBottom} 0.25s ease-in-out 0s 1;

  @media all and (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const CHANNEL_NAME_MAX_LENGTH = 25;
const CHANNEL_DESCRIPTION_MAX_LENGTH = 100;

export default function CreateChannel(props) {
  const { dispatch } = useContext(TitleContext);
  const userContext = useContext(UserContext);
  const [hasLoadedCategory, setHasLoadedCategory] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [createChannelError, setCreateChannelError] = useState(undefined);

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
        type: "set-title",
        data: {
          title: "Opprett kanal",
          titleColor: "#624694"
        }
      });
    },
    onError: e => {
      setHasLoadedCategory(true);
    }
  });

  // eslint-disable-next-line
  const [creating, res, err, submitNewChannel] = useApi({
    endpoint: `categories/${categoryId}/channels`,
    method: "POST",
    body: {
      name: channelName.trim(),
      description: channelDescription.trim()
    },
    onSuccess: newChannel => {
      resetInput();
      props.history.push(`/${categoryId}/${newChannel._id}`);
    },
    onError: e => {
      setCreateChannelError("Wops! Klarte ikke opprette kanalen.");
    }
  });

  function resetInput() {
    setChannelName("");
    setChannelDescription("");
  }

  function handleInputChange(e, stateUpdaterFunc, maxLength) {
    const { value } = e.target;

    if (value.trim().length < maxLength) {
      stateUpdaterFunc(value);
    }
  }

  function renderError(errorMessage) {
    return (
      <Flex alignItems="center" justify="center">
        <Error>{errorMessage}</Error>
      </Flex>
    );
  }

  if (hasLoadedCategory && (category === undefined || category === null)) {
    return <NoContentFound label="Fant ikke kanalen du lette etter.." />;
  }

  return (
    <Busy busy={creating || fetchingCategory}>
      <CreateChannelWrapper loggedIn={userContext.data.loggedIn}>
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
                onChange={e =>
                  handleInputChange(e, setChannelName, CHANNEL_NAME_MAX_LENGTH)
                }
              />
            </InputWrapper>
            {channelName.trim().length === CHANNEL_NAME_MAX_LENGTH - 1 &&
              renderError(
                `Navnet kan ikke være lengre enn ${CHANNEL_NAME_MAX_LENGTH} tegn.`
              )}
            <StyledTextArea
              disabled={creating}
              placeholder={`(Valgfritt) Angi en kort beskrivelse av ${channelName.trim() ||
                "kanalen"}..`}
              value={channelDescription}
              onChange={e =>
                handleInputChange(
                  e,
                  setChannelDescription,
                  CHANNEL_DESCRIPTION_MAX_LENGTH
                )
              }
            />
            {channelDescription.trim().length ===
              CHANNEL_DESCRIPTION_MAX_LENGTH - 1 &&
              renderError(
                `Beskrivelsen kan ikke være lengre enn ${CHANNEL_DESCRIPTION_MAX_LENGTH} tegn.`
              )}
            <CreateChannelButtonWrapper>
              {channelName.length > 0 && channelName.trim().length > 0 && (
                <CreateChannelButton onClick={submitNewChannel}>
                  <CreateChannelButtonText>OPPRETT</CreateChannelButtonText>
                </CreateChannelButton>
              )}
            </CreateChannelButtonWrapper>
            {createChannelError &&
              renderError(
                createChannelError
              )}
          </>
        ) : (
          <LoginHandler buttonText="Logg inn for å opprette en ny kanal" />
        )}
      </CreateChannelWrapper>
    </Busy>
  );
}
