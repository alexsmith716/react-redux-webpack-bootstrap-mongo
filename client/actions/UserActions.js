
import { OK, ACCEPTED } from '../constants/statusCodes';
import { USER_GET_SUCCESS, USER_SET_SUCCESS } from '../constants/actionTypes';

//import { errorOccurred, exceptionOccurred } from './ErrorActions';
import { spinnerOn, spinnerOff, registered, } from './AppContainerActions';

import apiHandler from '../services/apiHandler';


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

    return apiHandler('user/getusertest')

      .then(res => {

        dispatch(spinnerOff());

        if (res.status !== OK) {

          console.log('>>>>>>>>>>> Client > UserActions > getUser() > apiHandler() > res.status !== OK > res.status: ', res.status);
          console.log('>>>>>>>>>>> Client > UserActions > getUser()  apiHandler() > res.status !== OK > res.json: ', res.json);
          //return dispatch(errorOccurred(res.status, res.json));
          
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

          }

          dispatch(getSuccess(res.json));
        }

      })

      .catch(err => {
        console.log('>>>>>>>>>>> Client > UserActions > getUser() > catch(err)', err);
        dispatch(spinnerOff());
        //dispatch(exceptionOccurred(err));
      });

  };
};


export function setUser(data) {

  console.log('>>>>>>>>>>> Client > UserActions > setUser() <<<<<<<<<<<<');

  return (dispatch) => {

    dispatch(spinnerOn());

    return apiHandler('user/getusertest', 'put', data)

      .then(res => {

        dispatch(spinnerOff());

        if (res.status !== ACCEPTED) {
          console.log('>>>>>>>>>>> Client > UserActions > setUser() > apiHandler() > res.status !== ACCEPTED > res.status: ', res.status);
          console.log('>>>>>>>>>>> Client > UserActions > setUser() > apiHandler() > res.status !== ACCEPTED > res.json: ', res.json);
          //return dispatch(errorOccurred(res.status, res.json));
        }

        dispatch(setSuccess(res.json));

      })

      .catch(err => {

        console.log('>>>>>>>>>>> Client > UserActions > setUser() > apiHandler() > catch(err)', err);
        dispatch(spinnerOff());
        //dispatch(exceptionOccurred(err));

      });

  };
};
