
import ejwt from 'express-jwt';
import status from 'http-status';


export function authorize(req, res, next) {
  console.log('>>>>>>>>> server > lib > auth > authorize <<<<<<<<<<<<');
  next();
};

export function registeredOnly(req, res, next) {
  console.log('>>>>>>>>> server > lib > auth > registeredOnly <<<<<<<<<<<<');
  next();
};

export function jwtAuthAPI(req, res, next) {
  console.log('>>>>>>>>> server > lib > auth > jwtAuthAPI <<<<<<<<<<<<');
  next();
};

export function ensureAuthenticated(req, res, next) {
  console.log('>>>>>>>>> server > lib > auth > ensureAuthenticated <<<<<<<<<<<<');
  next();
};
