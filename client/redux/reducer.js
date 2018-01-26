
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';

//import app from './reducers/AppContainerReducer';
//import home from './reducers/HomeReducer';
//import user from './reducers/UserReducer';

import auth from './reducers/auth';
import notifs from './reducers/notifs';
import info from './reducers/info';

//     online: (v = true) => v,

export default function createReducers(asyncReducers) {
  return {
    routing: routerReducer,
    reduxAsyncConnect,
    form,
    notifs,
    auth,
    info,
    ...asyncReducers
  };
}
