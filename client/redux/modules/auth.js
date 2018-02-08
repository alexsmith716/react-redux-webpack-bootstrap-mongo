import { SubmissionError } from 'redux-form';
import jsCookie from 'js-cookie';

import { LOAD } from '../../constants/actionTypes';
import { LOAD_SUCCESS } from '../../constants/actionTypes';
import { LOAD_FAIL } from '../../constants/actionTypes';
import { LOGIN } from '../../constants/actionTypes';
import { LOGIN_SUCCESS } from '../../constants/actionTypes';
import { LOGIN_FAIL } from '../../constants/actionTypes';
import { REGISTER } from '../../constants/actionTypes';
import { REGISTER_SUCCESS } from '../../constants/actionTypes';
import { REGISTER_FAIL } from '../../constants/actionTypes';
import { LOGOUT } from '../../constants/actionTypes';

console.log('>>>>>>>> auth.js <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        accessToken: action.result.accessToken,
        user: action.result.user
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        accessToken: action.result.accessToken,
        user: action.result.user
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registeringIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registeringIn: false,
        registerError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        user: null
      };
    default:
      return state;
  }
}

const catchValidation = error => {
  if (error.message) {
    if (error.message === 'Validation failed' && error.data) {
      throw new SubmissionError(error.data);
    }
    throw new SubmissionError({ _error: error.message });
  }
  return Promise.reject(error);
};

/*
* Actions
*/

export function isAuthenticated(state) {
  return state.auth && state.auth.user;
}

export function isAuthLoaded(state) {
  return state.auth && state.auth.loaded;
}

export function loadAuth() {
  console.log('>>>>>>>>>>>>>>>>>> auth.js > loadAuth > __SERVER__: ', __SERVER__);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: async client => {
      const result = await client.post('/api/auth/load');
      return result;
    }
  };
}

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: async client => {
      const result = client.post('/auth/register', { ...data, fullName: 'AuthJSFullName' });
      return result;
    }
  };
}

export function login(data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: async client => {
      try {
        const result = await client.post('/auth/login', { ...data, source: 'webapp' });
        jsCookie.set('accessToken', result.accessToken);
        return result;
      } catch (error) {
        return catchValidation(error);
      }
    }
  };
}

export function logout() {
  jsCookie.remove('accessToken');
  return {
    type: LOGOUT
  };
}
