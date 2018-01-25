
import React from 'react';
import ReactDOM from 'react-dom';
//import { Router } from 'react-router';
//import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
//import BrowserRouter from 'react-router-dom/BrowserRouter';
import createBrowserHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ReduxAsyncConnect } from 'redux-connect';
import { getStoredState } from 'redux-persist';
import localForage from 'localforage';

import routes from './routes/routes';
import createStore from './redux/createStore';
import apiClient from '../server/helpers/apiClient';
const client = apiClient();

const mountApp = document.getElementById('content');

const offlinePersistConfig = {
  storage: localForage,
  whitelist: ['auth',]
};

const data = { ...window.__data };
const history = createBrowserHistory();
const store = createStore(history, client, data);


const render = (routes) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <ReduxAsyncConnect routes={routes} helpers={{ client }} />
        </Router>
      </Provider>
    </AppContainer>,
    mountApp
  )
};

render(routes);

if (module.hot) {
  module.hot.accept('./routes/routes', () => {
    render(require('./routes/routes'));
  });
}


