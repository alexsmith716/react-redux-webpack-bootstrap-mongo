
import {
  SPINNER_ON,
  SPINNER_OFF,
  REGISTERED,
  LOGGED_IN,
  LOGGED_OUT,
} from '../constants/actionTypes';

const initialState = {
  spinner: false,
  registered: false,
  loggedIn: false,
};

const AppContainerReducer = (state = initialState, action) => {

  switch (action.type) {

    case SPINNER_ON:
      return {
        ...state,
        spinner: true,
      };

    case SPINNER_OFF:
      return {
        ...state,
        spinner: false,
      };

    case REGISTERED:
      return {
        ...state,
        registered: true,
      };

    case LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };

    case LOGGED_OUT:
      return {
        ...state,
        loggedIn: false,
      };

    default:
      return state;
  }

};

export const isSpinnerOn = state => !!state.app.spinner;
export const isRegistered = state => !!state.app.registered;
export const isLoggedIn = state => !!state.app.loggedIn;

export default AppContainerReducer;


