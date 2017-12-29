
import status from 'http-status';

const sendResponseWithStatus = (status, res, json, token) => {
  const response = {
    status,
    token,
    json,
  };
  console.log('>>>>>>>>> server > sendHttpResponse > sendResponseWithStatus > response: ', response);
  res.json(response);
};

export const sendOKResponse = (res, json, token) => {
  sendResponseWithStatus(status.OK, res, json, token);
};

export const sendCreatedResponse = (res, json, token) => {
  sendResponseWithStatus(status.CREATED, res, json, token);
};

export const sendAcceptResponse = (res, json, token) => {
  sendResponseWithStatus(status.ACCEPTED, res, json, token);
};

export const sendNoContentResponse = (res, message = 'No Contents') => {
  const json = {
    message,
  };
  sendResponseWithStatus(status.NO_CONTENT, res, json);
};

export const sendBadRequestResponse = (res, message = 'Bad Request', err = {}) => {
  const json = {
    error: 'badrequest',
    message,
    err,
  };
  sendResponseWithStatus(status.BAD_REQUEST, res, json);
};

export const sendUnauthorizedResponse = (res, message = 'You are unauthorized for this request', err = {}) => {
  const json = {
    error: 'unauthorized',
    message,
    err,
  };
  sendResponseWithStatus(status.UNAUTHORIZED, res, json);
};

export const sendForbiddenResponse = (res, message = 'You are forbidden to make this request', err = {}) => {
  const json = {
    error: 'forbidden',
    message,
    err,
  };
  sendResponseWithStatus(status.FORBIDDEN, res, json);
};

export const sendErrorResponse = (res, message = 'internal server error', err = {}) => {
  const json = {
    error: 'internalservererror',
    message,
    err,
  };
  sendResponseWithStatus(status.INTERNAL_SERVER_ERROR, res, json);
};

export const sendConflictResponse = (res, message = 'conflict') => {
  const json = {
    message,
  };
  sendResponseWithStatus(status.CONFLICT, res, json);
};
