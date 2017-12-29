
import { Router } from 'express';
import { get, update } from '../apiControllers/user';

const router = new Router();


router.use(function (req, res, next) {
  console.log('>>>>>>>>> server > apiRoutes > USER > req.method: ', req.method);
  console.log('>>>>>>>>> server > apiRoutes > USER > req.url: ', req.url);
  //console.log('>>>>>>>>> server > apiRoutes > index > req.headers: ', req.headers);
  //console.log('>>>>>>>>> server > apiRoutes > index > req.body: ', req.body);
  next();
});


router.route('/getusertest').get(get);

//router.route('/getusertest').put(update);


export default router;
