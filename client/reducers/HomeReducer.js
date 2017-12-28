
//import { SOME_HOME_ACTION } from 'constants/actionTypes';


const initialState = { data: {} };


const HomeReducer = (state = initialState, action) => {

  switch (action.type) {

    //case SOME_HOME_ACTION:
      return { ...state, data: action.data };

    default:
      return state;

  }

};


export default HomeReducer;

