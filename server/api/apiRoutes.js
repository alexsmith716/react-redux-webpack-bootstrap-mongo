import cookie from 'cookie';
import config from '../config';
import actions from './actions';
import { mapUrl, parseToken } from './common/utils';

// actions: (login, logout, register)
// req.url:  /auth/load
// splittedUrlPath:  [ 'auth', 'load' ]

const apiRoutes = async (req,res) => {

  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > __CLIENT__: ', __CLIENT__);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > __SERVER__: ', __SERVER__);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > __DEVTOOLS__: ', __DEVTOOLS__);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > __DEVELOPMENT__: ', __DEVELOPMENT__);

  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > REQ.ip +++++: ', req.ip);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > REQ.method +++++: ', req.method);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > REQ.url ++++++++: ', req.url);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > REQ.headers ++++: ', req.headers);

  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {
    const token = cookie.parse(req.headers.cookie || '').accessToken;
    console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > YES action: ', action);
    console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > action > req.headers: ', req.headers);

    if (token) {
      console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > token: ', token);
      req.session.user = parseToken(token).sub;
      console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > token > req.session.user: ', req.session.user);
    }

    try {
      const result = await action(req, params);

      console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > try > result: ', result);

      if (result.isAnonymous) {
        return res.end();
      }

      if (result instanceof Function) {
        result(res);
      } else {
        console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > try > res.json(result): ', result);
        res.json(result);
      }
    } catch (error) {
      if (error.redirect) {
        return res.redirect(error.redirect);
      }

      console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > catch > error:', error);
      res.status(error.status || 500).json(error);
    }
  } else {
    console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > NO action: ', action);
    res.status(404).end('NOT FOUND');
  }
};

export default apiRoutes;
