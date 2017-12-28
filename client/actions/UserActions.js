
import { OK, ACCEPTED } from 'constants/statusTypes';
import { USER_GET_SUCCESS, USER_SET_SUCCESS } from '../constants/actionTypes';

//import { errorOccurred, exceptionOccurred } from './actions/ErrorActions';
import { spinnerOn, spinnerOff, registered, } from './actions/AppContainerActions';

import apiHandler from '../../services/apiHandler';


export function getSuccess(json) {
  return {
    type: USER_GET_SUCCESS,
    json,
  };
};

export function setSuccess(json) {
  return {
    type: USER_SET_SUCCESS,
    json,
  };
};


export function getUser() {

  console.log('>>>>>>>>>>> Client > UserActions > getUser() <<<<<<<<<<<<');

  return (dispatch) => {

    dispatch(spinnerOn());

    return apiHandler('user/me')
      .then(res => {
        dispatch(spinnerOff());
        if (res.status !== OK) {
          return dispatch(errorOccurred(res.status, res.json));
        }
        if (res.json) {
          console.log('>>>>>>>>>>> Client > UserActions > getUser() > USER - RES');
          console.log(res);

          console.log('>>>>>>>>>>> Client > UserActions > getUser() > USER - RES.JSON');
          console.log(res.json);

          if (res.json && res.json.other) {
            console.log('>>>>>>>>>>> Client > UserActions > getUser() > USER - RES.JSON.OTHER');
            console.log(res.json.other);

            const other = res.json.other;
            if (other.registeredUser) {
              console.log('>>>>>>>>>>> Client > UserActions > getUser() > USER - FIRING REGISTERED');
              dispatch(registered());
            }
            if (other.termsAccepted) {
              console.log('>>>>>>>>>>> Client > UserActions > getUser() > USER - FIRING TERMS_ACCEPTED');
              dispatch(termsAccepted());
            }
          }
          dispatch(getSuccess(res.json));
        }

      })
      .catch(err => {
        console.log('>>>>>>>>>>> UserActions > CRASHED GET - USER ACTIONS <<<<<<<<<<<<');
        dispatch(spinnerOff());
        dispatch(exceptionOccurred(err));
      });

  };
};


export function setUser(data) {

  console.log('>>>>>>>>>>> Client > UserActions > setUser() <<<<<<<<<<<<');

  return (dispatch) => {

    dispatch(spinnerOn());

    return apiHandler('user/me', 'put', data)
      .then(res => {
        dispatch(spinnerOff());
        if (res.status !== ACCEPTED) {
          return dispatch(errorOccurred(res.status, res.json));
        }
        dispatch(setSuccess(res.json));
      })
      .catch(err => {
        console.log('>>>>>>>>>>> Client > UserActions > getUser() > CRASHED SET - USER ACTIONS');
        dispatch(spinnerOff());
        dispatch(exceptionOccurred(err));
      });

  };
};
