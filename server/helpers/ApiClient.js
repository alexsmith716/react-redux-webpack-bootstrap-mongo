import axios from 'axios';
import config from '../config';


// FILE IS CLIENT SIDE ++++++++++++++++++++++++++++++++++++++++++++++++++++++

export default function apiClient(req) {
  const voo = { baseURL: __SERVER__ ? `http://${config.apiHost}:${config.apiPort}` : '/api' };
  console.log('>>>>>>>>>>>>>> ApiClient() > __SERVER__ > config.host: ', config.host);
  console.log('>>>>>>>>>>>>>> ApiClient() > __SERVER__ > config.port: ', config.port);
  console.log('>>>>>>>>>>>>>> ApiClient() > __SERVER__ > config.apiHost: ', config.apiHost);
  console.log('>>>>>>>>>>>>>> ApiClient() > __SERVER__ > config.apiPort: ', config.apiPort);
  console.log('>>>>>>>>>>>>>> ApiClient() > __SERVER__ > baseURL: ', voo);
  const instance = axios.create({
    baseURL: __SERVER__ ? `http://${config.apiHost}:${config.apiPort}` : '/api'
  });

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

  return instance;
}
