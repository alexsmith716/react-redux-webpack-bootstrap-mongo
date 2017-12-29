
import { combineReducers } from 'redux';


import app from './reducers/AppContainerReducer';
import home from './reducers/HomeReducer';
import user from './reducers/UserReducer';


export default combineReducers({
  app,
  home,
  user,
});