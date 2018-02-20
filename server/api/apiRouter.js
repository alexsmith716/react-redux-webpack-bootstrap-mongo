import { Router } from 'express';
import apiRoutes from './apiRoutes';

const router = new Router();

//import apiRoutesTester from './apiRoutesTester';
//import * as AuthController from './controllers/Auth.controller';

router.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>> ApiRouter > ROUTER.USE <<<<<<<<<<<<<<<<<<<<<<<<<<');
  console.log('REQ.ip +++++++++: ', req.ip);
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
  return next();
});

router.route('/auth/load').post(apiRoutes);
router.route('/info/load').get(apiRoutes);

export default router;
