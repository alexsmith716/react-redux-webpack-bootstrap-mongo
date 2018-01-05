
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './components/DevTools/DevTools';
import rootReducer from './reducers';


export function configureStore(initialState = {}) {

  // const middleware = [
  //    thunk,
  //  ];
  // compose(applyMiddleware(...middleware)


  const enhancers = [
    applyMiddleware(thunk),
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));


  if (module.hot) {

    module.hot.accept('./reducers', () => {

      const newReducer = require('./reducers').default;
      store.replaceReducer(newReducer);
      
    });

  }

  return store;
};
