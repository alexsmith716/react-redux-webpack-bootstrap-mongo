
import { combineReducers } from 'redux';


import app from './reducers/AppReducer';
import home from './reducers/HomeReducer';
import error from './reducers/ErrorReducer';


export default combineReducers({
  app,
  home,
  error,
});
