import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import favicon from 'serve-favicon';
import locale from 'locale';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';
import apiClient from './helpers/apiClient';
import serverConfig from './config';
import headers from './utils/headers';
import delay from 'express-delay';
//import mongooseConnect from './mongo/mongooseConnect';
import apiRouter from './api/apiRouter';
import mongoose from 'mongoose';

// #########################################################################

import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';

import createMemoryHistory from 'history/createMemoryHistory';
import createStore from '../client/redux/create';

import Html from './helpers/Html';
import routes from '../client/routes';
import { parse as parseUrl } from 'url';

// #########################################################################

const MongoStore = require('connect-mongo')(session);
const sessionExpireDate = 6 * 60 * 60 * 1000; // 6 hours
let gracefulShutdown;
let dbURL = serverConfig.mongoURL;
if (process.env.NODE_ENV === 'production') {
  // dbURL = serverConfig.mongoLabURL;
};
const mongooseOptions = {
  autoReconnect: true,
  keepAlive: true,
  connectTimeoutMS: 30000
};

// #########################################################################

//import testingNodeLoadProcess3 from './testingNodeLoad/testingNodeLoadProcess3';
//import testingNodeLoadProcess4 from './testingNodeLoad/testingNodeLoadProcess4';
//import testingNodeLoadProcess2 from './testingNodeLoad/testingNodeLoadProcess2';

// #########################################################################

// GLOBAL constants ++++++++++++++++++++++++++++++++++++++++++++
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
//global.__DEVTOOLS__ = false;

// #########################################################################

dotenv.config();

// #########################################################################

// https://nodejs.org/dist/latest-v9.x/docs/api/process.html
// https://nodejs.org/api/process.html#process_event_unhandledrejection
// http://2ality.com/2016/04/unhandled-rejections.html
// 'unhandledRejection' event is emitted whenever a Promise is rejected
// and no error handler is attached to the promise

process.on('unhandledRejection', (error, promise) => {
  console.error('>>>>>> server > Unhandled Rejection at:', promise, 'reason:', error);
});

// #########################################################################

const app = new express();

app.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>> SERVER > $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
  console.log('>>>>>>>>>>>>>>>>> SERVER > __CLIENT__: ', __CLIENT__);
  console.log('>>>>>>>>>>>>>>>>> SERVER > __SERVER__: ', __SERVER__);
  //console.log('>>>>>>>>>>>>>>>>> SERVER > __DEVTOOLS__: ', __DEVTOOLS__);
  console.log('>>>>>>>>>>>>>>>>> SERVER > __DEVELOPMENT__: ', __DEVELOPMENT__);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.ip +++++++++: ', req.ip);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.method +++++: ', req.method);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.url ++++++++: ', req.url);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.headers ++++: ', req.headers);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.session ++++: ', req.session);
  return next();
});

app.use(cors());
//app.use(headers);

// #########################################################################

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// #########################################################################

if (process.env.NODE_ENV === 'development') {
  app.use(delay(200, 300));
}

// #########################################################################

app.use(helmet());

app.use(compression());
app.use('/public', express.static(path.join(__dirname, '../public')));
//app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));
app.use(favicon(path.join(__dirname, '../public/static/favicon', 'favicon.ico')),);

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(cookieParser());

// #########################################################################

app.get('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, '../public/static/manifest/manifest.json')));

// #########################################################################

// production +++++++++++++++++++++++++++++++
//app.use('/dist/service-worker.js', (req, res, next) => {
//  res.setHeader('Service-Worker-Allowed', '/');
//  return next();
//});

// #########################################################################

//testingNodeLoadProcess2('FOOOOOOOBER');
//import './testingNodeLoad/testingNodeLoadProcess1';
//app.use(testingNodeLoadProcess3);
//app.use('/api', testingNodeLoadProcess4(app));

// #########################################################################

app.use(/\/api/, session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: serverConfig.mongoURL,
    touchAfter: 0.5 * 3600
  })
}));
/*
app.use(/\/api/, session({
  store: new MongoStore({
    url: serverConfig.mongoURL,
    autoRemove: 'native'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: sessionExpireDate
  }
}));
*/

// #########################################################################

//app.use(/\/api/, mongooseConnect);
mongoose.Promise = global.Promise;
mongoose.connect(dbURL, mongooseOptions, err => {
  if (err) {
    console.error('####### > Please make sure Mongodb is installed and running!');
  } else {
    console.error('####### > Mongodb is installed and running!');
  }
});

// #########################################################################

app.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > 1111111 <<<<<<<<<<<<<');
  console.log('REQ.ip +++++++++: ', req.ip);
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('REQ.headers ++++: ', req.headers);
  console.log('REQ.session ++++: ', req.session);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  return next();
});

// #########################################################################

app.use(/\/api/, apiRouter);

// #########################################################################

app.use(async (req, res) => {
  console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! <<<<<<<<<<<<<<<<<<');
  if (__DEVELOPMENT__) {
    global.webpackIsomorphicTools.refresh();
  }

  const url = req.originalUrl || req.url;
  console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > url: ', url);
  const location = parseUrl(url);
  console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > location: ', location);
  console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > GoDo !! > apiClient(req) !!');
  const client = apiClient(req);
  const history = createMemoryHistory({ initialEntries: [url] });
  const store = createStore(history, client);

  const hydrate = () => {
    res.write('<!doctype html>');
    ReactDOM.renderToNodeStream(<Html assets={global.webpackIsomorphicTools.assets()} store={store} />).pipe(res);
  };

  if (__DISABLE_SSR__) {
    return hydrate();
  }

  try {
    await loadOnServer({
      store, location, routes, helpers: { client }
    });

    const context = {};

    const component = (
      <Provider store={store} key="provider">
        <StaticRouter location={url} context={context}>
          <ReduxAsyncConnect routes={routes} helpers={{ client }} />
        </StaticRouter>
      </Provider>
    );

    const content = ReactDOM.renderToString(component);

    if (context.url) {
      return res.redirect(302, context.url);
    }

    const html = <Html assets={global.webpackIsomorphicTools.assets()} content={content} store={store} />;

    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > DID IT !! HTML <<<<<<<<<<<<<<<<<<');

    res.status(200).send(`<!doctype html>${ReactDOM.renderToString(html)}`);
  } catch (error) {
    if (error.name === 'RedirectError') {
      return res.redirect(VError.info(error).to);
    }
    console.error('MOUNT ERROR:', pretty.render(error));
    res.status(500);
    hydrate();
  }
});
//app.use((req, res) => {
  //res.status(200).send('SERVER > Response Ended For Testing!!!!!!! Status 200!!!!!!!!!');
//});

/*
app.use(async (req, res) => {
  console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !!!!! <<<<<<<<<<<<<<<<<<');

  if (__DEVELOPMENT__) {
    global.webpackIsomorphicTools.refresh();
  }

  const url = req.originalUrl || req.url;
  console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !!!!! > url: ', url);
  const location = parseUrl(url);
  const client = apiClient(req);
  const history = createMemoryHistory({ initialEntries: [url] });
  const store = createStore(history, client);
  console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !!!!! > location: ', location);

  const hydrate = () => { 
    res.write('<!doctype html>');
    ReactDOM.renderToNodeStream(<Html assets={global.webpackIsomorphicTools.assets()} store={store} />).pipe(res);
  };

  if (__DISABLE_SSR__) {
    return hydrate();
  }

  try {

    await loadOnServer({store, location, routes, helpers: { client }});

    const context = {};

    const component = (
      <Provider store={store} key="provider">
        <StaticRouter location={url} context={context}>
          <ReduxAsyncConnect routes={routes} helpers={{ client }} />
        </StaticRouter>
      </Provider>
    );

    const content = ReactDOM.renderToString(component);

    if (context.url) {
      return res.redirect(302, context.url);
    }

    const html = <Html assets={global.webpackIsomorphicTools.assets()} content={content} store={store} />;

    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !!!!! > HTML <<<<<<<<<<<<<<<<<<');

    res.status(200).send(`<!doctype html>${ReactDOM.renderToString(html)}`);

    } catch (err) {
      console.log('>>>>>>>> SERVER > app.use > loadOnServer > .catch > err: ', err);
      res.status(500).send('response error >>>> 500 !!!!!');
    }
});
*/

// #########################################################################

mongoose.connection.on('connected', function() {
  console.log('####### > MONGOOSE CONNECTED: ' + dbURL);
});

mongoose.connection.on('error', function(err) {
  console.log('####### > Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('####### > Mongoose disconnected');
});

// Handle Mongoose/Node connections
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('####### > Mongoose disconnected through: ' + msg);
    callback();
  })
};

// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    console.log('####### > Mongoose SIGINT gracefulShutdown');
    process.exit(0);
  })
});

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    console.log('####### > Mongoose SIGUSR2 gracefulShutdown');
    process.kill(process.pid, 'SIGUSR2');
  })
});

// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    console.log('####### > Mongoose SIGTERM gracefulShutdown');
    process.exit(0);
  })
});

// #########################################################################
/*
app.listen(serverConfig.port, (error) => {
  if (error) {
    console.log('>>>>>>>> Server Error: ', error);
  } else {
    console.log(`>>>>>>>> Server is running on port ${serverConfig.port} <<<<<<<<<<<`);
  }
});
*/

const server = new http.Server(app);
server.listen(process.env.PORT, err => {
  if (err) {
    console.error(err);
  }
  console.info('----\n==> SERVER is running, talking to API server on.');
  console.info('==> Open http:// in a browser to view the app.');
});

/*
const normalizePort = (val)  => {

  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || serverConfig.port);
app.set('port', port);

// http.createServer([requestListener]): Returns a new instance of http.Server
// const server = https.createServer(options, app).listen(app.get('port'), '', () => {
const server = http.createServer(app).listen( app.get('port'), serverConfig.host, () => {
  console.log('>>>>>> Express server Connected: ', server.address());
});

server.on('error', (err) => {

  if (err.syscall !== 'listen') {
    console.log('>>>>>> Express server error: ', err);
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (err.code) {
    case 'EACCES':
      console.error('>>>>>> Express server error: ' + bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('>>>>>> Express server error: ' + bind + ' is already in use');
      process.exit(1);
      break;
    default:
      console.log('>>>>>> Express server error.code: ', err.code);
  }
});

server.on('listening', () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('>>>>>> Express server Listening on: ', bind);
});
*/
