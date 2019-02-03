import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'moment/locale/nb';
import 'react-tippy/dist/tippy.css';
import history from './utils/history';
import { TitleContextProvider } from './context/AppTitleContext';
import UserProvider from './context/UserContext';

ReactDOM.render(
  <Router history={history}>
    <UserProvider>
      <TitleContextProvider>
        <App />
      </TitleContextProvider>
    </UserProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
