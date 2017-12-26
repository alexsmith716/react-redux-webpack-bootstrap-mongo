
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

//import { store } from './store';

import AppRouter from './AppRouter';

const mountApp = document.getElementById('app');

// <Provider store={ store } key="provider">

const Client = () => (
  <Provider key="provider">
    <Router>
      <AppRouter />
    </Router>
  </Provider>
);

window.onload = () => {
  ReactDOM.hydrate(
    <Client />,
    mountApp
  )
};
