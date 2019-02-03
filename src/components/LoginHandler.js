import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { userStorage } from '../utils/storageKeys';
import { UserContext } from '../context/UserContext';

const LoginButton = styled.button`
  border: 0;
  background-color: #62469438;
  color: #fff;
  border-radius: 40px;
  padding: 0.75rem 2rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    transform: scale(1.03);
  }
`;

export default function LoginHandler(props) {
  const { buttonText } = props;
  const userContext = useContext(UserContext);

  async function handleSuccess(response) {
    const loggedInUser = {
      id: response.profileObj.googleId,
      name: response.profileObj.name,
      profileImage: response.profileObj.imageUrl,
      accessToken: {
        token: response.tokenObj.id_token,
        expires: response.tokenObj.expires_at
      },
      loggedIn: true
    };

    userStorage.set(loggedInUser);

    await fetch(`${process.env.REACT_APP_API_URL}/users/sync`, {
      headers: {
        authorization: `Bearer ${loggedInUser.accessToken.token}`
      }
    });

    userContext.setData(loggedInUser);
  }

  function handleFailure(response) {
    /**
     * TODO:
     * Handle this by maybe showing some kind of
     * modal message, notification or redirect to a
     * failed login place.
     */
    console.log('Handling err: ', response);
  }

  return (
    <GoogleLogin
      render={renderProps => (
        <LoginButton onClick={renderProps ? renderProps.onClick : undefined}>
          {buttonText ? buttonText : 'Logg inn med Google'}
        </LoginButton>
      )}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
      buttonText={buttonText}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
    />
  );
}
