import React, { createContext, useState, useEffect } from 'react';
import { userStorage } from '../utils/storageKeys';

const defaultUser = {
  id: '',
  name: '',
  profileImage: '',
  loggedIn: false,
  accessToken: null
};

const UserContext = createContext({
  data: defaultUser,
  setData: data => {},
  logOut: () => {}
});

function readUserDataFromStorage(): UserState {
  const userData = userStorage.get();
  return userData ? userData : defaultUser;
}

export default function UserProvider({ children }) {
  const [state, setState] = useState(defaultUser);

  useEffect(() => {
    const userData = readUserDataFromStorage();
    setState(userData);
  }, []);

  return (
    <UserContext.Provider
      value={{
        data: state,
        setData: data => setState(data),
        logOut: () => {
          setState({
            ...state,
            loggedIn: false,
            accessToken: null
          });

          userStorage.clearItem();
        }
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider, defaultUser };
