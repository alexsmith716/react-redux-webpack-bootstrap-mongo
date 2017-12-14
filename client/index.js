
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { configureStore } from './store';
import App from './App';

// app mount point in index.html
const mountApp = document.getElementById('app');

// initialize store
const store = configureStore(window.__INITIAL_STATE__);


// hot-module replacement
const mount = Component => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    mountApp
  );
};


mount(App);

if (module.hot) {
  module.hot.accept('./App', () => { mount(App); });
}