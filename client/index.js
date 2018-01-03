
import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from 'react-dom';
//import { BrowserRouter as Router } from 'react-router-dom';
//import BrowserRouter from 'react-router-dom/BrowserRouter';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';


import { configureStore } from './store';

import App from './App';

const store = configureStore(window.__INITIAL_STATE__);

const mountApp = document.getElementById('app');


const render = (Component: React.ComponentType<any>) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={ store } >
        <Component />
      </Provider>
    </AppContainer>,
    mountApp
  )
};


render(App);

if (module.hot) {
  
  module.hot.accept('./App', () => { render(App); });
  //module.hot.accept('./App', () => {
  //  const NewApp = require('./App').default;
  //  render(NewApp);
  //});

} 













