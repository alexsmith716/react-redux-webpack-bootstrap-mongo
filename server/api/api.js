
import express from 'express';

//import config from '../config';
import actions from './actions';
//import { mapUrl, parseToken } from './common/utils';
import { mapUrl } from './common/utils';

const app = express();

console.error('>>>>>>>>>>>>>>>> server > appApi > api <<<<<<<<<<<<<<<<<');

app.use(async (req, res) => {

  console.error('>>>>>> server > server > appApi > api > app.use() > req.url: ', req.url);
  
  // Url template: /auth/login
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  console.error('>>>>>> server > server > appApi > api > app.use() > splittedUrlPath: ', splittedUrlPath);

  /*
  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {

    try {

      const result = await action(req, params);

      if (result.isAnonymous) {
        return res.end();
      }

      if (result instanceof Function) {
        result(res);
      } else {
        res.json(result);
      }

    } catch (error) {

      if (error.redirect) {
        return res.redirect(error.redirect);
      }

      console.error('API ERROR:', pretty.render(error));
      res.status(error.status || 500).json(error);

    }

  } else {

    res.status(404).end('NOT FOUND');

  }
  */

});

