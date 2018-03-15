import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import jwt from 'express-jwt';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import favicon from 'serve-favicon';
import locale from 'locale';
// import webpack from 'webpack';
// import webpackConfig from '../webpack.config.dev.js';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';
import apiClient from './helpers/apiClient';
import serverConfig from './config';
import headers from './utils/headers';
import delay from 'express-delay';
// import mongooseConnect from './mongo/mongooseConnect';
import apiRouter from './api/apiRouter';
import mongoose from 'mongoose';

// #########################################################################

import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
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

// GLOBAL constants ++++++++++++++++++++++++++++++++++++++++++++
// global.__CLIENT__ = false;
// global.__SERVER__ = true;
// global.__DISABLE_SSR__ = false;
// global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

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

export default function (parameters) {

  const app = new express();
  
  app.use((req, res, next) => {
    console.log('>>>>>>>>>>>>>>>>> SERVER > $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ IN $$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('>>>>>>>>>>>>>>>>> SERVER > __CLIENT__: ', __CLIENT__);
    console.log('>>>>>>>>>>>>>>>>> SERVER > __SERVER__: ', __SERVER__);
    console.log('>>>>>>>>>>>>>>>>> SERVER > __DEVELOPMENT__: ', __DEVELOPMENT__);
    console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.ip +++++++++: ', req.ip);
    console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.method +++++: ', req.method);
    console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.url ++++++++: ', req.url);
    console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.headers ++++: ', req.headers);
    console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.session ++++: ', req.session);
    return next();
  });
  
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  //app.use(headers);
  
  // #########################################################################
  
  //if (process.env.NODE_ENV === 'development') {
  //  const compiler = webpack(webpackConfig);
  //  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath }));
  //  app.use(webpackHotMiddleware(compiler));
  //}
  
  // #########################################################################
  
  if (process.env.NODE_ENV === 'development') {
    //app.use(delay(200, 300));
  }
  
  // #########################################################################
  
  app.use(compression());
  
  app.use('/public', express.static(path.join(__dirname, '../public')));
  //app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));
  // app.use(favicon(path.join(__dirname, '../public/static/favicon', 'favicon.ico')));
  
  app.get('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, '../public/static/manifest/manifest.json')));
  
  // #########################################################################
  
  // production +++++++++++++++++++++++++++++++
  //app.use('/dist/service-worker.js', (req, res, next) => {
  //  res.setHeader('Service-Worker-Allowed', '/');
  //  return next();
  //});
  
  // #########################################################################
  
  // saveUninitialized: false, // don't create session until something stored
  // resave: false, // don't save session if unmodified
  
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(cookieParser());
  
  // app.use(/\/api/, session({
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: serverConfig.mongoURL,
      touchAfter: 0.5 * 3600
    })
  }));
  
  
  app.use((req, res, next) => {
    console.log('>>>>>>>>>>>>>>>> SERVER > REQ.headers ++++  111z: ', req.headers);
    console.log('>>>>>>>>>>>>>>>> SERVER > REQ.session ++++  111z: ', req.session);
    console.log('>>>>>>>>>>>>>>>> SERVER > REQ.cookies ++++  111z: ', req.cookies);
    return next();
  });
  
  // #########################################################################
  
  // app.use(/\/api/, apiRouter);
  app.use('/api', apiRouter);
  
  // #########################################################################
  
  // app.use((req, res) => {
    // res.status(200).send('SERVER > Response Ended For Testing!!!!!!! Status 200!!!!!!!!!');
  // });
  
  app.use(async (req, res) => {
  
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! <<<<<<<<<<<<<<<<<<');
    if (__DEVELOPMENT__) {
      // ========
    }
  
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > SetUpComponent !! START !! $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
  
  
    const url = req.originalUrl || req.url;
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > SetUpComponentDone !! > url: ', url);
  
  
    const location = parseUrl(url);
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > SetUpComponentDone !! > location: ', location);
  
  
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > SetUpComponent !! > apiClient !!');
    const client = apiClient(req);
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > SetUpComponentDone !! > apiClient !!');
  
  
    const history = createMemoryHistory({ initialEntries: [url] });
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > SetUpComponentDone !! > createMemoryHistory !!');
  
  
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > SetUpComponent !! > createStore !!');
    const store = createStore(history, client);
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > SetUpComponentDone !! > createStore !!');
  
  
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > ASYNC !! > SetUpComponent !! END !! $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
  
    try {
      console.log('>>>>>>>>>>>>>>>>> SERVER > $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ loadOnServer START $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
  
      await loadOnServer({store, location, routes, helpers: { client }});
  
      console.log('>>>>>>>>>>>>>>>>> SERVER > $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ loadOnServer END $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
  
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
  
  // #########################################################################
  
  /*
  const server = new http.Server(app);
  server.listen(process.env.PORT, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> SERVER is running, talking to API server on.');
    console.info('==> Open http:// in a browser to view the app.');
  });
  */
  
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
  
  // https://nodejs.org/api/net.html#net_class_net_socket
  // https://nodejs.org/api/http.html#http_event_upgrade
  server.on('upgrade', (req, socket, head) => {
    console.log('>>>>>>>>>>>>>>>> SERVER > APP.USE > Upgrade <<<<<<<<<<<<<<<<<<<<<<');
    // proxy.ws(req, socket, head);
  });

}

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
