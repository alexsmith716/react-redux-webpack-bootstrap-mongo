import axios from 'axios';
import config from '../config';
// baseURL: __SERVER__ ? 'http://localhost:3000' : '/api'

export default function apiClient(req) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000'
  });

  const foo = __SERVER__ ? 'http://localhost:3000' : '/api';
  console.log('> ApiClient.JS || AXIOS > baseURL: ', foo);

  let token;

  instance.setJwtToken = newToken => {
    token = newToken;
  };

  instance.interceptors.request.use(
    conf => {
      if (__SERVER__) {
        console.log('> ApiClient.JS || AXIOS > instance.interceptors.request.use1');
        if (req.header('cookie')) {
          conf.headers.Cookie = req.header('cookie');
          console.log('> ApiClient.JS || AXIOS > instance.interceptors.request.use2: ', conf.headers.Cookie);
        }
        if (req.header('authorization')) {
          conf.headers.authorization = token || req.header('authorization') || '';
          console.log('> ApiClient.JS || AXIOS > instance.interceptors.request.use3: ', conf.headers.authorization);
        }
      }
      return conf;
    },
    error => {
      console.log('> ApiClient.JS || AXIOS > instance.interceptors.request.use4');
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      console.log('> ApiClient.JS || AXIOS > instance.interceptors.request.use5');
      return response.data;
    },
    error => {
      console.log('> ApiClient.JS || AXIOS > instance.interceptors.request.use6');
      Promise.reject(error.response ? error.response.data : error);
    }
  );

  console.log('> ApiClient.JS || AXIOS > instance: ', instance);

  return instance;
}
