
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

//import { renderRoutes } from 'react-router-config';

//import { configureStore } from './store';
//import IntlWrapper from './components/Intl/IntlWrapper';
import App from './containers/App';

// app mount point in index.html
const mountApp = document.getElementById('app');

// initialize store
//const store = configureStore(window.__INITIAL_STATE__);



const Component = () => (

  <Provider key="provider">
    <Router>
      <App />
      // {renderRoutes(routes)}
    </Router>
  </Provider>

);


window.onload = () => {

  ReactDOM.hydrate(
    <Component />,
    mountApp
  )

};


/*
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

};
*/

