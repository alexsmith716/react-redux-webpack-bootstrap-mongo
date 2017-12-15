
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducers';


export function configureStore(initialState = {}) {

  const enhancers = [
    applyMiddleware(reduxThunk),
  ];

  const store = createStore(reducer, initialState, compose(...enhancers));

  /*
  if (module.hot) {

    module.hot.accept('./reducers', () => {

      const newReducer = require('./reducers').default;

      store.replaceReducer(newReducer);

    });

  }
  */

  return store;

}
