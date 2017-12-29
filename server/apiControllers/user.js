
import objectPath from 'object-path';

import { sendOKResponse, sendNoContentResponse, sendAcceptResponse, sendErrorResponse } from '../lib/sendHttpResponse';


/*
var sendJSONresponse = function (res, status, content) {
  res.status(status)
  res.json(content)
};
module.exports.getIndexResponse = function (req, res) {
  sendJSONresponse(res, 200, { 'response': 'success' })
};
*/


export const get = (req, res, next) => {

  console.log('>>>>>>>>>>> Server > apiControllers > user > get() <<<<<<<<<<<<');

  const json = { 'response': 'success' };

  // sendOKResponse = (res, json, token)
  sendOKResponse(res, json);

};


/*
import objectPath from 'object-path';

import { sendOKResponse, sendNoContentResponse, sendAcceptResponse, sendErrorResponse } from '../lib/sendHttpResponse';

let json = {};

export const get = (req, res, next) => {

  json.response = 'success';

  const user = req.user ? json.user = req.user : json.user = 'NO USER';

  console.log('>>>>>>>>> server > apiControllers > USER > get() > SUCCESS > JSON: ', json);

  sendOKResponse(res, json);

};
*/