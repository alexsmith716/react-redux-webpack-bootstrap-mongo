import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createPersistor } from 'redux-persist';
import createMiddleware from './middleware/clientMiddleware';
import createReducers from './reducer';

export function inject(store, name, asyncReducer) {
  console.log('>>>>>>>>> CREATE.JS > INJECT 111111');
  if (store.asyncReducers[name]) return;
  console.log('>>>>>>>>> CREATE.JS > INJECT 222222');
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(combineReducers(createReducers(store.asyncReducers)));
}

function getMissingReducers(reducers, data) {
  if (!data) return {};
  return Object.keys(data).reduce(
    (prev, next) => (reducers[next] ? prev : { ...prev, [next]: (state = {}) => state }),
    {}
  );
}

export default function createStore(history, client, data, persistConfig = null) {
  const middleware = [createMiddleware(client), routerMiddleware(history)];
  console.log('>>>>>>>>> CREATE.JS > middleware: ', middleware);
  let enhancers = [applyMiddleware(...middleware)];
  
  if (__CLIENT__ && __DEVTOOLS__) {
    console.log('>>>>>>>>> CREATE.JS > __CLIENT__ %% __DEVTOOLS__');
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    enhancers = [
      ...enhancers,
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ];
    console.log('>>>>>>>>> CREATE.JS > __CLIENT__ %% __DEVTOOLS__ > enhancers: ', enhancers);
  }

  console.log('>>>>>>>>> CREATE.JS > enhancers: ', enhancers);
  console.log('>>>>>>>>> CREATE.JS > persistConfig: ', persistConfig);

  const finalCreateStore = compose(...enhancers)(_createStore);
  const missingReducers = getMissingReducers(createReducers(), data);
  const store = finalCreateStore(combineReducers(createReducers(missingReducers)), data);

  store.asyncReducers = {};
  store.inject = inject.bind(null, store);

  if (persistConfig) {
    createPersistor(store, persistConfig);
    store.dispatch({ type: 'PERSIST' });
  }

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      const reducer = require('./reducer');
      store.replaceReducer(combineReducers((reducer.default || reducer)(store.asyncReducers)));
    });
  }
  console.log('>>>>>>>>> CREATE.JS > store: ', store);
  return store;
}
