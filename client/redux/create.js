import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createPersistor } from 'redux-persist';
import createMiddleware from './middleware/clientMiddleware';
import createReducers from './reducer';

export function inject(store, name, asyncReducer) {
  if (store.asyncReducers[name]) return;

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

// DevTools: https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
export default function createStore(history, client, data, persistConfig = null) {
  console.log('>>>>>>>>>> create > createStore >>>>>>>>>>>>>>>>>>');
  const middleware = [createMiddleware(client), routerMiddleware(history)];

  console.log('>>>>>>>>>> create > createStore > middleware: ', middleware);

  let enhancers = [applyMiddleware(...middleware)];

  console.log('>>>>>>>>>> create > createStore > enhancers: ', enhancers);

  console.log('>>>>>>>>>> create > createStore > CLIENT: ', __CLIENT__);
  console.log('>>>>>>>>>> create > createStore > DEVTOOLS: ', __DEVTOOLS__);
  console.log('>>>>>>>>>> create > createStore > DEVELOPMENT: ', __DEVELOPMENT__);

  if (__CLIENT__ && __DEVTOOLS__) {
    console.log('>>> create > createStore > CLIENT & DEVTOOLS <<<<<<<<<<');
    console.log('>>> create > createStore > CLIENT & DEVTOOLS > window.devToolsExtension: ', window.devToolsExtension);
    // window.devToolsExtension == undefined
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    console.log('>>> create > createStore > CLIENT & DEVTOOLS > DevTools: ', DevTools);
    enhancers = [
      ...enhancers,
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ];
    console.log('>>> create > createStore > CLIENT & DEVTOOLS > enhancers: ', enhancers);
  }

  const finalCreateStore = compose(...enhancers)(_createStore);
  const missingReducers = getMissingReducers(createReducers(), data);
  const store = finalCreateStore(combineReducers(createReducers(missingReducers)), data);

  console.log('>>>>>>>>>> create > createStore > finalCreateStore: ', finalCreateStore);
  console.log('>>>>>>>>>> create > createStore > missingReducers: ', missingReducers);
  console.log('>>>>>>>>>> create > createStore > store: ', store);
  console.log('>>>>>>>>>> create > createStore > persistConfig: ', persistConfig);

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

  return store;
}
