
import { Router } from 'express';
const router = new Router();

//import { authorize, registeredOnly, jwtAuthAPI, ensureAuthenticated } from 'lib/auth';
//import {accessControlheaders } from 'lib/headers';

router.use(function (req, res, next) {
  console.log('>>>>>>>>> server > apiRoutes > index > req.method: ', req.method);
  console.log('>>>>>>>>> server > apiRoutes > index > req.url: ', req.url);
  //console.log('>>>>>>>>> server > apiRoutes > index > req.headers: ', req.headers);
  //console.log('>>>>>>>>> server > apiRoutes > index > req.body: ', req.body);
  next();
});

//router.use(accessControlheaders);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//router.get('/index', apiControllers.getIndex)
//router.get('/indexview/init', apiControllers.ajaxIndexViewInit)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//router.get('/loginview/init', apiControllers.ajaxLoginViewInit)
//router.get('/userhomeview/init', apiControllers.ajaxUserHomeViewInit)
//router.get('/resourcesview/init', apiControllers.ajaxResourcesViewInit)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//router.post('/logincredentials', csrfProtection, apiControllers.doLoginCredentials)
// router.get('/loginuser', csrfProtection, auth.jwtAuthAPI, apiControllers.doLoginUser)
//router.post('/loginuserhome', auth.jwtAuthAPI, apiControllers.doLoginUserHome)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//router.post('/signupuser', csrfProtection, apiControllers.ajaxSignUpUser)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


export default router;


// router.METHOD(path, [callback, ...] callback) +++++++++++++++++++++++++++++++++++++++++++++++
// * The router.METHOD() methods provide the routing functionality in Express,
//     where METHOD is one of the HTTP methods, such as GET, PUT, POST, and so on, in lowercase. 
// * Thus, the actual methods are router.get(), router.post(), router.put(), and so on.
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// router.route(path) ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// * Returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware. 
// * Use router.route() to avoid duplicate route naming and thus typo errors.
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
