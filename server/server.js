
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import favicon from 'serve-favicon';
import locale from 'locale';
import webpack from 'webpack';
import config from '../webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';

// #########################################################################
// http://http://127.0.0.1:3000/api/

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

dotenv.config();

const app = new express();

app.use(morgan('dev'));

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
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Helmet from 'react-helmet';

import App from '../client/App';

import reducers from '../client/reducers';

import routes from '../client/routes';
import apiRouter from './apiRoutes';

import renderFullPage from './render/renderFullPage';


// #########################################################################

import './db/mongo';

// #########################################################################

app.use(cors());
// app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use('/public', express.static(path.join(__dirname, '../public')));
//app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));
app.use(favicon(path.join(__dirname, '../public/static/favicon', 'favicon.ico')),);

// #########################################################################

app.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>> GOING THROUGH APP NOW >>>>>>>>>>>>>>>>>>');
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('REQ.headers ++++: ', req.headers);
  if(req.user) {
    console.log('REQ.user +++++: ', req.user);
    console.log('REQ.user._id +: ', req.user._id);
  } else {
    console.log('REQ.user +++++: NO USER');
  };
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
  next();
});

app.use('/api', apiRouter);




// #########################################################################



// SERVER ++++++++++++++++++++++++++++++++++++++++++++++++++
// combineReducers

//console.log('>>>> server > configureStore: ', configureStore);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//import { rootReducer } from '../client/store';
//const store = createStore(rootReducer, applyMiddleware(thunk));

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//const store = createStore(reducers, applyMiddleware(thunk));

import { configureStore } from '../client/store';


// #########################################################################


app.use((req, res, next) => {

  console.log('>>>>>>>>>>> server > app.use((req, res, next) <<<<<<<<<<<<<');

  const store = configureStore();

  console.log('>>>> server > store: ', store);

  //const locale = req.locale.trim();

  // `pathname`: The path section of the URL, that comes after the host and before the query, 
  // including the initial slash if present.

  // const matchedRoute = matchRoutes(routes, req.url);

  const matchedRoute = routes.reduce((accumulatedRoute, route, index) => {

    //console.log('>>>> server > routes.reduce: ', index, ' :ROUTE: ', route, ' :MATCHEDROUTE: ', matchedRoute);

    const matchedPath = matchPath(req.url, route.path, route);

    if (matchedPath && matchedPath.isExact) {

      console.log('>>>> server > routes.reduce > matchedPath: ', matchedPath);
      console.log('>>>> server > routes.reduce > matchedPath.isExact: ', matchedPath.isExact);

      // test if incoming route is a HTTP API/Ajax request
      // if an API request, dispatch request event promise from route.component.fetchData()
      // if an API request, push that promise into accumulatedRoute
      // if not an API request, push a null promise

      const promise = route.component.fetchData ? route.component.fetchData({ store, params: matchedPath.params }) : Promise.resolve(null)

      //const promise = Promise.resolve(null);

      accumulatedRoute.push({
        route,
        matchedPath,
        promise: promise,
      })

    }

    return accumulatedRoute;

  }, []);


  // -------------------------------------------------------------------------


  // const promises = matchedRoute.map(({ route }) => {
  //   const fetchData = route.component.fetchData;
  //   return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
  // });

  const promises = matchedRoute.map((match) =>  {
    return match.promise
  });


  // -------------------------------------------------------------------------

  // resolve matchedRoute's promise(s) asynchronously
  // 
  // Promise.all(matches.map(match => match.promise))
  Promise.all(promises)

  .then((data) => {

    let status = 200;

    const context = {};

    const appHtml = renderToString(

      <Provider store={ store } >
        <StaticRouter context={ context } location={ req.url }>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>

    );

    if (matchedRoute.length === 0) {
      status = 404;
    };

    if (context.url) {

      res.redirect(context.url);

    } else if (context.status === 404) {

      res.status(404);
        
    } else {

      const preloadedState = store.getState();
      const helmet = Helmet.renderStatic();

      let html = renderFullPage(helmet, appHtml, preloadedState);
      //let html = renderFullPage(helmet, appHtml);

      console.log('>>>> server > Promise.all(promises) > html: ', html);

      res.set('Content-Type', 'text/html');

      res.status(status);
      
      res.send(html);

    };

  })
  .catch((error) => next(error));

});


// #########################################################################

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

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

// //const server = https.createServer(options, app).listen(app.get('port'), '', () => {
const server = http.createServer(app).listen( app.get('port'), '127.0.0.1', () => {
  console.log('>>>>>> Express server connected: ', server.address());
});

server.on('error', (error) => {
  
  if (error.syscall !== 'listen') {
    console.log('>>>>>> Express server error: ', error);
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error('>>>>>> Express server error: ' + bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('>>>>>> Express server error: ' + bind + ' is already in use');
      process.exit(1);
      break;
    default:
      console.log('>>>>>> Express server error.code: ', error.code);
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


app.listen(3000, (error) => {
  if (error) {
    console.log('>>>>>>>> Server Error: ', error);
  } else {
    console.log(`>>>>>>>> Server is running on port ${process.env.PORT} <<<<<<<<<<<`);
    
  }
});


export default app;


