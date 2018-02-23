import cookie from 'cookie';
import config from '../config';
import actions from './actions';

import { mapUrl, parseToken } from './common/utils';

const apiRoutes = async (req,res) => {
  console.log('>>>>>>>>>>>> ApiRoutes.JS > REQ.ip +++++++++: ', req.ip);
  console.log('>>>>>>>>>>>> ApiRoutes.JS > REQ.method +++++: ', req.method);
  console.log('>>>>>>>>>>>> ApiRoutes.JS > REQ.url ++++++++: ', req.url);
  console.log('>>>>>>>>>>>> ApiRoutes.JS > REQ.headers ++++: ', req.headers);
  console.log('>>>>>>>>>>>> ApiRoutes.JS > REQ.session ++++: ', req.session);
  // Url template: /auth/login
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {
    console.log('>>>>>>>>>>>> API.JS > YES ACTION: ', action);
    const token = cookie.parse(req.headers.cookie || '').accessToken;
    console.log('>>>>>>>>>>>> ApiRoutes.JS > TOKEN: ', token);
    if (token) {
      console.log('>>>>>>>>>>>> ApiRoutes.JS > YES token: ', token);
      req.session.user = parseToken(token).sub;
      console.log('>>>>>>>>>>>> ApiRoutes.JS > YES token > req.session.user: ', req.session.user);
    }

    try {
      const result = await action(req, params);

      console.log('>>>>>>>>>>>> ApiRoutes.JS > try > result 0 <<<<<<<<<<:', result);

      if (result.isAnonymous) {
        console.log('>>>>>>>>>>>> ApiRoutes.JS > try > result 1 <<<<<<<<<<');
        return res.end();
      }

      if (result instanceof Function) {
        console.log('>>>>>>>>>>>> ApiRoutes.JS > try > result 2 <<<<<<<<<<');
        result(res);
      } else {
        console.log('>>>>>>>>>>>> ApiRoutes.JS > try > res.json(result) <<<<<<<<<<:', result);
        res.json(result);
      }
    } catch (error) {
      console.log('>>>>>>>>>>>> ApiRoutes.JS > catch > error:', error);
      if (error.redirect) {
        return res.redirect(error.redirect);
      }

      console.error('API ERROR:', pretty.render(error));
      res.status(error.status || 500).json(error);
    }
  } else {
    console.log('>>>>>>>>>>>> ApiRoutes.JS > NO action: ', action);
    res.status(404).end('NOT FOUND');
  }
};

export default apiRoutes;
