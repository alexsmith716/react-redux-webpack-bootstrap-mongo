
import axios from 'axios';
import fetch from 'isomorphic-fetch';
import promises from 'es6-promise';
//import dotenv from 'dotenv';
//dotenv.config();
// or maybe use some other HTTP request module for requests;
// https://github.com/github/fetch

const apiPrefix = 'http://localhost:3000';

promises.polyfill();


// http://127.0.0.1:3000/api/logincredentials

export const API_ROOT = '/api/';

export const API_URL = 'http://http://127.0.0.1:3000/api/'


export default function apiHandler (endpoint, method = 'get', body) {

  console.log('>>>>>>>>>>> Client > apiHandler > apiHandler() <<<<<<<<<<<<');

  //const url = `${API_URL}/${endpoint}`;

  const url = 'http://127.0.0.1:3000/api/user/getusertest'

  const headers = {
    'content-type': 'application/json'
  };


  // Sending cookies
  // To automatically send cookies for the current domain,
  //  the credentials option must be provided:
  // The "same-origin" value makes fetch behave similarly to XMLHttpRequest with regards to cookies. 
  // Otherwise, cookies won't get sent, resulting in these requests not preserving the authentication session.
  // For CORS requests, use the "include" value to allow sending credentials to other domains:

  return fetch(url, {
    credentials: 'include',
    //credentials: 'same-origin',
    headers,
    method,
    body: JSON.stringify(body),
  })
    .then(response => response.json().then(json => ({ json, response })))

    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })

    .then(
      response => response,
      error => error
    );

}