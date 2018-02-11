import cookie from 'cookie';
import config from '../config';
import actions from './actions';
import { mapUrl, parseToken } from './common/utils';

// actions: (login, logout, register)
// req.url:  /auth/load
// splittedUrlPath:  [ 'auth', 'load' ]

const apiRoutes = async (req,res) => {

  console.log('>>>>>>>>>>>>>>>>> !!!!!!!!!!! apiRoutes - app.use !!!!!!!!!!!! <<<<<<<<<<<<<<<<<<<');
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {
    const token = cookie.parse(req.headers.cookie || '').accessToken;
    console.log('>>>>>>>>>>>>>>>>>>>>> apiRoutes > apiRoutes > async > try > req.headers?: ', req.headers);
    console.log('>>>>>>>>>>>>>>>>>>>>> apiRoutes > apiRoutes > async > try > token?: ', token);
    if (token) {
      req.session.user = parseToken(token).sub;
      console.log('>>>>>>>>>>>>>>>>>>>>> apiRoutes > apiRoutes > async > try > req.session.user: ', req.session.user);
    }

    try {
      const result = await action(req, params);

      console.log('>>>>>>>>>>>>>>>>>>>>> apiRoutes > apiRoutes > async > try > result: ', result);

      if (result.isAnonymous) {
        return res.end();
      }

      if (result instanceof Function) {
        result(res);
      } else {
        console.log('>>>>>>>>>>>>>>>>>>>>> apiRoutes > apiRoutes > async > try > res.json(result): ', result);
        res.json(result);
      }
    } catch (error) {
      if (error.redirect) {
        return res.redirect(error.redirect);
      }

      console.log('>>>>>>>>>>>>>>>>>>>>> apiRoutes > catch > error:', error);
      res.status(error.status || 500).json(error);
    }
  } else {
    res.status(404).end('NOT FOUND');
  }
};

export default apiRoutes;
