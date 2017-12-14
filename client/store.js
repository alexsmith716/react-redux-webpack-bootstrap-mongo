
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


export function configureStore(state = {}) {

  const enhancers = [
    applyMiddleware(thunk),
  ];

  const store = createStore(reducer, state, compose(...enhancers));

  /*
  if (module.hot) {

    module.hot.accept('./reducers', () => {

      const newReducer = require('./reducers').default;

    });

  }
  */
  
  return store;

}
