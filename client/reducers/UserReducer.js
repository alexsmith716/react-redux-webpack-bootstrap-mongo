
import {
  USER_GET_SUCCESS,
  USER_SET_SUCCESS,
} from '../constants/actionTypes';


const initialState = {};


const UserReducer = (state = initialState, action) => {

  const { type, ...actionWithoutType } = action;

  switch (action.type) {

    case USER_GET_SUCCESS:
      return { ...state, user: action.json, };

    case USER_SET_SUCCESS:
      return { ...state, userUpdated: true, };

    default:
      return state;

  }

};



export default UserReducer;

