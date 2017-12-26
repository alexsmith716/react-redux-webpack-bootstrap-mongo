

import { SPINNER_ON, SPINNER_OFF, REGISTERED, LOGGED_IN, LOGGED_OUT } from 'constants/actionTypes';


export function spinnerOn() {
  return {
    type: SPINNER_ON,
  };
}

export function spinnerOff() {
  return {
    type: SPINNER_OFF,
  };
}

export function registered() {
  return {
    type: REGISTERED,
  };
}

export function loggedIn() {
  return {
    type: LOGGED_IN,
  };
}

export function loggedOut() {
  return {
    type: LOGGED_OUT,
  };
}
