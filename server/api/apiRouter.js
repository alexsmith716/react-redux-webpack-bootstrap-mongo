import { Router } from 'express';
import apiRoutes from './apiRoutes';

const router = new Router();

//import apiRoutesTester from './apiRoutesTester';
//import * as AuthController from './controllers/Auth.controller';

router.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>> ApiRouter.js > REQ.ip +++++++++: ', req.ip);
  console.log('>>>>>>>>>>>>>>>>> ApiRouter.js > REQ.method +++++: ', req.method);
  console.log('>>>>>>>>>>>>>>>>> ApiRouter.js > REQ.url ++++++++: ', req.url);
  return next();
});

router.route('/auth/load').post(apiRoutes);
router.route('/info/load').get(apiRoutes);

export default router;
