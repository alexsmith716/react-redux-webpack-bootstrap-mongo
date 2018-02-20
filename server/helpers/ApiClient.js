import axios from 'axios';
import config from '../config';

export default function apiClient(req) {
  const instance = axios.create({
    baseURL: __SERVER__ ? `http://${config.apiHost}:${config.apiPort}` : '/api'
  });

  const foo = __SERVER__ ? `http://${config.apiHost}:${config.apiPort}` : '/api';
  console.log('>>>>>>>>>>> ApiClient.JS || AXIOS > baseURL: ', foo);

  let token;

  instance.setJwtToken = newToken => {
    token = newToken;
  };

  instance.interceptors.request.use(
    conf => {
      if (__SERVER__) {
        if (req.header('cookie')) {
          conf.headers.Cookie = req.header('cookie');
        }
        if (req.header('authorization')) {
          conf.headers.authorization = token || req.header('authorization') || '';
        }
      }
      return conf;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response ? error.response.data : error)
  );

  console.log('>>>>>>>>>>> ApiClient.JS || AXIOS > instance: ', instance);

  return instance;
}
