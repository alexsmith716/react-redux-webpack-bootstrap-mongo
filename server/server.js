import express from 'express';
//import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import fs from 'fs';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';
dotenv.config();

const app = new express();
app.use(morgan('dev'));

// MONGO_URL = mongodb://localhost/rrwbm-dec-2017
// PORT = 3000
console.log('>>>>>> server > process.env.NODE_ENV: ', process.env.NODE_ENV);

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
import { matchRoutes, renderRoutes } from 'react-router-config';
import helmet from 'react-helmet';

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
// https://github.com/glenjamin/webpack-hot-middleware/issues/10
// app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));
//app.use(favicon(path.join(__dirname, './public/static/favicon', 'favicon.ico')),);
//app.use('/api', pageData);

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
        <div id="app">Apppppppppp!!!</div>
        <div><p>Apppppppppppppp !!!</p></div>
      </body>
    </html>
  `;
};

const renderFullPage2 = (html, initialState) => {
  const head = Helmet.rewind();
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="${process.env.NODE_ENV === 'production' ? '/static/styles.css': '/styles.css'}">
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.script.toString()}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? '/static/vendor.js' : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? '/static/app.js': '/app.js'}'></script>
      </body>
      </body>
    </html>
  `;
};

// #########################################################################

app.use((req, res, next) => {

});

// #########################################################################

app.listen(process.env.PORT, error => {
  if (!error) {
    console.log(`>>>>>>>> Server is running on port ${process.env.PORT} <<<<<<<<<<<`);
  }
});

export default app;





