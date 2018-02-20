import cookie from 'cookie';
import config from '../config';
import actions from './actions';

import { mapUrl, parseToken } from './common/utils';

const apiRoutes = async (req,res) => {

  // Url template: /auth/login
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > REQ.ip +++++: ', req.ip);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > REQ.method +++++: ', req.method);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > REQ.url ++++++++: ', req.url);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > REQ.headers ++++: ', req.headers);
  console.log('>>>>>>>>>>>>>>>>> ApiRoutes > req.session: ', req.session);

  console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > YES action: ', action);

  if (action) {
    const token = cookie.parse(req.headers.cookie || '').accessToken;
    console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > YES TOKEN: ', token);
    if (token) {
      console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > YES token: ', token);
      req.session.user = parseToken(token).sub;
      console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > YES token > req.session.user: ', req.session.user);
    }

    try {
      const result = await action(req, params);

      console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > try > result 0 <<<<<<<<<<:', result);

      if (result.isAnonymous) {
        console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > try > result 1 <<<<<<<<<<');
        return res.end();
      }

      if (result instanceof Function) {
        console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > try > result 2 <<<<<<<<<<');
        result(res);
      } else {
        console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > try > res.json(result) <<<<<<<<<<:', result);
        res.json(result);
      }
    } catch (error) {
      console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > catch > error:', error);
      if (error.redirect) {
        return res.redirect(error.redirect);
      }

      console.error('API ERROR:', pretty.render(error));
      res.status(error.status || 500).json(error);
    }
  } else {
    console.log('>>>>>>>>>>>>>>>>>>>>> ApiRoutes > NO action: ', action);
    res.status(404).end('NOT FOUND');
  }
};

export default apiRoutes;
