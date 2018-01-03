
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';


export function configureStore(initialState = {}) {

  // const middleware = [
  //    thunk,
  //  ];
  // compose(applyMiddleware(...middleware)


  const enhancers = [
    applyMiddleware(thunk),
  ];

  const store = createStore(rootReducer, initialState, compose(...enhancers));


  if (module.hot) {

    module.hot.accept('./reducers', () => {

      const newReducer = require('./reducers').default;
      store.replaceReducer(newReducer);
      
    });

  }

  return store;
};
