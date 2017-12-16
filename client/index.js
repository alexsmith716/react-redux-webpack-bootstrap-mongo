
import React from 'react';
//import { render } from 'react-dom';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { configureStore } from './store';
import IntlWrapper from './components/Intl/IntlWrapper';
import App from './App';

// app mount point in index.html
const mountApp = document.getElementById('app');

// initialize store
const store = configureStore(window.__INITIAL_STATE__);


// hot-module replacement
const mount = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <IntlWrapper>
          <Component />
        </IntlWrapper>
      </Provider>
    </AppContainer>,
    mountApp
  );
};


mount(App);

if (module.hot) {

  module.hot.accept('./App', () => {

    mount(App);
    
  });

}