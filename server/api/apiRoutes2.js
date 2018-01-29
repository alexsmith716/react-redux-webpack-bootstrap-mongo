
import express from 'express';

// import { Router } from 'express';

const router = express.Router();

const app = express();

import * as AuthController from './Auth.controller';
import * as LoadController from './Load.controller';

console.error('>>>>>>>>>>>>>>>> apiRoutes2 <<<<<<<<<<<<<<<<<');

//const router = new Router();

app.use((req, res, next) => {
  console.error('>>>>>>>>>>>>>>>> apiRoutes2 > app.use <<<<<<<<<<<<<<<<<');
  next();
});

router.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> apiRoutes2 > router.use > req.method: ', req.method);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> apiRoutes2 > router.use > req.url: ', req.url);
  //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> apiRoutes > router.use > req.headers: ', req.headers);
  //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> apiRoutes > router.use > req.body: ', req.body);
  next();
});


//router.post('/auth/load', AuthController.load);
//router.get('/info/load', LoadController.load);


//router.route('/auth/load').post(AuthController.load);

//router.route('/info/load').get(LoadController.load);


export default router;