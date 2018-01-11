
import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from 'react-dom';
//import { BrowserRouter as Router } from 'react-router-dom';
//import BrowserRouter from 'react-router-dom/BrowserRouter';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

//window.$ = window.jQuery = require("jquery");
//import 'bootstrap';
import routes from './routes';


import { configureStore } from './store';
const store = configureStore(window.__INITIAL_STATE__);

import App from './App';

const mountApp = document.getElementById('app');


const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    mountApp
  )
};



if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    render(NewApp);
  });
}
render(App);

