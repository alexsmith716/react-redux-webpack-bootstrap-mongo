
import axios from 'axios';
import fetch from 'isomorphic-fetch';
import promises from 'es6-promise';
import dotenv from 'dotenv';
dotenv.config();
// or maybe use some other HTTP request module for requests;

const apiPrefix = 'http://localhost:3000';

promises.polyfill();



export default function apiHandler () {

  // will be handling api requests from client 

};