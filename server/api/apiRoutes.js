import cookie from 'cookie';
import config from '../config';
import actions from './actions';

import { mapUrl, parseToken } from './common/utils';

const apiRoutes = async (req,res) => {
  console.log('>>>>>>>>>>>> Api.JS > async > REQ > START $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
  console.log('>>>>>>>>>>>> Api.JS > async > REQ.ip +++++++++: ', req.ip);
  console.log('>>>>>>>>>>>> Api.JS > async > REQ.method +++++: ', req.method);
  console.log('>>>>>>>>>>>> Api.JS > async > REQ.url ++++++++: ', req.url);
  console.log('>>>>>>>>>>>> Api.JS > async > REQ.headers ++++: ', req.headers);
  console.log('>>>>>>>>>>>> Api.JS > async > REQ.session ++++: ', req.session);

  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  console.log('>>>>>>>>>>>> Api.JS > async > mapUrl > action: ', action);
  console.log('>>>>>>>>>>>> Api.JS > async > mapUrl > params: ', params);
  console.log('>>>>>>>>>>>> Api.JS > async > mapUrl > REQ.headers.cookie: ', req.headers.cookie);

  if (action) {
    const token = cookie.parse(req.headers.cookie || '').accessToken;
    if (token) {
      req.session.user = parseToken(token).sub;
    }

    console.log('>>>>>>>>>>>> Api.JS > async > Token: ', token);
    console.log('>>>>>>>>>>>> Api.JS > async > REQ.session.user: ', req.session.user);

    try {
      const result = await action(req, params);
      if (result.isAnonymous) {
        console.log('>>>>>>>>>>>> Api.JS > async > RES > END 1 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        return res.end();
      }

      if (result instanceof Function) {
        console.log('>>>>>>>>>>>> Api.JS > async > RES > END 2 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        result(res);
      } else {
        console.log('>>>>>>>>>>>> Api.JS > async > RES > END 3 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        res.json(result);
      }
    } catch (error) {
      if (error.redirect) {
        console.log('>>>>>>>>>>>> Api.JS > async > RES > END 4 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        return res.redirect(error.redirect);
      }

      console.error('API ERROR:', pretty.render(error));
      console.log('>>>>>>>>>>>> Api.JS > async > RES > END 5 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      res.status(error.status || 500).json(error);
    }
  } else {
    console.log('>>>>>>>>>>>> Api.JS > async > RES > END 6 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    res.status(404).end('NOT FOUND');
  }
};

export default apiRoutes;
