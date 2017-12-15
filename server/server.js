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

//        ${head.base.toString()}
//        ${head.title.toString()}
//        ${head.meta.toString()}
//        ${head.link.toString()}
//        ${head.script.toString()}


const renderFullPage0 = () => {
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

const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="data:image/x-icon;" type="image/x-icon" rel="shortcut icon">
        <intercept-url pattern="/favicon.ico" access="ROLE_ANONYMOUS"></intercept-url>
     </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src='${'/vendor.js'}'></script>
        <script src='${'/app.js'}'></script>
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

  const store = configureStore({ intl: intl });

  const branch = matchRoutes(routes, req.url);

  const promises = branch.map(({ route }) => {
    const fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
  });

  //---------------------------------------------------------

  const context = {};

  const componentHtml = renderToString(
    <Provider store={store}>
      <IntlWrapper locale={locale}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </IntlWrapper>
    </Provider>
  );

  if (context.url) {
    res.redirect(302, context.url);
  } else if (context.status === 404) {
    res.status(404);
  } else {
    const preloadedState = store.getState();
    const html = renderFullPage(componentHtml, preloadedState);
    res.set('content-type', 'text/html');
    res.send(html);
  }

});


// #########################################################################

/*
if (app.get('env') === 'development') {
  app.use((req, res, next) => {
    console.log('############# APP UNCAUGHT ERR HANDLER DEVELOPMENT #############');
    console.log('############################# DEV ERR: ', err);
    console.log('############################# DEV ERR.code: ', err.code);
    console.log('############################# DEV ERR.status: ', err.status);
    console.log('############################# DEV ERR.name: ', err.name);
    console.log('############################# DEV REQ.HEADERS.referer: ', req.headers['referer']);
    next();
  });
};
*/

// #########################################################################

// //const server = https.createServer(options, app).listen(app.get('port'), '127.0.0.1', function () {
// const server = http.createServer(app).listen(app.get('port'), 'localhost', function () {
//   console.log('Express server listening on port: ', server.address().port);
//   console.log('Express server listening on hostname: ', server.address().address);
// });

app.listen(process.env.PORT, error => {
 if (!error) {
   console.log(`>>>>>>>> Server is running on port ${process.env.PORT} <<<<<<<<<<<`);
 }
});

export default app;






