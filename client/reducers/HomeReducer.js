
import { SOMEHOMEACTION_SUCCESS } from '../constants/actionTypes';


const initialState = { data: {} };


const HomeReducer = (state = initialState, action) => {

  switch (action.type) {

    case SOMEHOMEACTION_SUCCESS:
      return { ...state, data: action.data };

    default:
      return state;

  }

};


export default HomeReducer;

