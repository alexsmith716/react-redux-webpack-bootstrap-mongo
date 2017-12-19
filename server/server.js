import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
// import https from 'https';
import http from 'http';
import fs from 'fs';
import favicon from 'serve-favicon';
import locale from 'locale';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';

// #########################################################################

dotenv.config();

const app = new express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));

console.log('>>>>>> server > process.env.MONGO_URL: ', process.env.MONGO_URL);
console.log('>>>>>> server > process.env.NODE_ENV: ', process.env.NODE_ENV);

// const options = {
//   key: fs.readFileSync(__dirname + '../ssl/thisAppPEM.pem'),
//   cert: fs.readFileSync(__dirname + '../ssl/thisAppCRT.crt')
// };

// #########################################################################

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// #########################################################################

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { matchPath } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';

import Helmet from 'react-helmet';

import { configureStore } from '../client/store';

import IntlWrapper from '../client/components/Intl/IntlWrapper';
import { enabledLanguages, localizationData } from '../i18n/setup';

import App from '../client/containers/App/App';

import routes from '../client/routes';
import apiRouter from './routes';

// #########################################################################

mongoose.Promise = global.Promise;
const mongooseOptions = {
  useMongoClient: true,
  autoReconnect: true,
  keepAlive: 1,
  connectTimeoutMS: 300000
};
mongoose.connect(process.env.MONGO_URL, mongooseOptions, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }
});

// #########################################################################

app.use(cors());
app.use(locale(enabledLanguages, 'en'));
// https://github.com/glenjamin/webpack-hot-middleware/issues/10
// app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use('/public', express.static(path.join(__dirname, './public')));
//app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));
app.use(favicon(path.join(__dirname, '../public/static/favicon', 'favicon.ico')),);
//app.use('/api', pageData);

// #########################################################################

app.use((req, res, next) => {
  console.log('>>>>>>>>>>> GOING THROUGH APP NOW >>>>>>>>>>>>');
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('REQ.headers ++++: ', req.headers);
  if(req.user) {
    console.log('REQ.user +++++: ', req.user);
    console.log('REQ.user._id +: ', req.user._id);
  } else {
    console.log('REQ.user +++++: NO USER');
  };
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
  next();
});

// #########################################################################

const renderFullPage = () => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="icon" href="/dist/favicon.ico" type="image/ico" />
        <title>Tester !!!!</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="app">Apppppppppp !!!</div>
        <div><p>Apppppppppppppp !!!</p></div>
      </body>
    </html>
  `;
};

// #########################################################################

app.use((req, res, next) => {

  const locale = req.locale.trim();

  const intl = {
    locale: locale,
    enabledLanguages: enabledLanguages,
    messages: localizationData[locale].messages
  };

  // const matchedRoute = matchRoutes(routes, req.url);

  // since basically everything is an object ...
  // ... and (knowing how) a method can be created to act upon an object in who knows how many different ways
  // have a method that iterates over an array and returns an element (object) that contains the objects of the object
  // while the "reduce" method iterates over the array,
  // apply "matchPath" method to test if "req.url" matches current array element "route.path"
  // reduce method: iterate through each element (object) "routes" array (object)
  // reduce method: transform "routes" array by reducing it to accumulator "reducedRoutes"
  // apply the reduce method to the "routes" array
  // for each current array "route" element, apply "matchPath"
  // "matchPath" evaluates a match using params "req.url", "route.path", "route"
  // if returned (match && match.isExact)
  // push objects "route", "match" and "promise" into empty array "reducedRoutes"

  const matchedRoute = routes.reduce((matchedRoute, route, index) => {

    //console.log('>>>> server > routes.reduce: ', index, ' :ROUTE: ', route, ' :MATCHEDROUTE: ', matchedRoute);

    const matchedPath = matchPath(req.url, route.path, route);

    if (matchedPath.isExact) {

      // console.log('>>>> server > routes.reduce > matchedPath: ', matchedPath)
      // console.log('>>>> server > routes.reduce > matchedPath.isExact: ', matchedPath.isExact)
      // console.log('>>>> server > routes.reduce > matchedPath > route.component.fetchData: ', route.component.fetchData)

      matchedRoute.push({
        route,
        matchedPath,
      })

    }

    return matchedRoute;

  }, []);

  //---------------------------------------------------------


});


// #########################################################################

// //const server = https.createServer(options, app).listen(app.get('port'), '', () => {
const server = http.createServer(app).listen( app.get('port'), '127.0.0.1', () => {
  console.log('Express server connected > port: ', app.get('port'));
  console.log('Express server connected > address(): ', server.address());
});

server.on('error', (err) => {
  console.log('Express server error: ', err);
});

/*
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(`>>>>>>>> Server is running on port ${process.env.PORT} <<<<<<<<<<<`);
  } else {
    console.log('>>>>>>>> Server Error <<<<<<<<<<<');
  }
});
*/

export default app;






