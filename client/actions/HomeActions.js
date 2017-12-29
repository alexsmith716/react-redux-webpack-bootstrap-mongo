
import { OK } from '../constants/statusCodes';
import { SOMEHOMEACTION_SUCCESS } from '../constants/actionTypes';
// import {  } from './actions/ErrorActions';
import { spinnerOn, spinnerOff } from './AppContainerActions';

import apiHandler from '../services/apiHandler';


export const success = (data) => {
  return {
    type: SOMEHOMEACTION_SUCCESS,
    data,
  };
};


export function getSomeHomeAction() {

  return (dispatch) => {

    dispatch(spinnerOn());

    // dispatch(reset());

    return callApi('home/gethometest')

      .then(res => {

        dispatch(spinnerOff());

        if (res.status !== OK) {
          return dispatch(errorOccurred(res.status, res.json));
        }

        dispatch(success(res.json));

      })


      .catch(err => {

        console.log('>>>>> Client > actions > HomeActions > callApi() > catch(ERROR): ', err);
        dispatch(spinnerOff());
        // dispatch(exceptionOccurred(err));

      });

  };
}