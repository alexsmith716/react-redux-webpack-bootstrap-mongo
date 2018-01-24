
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import { reducer as form } from 'redux-form';
import app from './reducers/AppContainerReducer';
import home from './reducers/HomeReducer';
import user from './reducers/UserReducer';


export default function createReducers(asyncReducers) {
  return {
    routing: routerReducer,
    reduxAsyncConnect,
    online: (v = true) => v,
    app,
    home,
    user,
    ...asyncReducers
  };
}
