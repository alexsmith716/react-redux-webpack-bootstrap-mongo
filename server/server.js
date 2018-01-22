
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import url from 'URL';
import http from 'http';
import favicon from 'serve-favicon';
import locale from 'locale';
import webpack from 'webpack';
import config from '../webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { trigger } from 'redial'; // https://github.com/markdalgleish/redial
import { parse as parseUrl } from 'url';
import dotenv from 'dotenv';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

// #########################################################################

// const chunksPath = path.join(__dirname, '..', 'public', 'dist', 'chunks.json');

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

// #########################################################################

// const options = {
//   key: fs.readFileSync(__dirname + '../ssl/thisAppPEM.pem'),
//   cert: fs.readFileSync(__dirname + '../ssl/thisAppCRT.crt')
// };

// https://nodejs.org/dist/latest-v9.x/docs/api/http.html
// Create a new instance of http.Server
// const server = new http.Server(app);

// #########################################################################

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// #########################################################################

import React from 'react';
import ReactDOM from 'react-dom/server';
//import { Provider } from '../shared';
import { Provider } from 'react-redux';
//import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router'; // react-router v4
// import { match } from 'react-router'; // react-router v3

import matchRoutesAsync from '../shared/matchRoutesAsync';

import { renderRoutes, matchRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reactHelmet from 'react-helmet';

//import App from '../client/App';
//import App from '../client/containers/App/App';

import reducers from '../client/reducers';
import routes from '../client/routes';
import apiRouter from './apiRoutes';
//import renderFullPage from './render/renderFullPage';

// #########################################################################

app.use('/public', express.static(path.join(__dirname, '../public')));
//app.use('/static', express.static(path.resolve(__dirname, '../dist/client')));
app.use(favicon(path.join(__dirname, '../public/static/favicon', 'favicon.ico')),);

// #########################################################################

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// #########################################################################

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
// app.use(cookieParser());
// app.use(compression());

// #########################################################################

//<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//<meta name="viewport" content="width=device-width, initial-scale=1.0">
//<meta name="description" content="react-redux-webpack-bootstrap-mongo">

/*
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods',);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
*/

// #########################################################################

app.use('/api', apiRouter);

// #########################################################################

import './db/mongo';

// #########################################################################

app.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>> GOING THROUGH APP NOW >>>>>>>>>>>>>>>>>>');
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('REQ.originalUrl ++++++++: ', req.originalUrl);
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

// #########################################################################

// render serialize data from server to client template
const renderFullPage = (appHtml, initialState) => {

  const head = reactHelmet.rewind();

  return `
    <!DOCTYPE html>
    <html>
      <head>

        <!-- Bootstrap, Theme, Other CSS -->
        <link rel="stylesheet" href="${process.env.NODE_ENV === 'production' ? '/public/static/dist/client/styles.css': ''}">

        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.title.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

      </head>

      <body>

        <div id="app">${ appHtml }</div>

        <script>
            window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) }
        </script>
        
        <script src='${process.env.NODE_ENV === 'production' ? '/public/static/dist/client/vendor.js' : '/vendor.js'}'></script>

        <script src='${process.env.NODE_ENV === 'production' ? '/public/static/dist/client/app.js': '/app.js'}'></script>

      </body>

    </html>
  `;
};

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

// Sharing Templates
// In order to achieve faster (perceived) performance and proper search engine indexing,
// we want to be able to render any view on the server as well as the client. 
// On the client, template rendering is as simple as evaluating a template and attaching the output to a DOM element.
// On the server, the same template is rendered as a string and returned in the response.
// The tricky part of isomorphic view rendering is that the client has to pick up wherever the server left off.
// This is often called the client/server transition; that is, the client should properly transition and
// not “destroy” the DOM generated by the server after the application is loaded in the browser.
// The server needs to “dehydrate” the state by sending it to the client,
// and the client will “rehydrate” (or reanimate) the view and initialize it to the same state it was in on the server.

// when rendering on the server
// "... an HTML document consisting of markup from the rendering of the React component tree to a string and related data, is sent to the client"
// "it is then up to the client to pick up where the server left off"
// "this is done by calling React.render/hydrate on the DOM node where the output from renderToString was injected on the server"
// "Rendering on the Client and Server"
// The return value of component render methods should not differ between the client and the server, given the same data.
// If they do, then the DOM will be rerendered when ReactDOM.render is called, which will throw a compile error.
// To prevent this, make sure the data passed to components is the same on the client and the server for a given route.

// Rendering on the client will rerender the component tree, 
// applying any differences between the virtual DOM created by ReactDOM.render and the actual DOM
// It will also bind all component event listeners

// router shared between server & client (react-router-config)
// match urls to handlers & components
// match routes on the server


// react-router v4
// Promise.all
import matchRoutesPromise from '../shared/matchRoutesPromise';

app.use((req, res) => {

  console.log('>>>>>>>> server > app.use((req,res) <<<<<<<<<<<<<');

  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphicTools.refresh();
  }
  

  matchRoutesPromise(routes, req.originalUrl)
  .then(result => {
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .then > result: ', result);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .then > result.components: ', result.components);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .then > result.match: ', result.match);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .then > result.params: ', result.params);
    res.status(200).send('response success >>>> 200 !!!!!');
    //res.status(200).send();
  })
  .catch(err => {
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .catch > err: ', err);
    res.status(500).send('response error >>>> 500 !!!!!');
    //res.status(500);
    //hydrate();
  });
});


/*
// react-router v4
// async > await
app.use(async (req, res) => {

  console.log('>>>>>>>> server > app.use((req,res) <<<<<<<<<<<<<');

  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphicTools.refresh();
  }
  
  // const providers = {};

  const store = configureStore();
  const preloadedState = store.getState();

  // function hydrate() {};
  // if (__DISABLE_SSR__) {};

  try {

    // await I/O for matchRoutes()
    // {components, match, params }

    // map incoming requests to a route (matchRoutes - react-router-config)
    const { components, match, params }  = await matchRoutesAsync(routes, req.originalUrl);

    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesAsync > try > components: ', components);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesAsync > try > match: ', match);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesAsync > try > params: ', params);

    // ensure all data for routes is prefetched on the server before attempting to render

    res.status(200).send('response success >>>> 200 !!!!!');
    //res.status(200).send();

  } catch(err) {
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesAsync > catch > err: ', err);
    res.status(500).send('response error >>>> 500 !!!!!');
    //res.status(500);
    //hydrate();
  }
});
*/

/*
// react-router v4
// async > await
app.use(async (req, res) => {

  console.log('>>>>>>>> server > app.use((req,res) <<<<<<<<<<<<<');

  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphicTools.refresh();
  }
  
  // const providers = {};

  const store = configureStore();
  const preloadedState = store.getState();

  // function hydrate() {};
  // if (__DISABLE_SSR__) {};

  try {

    // await I/O for matchRoutes()
    // {components, match, params }

    // map incoming requests to a route (matchRoutes - react-router-config)
    const { components, match, params }  = await matchRoutesAsync(routes, req.originalUrl);

    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesAsync > try > components: ', components);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesAsync > try > match: ', match);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesAsync > try > params: ', params);

    // ensure all data for routes is prefetched on the server before attempting to render

    res.status(200).send('response success >>>> 200 !!!!!');
    //res.status(200).send();

  } catch(err) {
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesAsync > catch > err: ', err);
    res.status(500).send('response error >>>> 500 !!!!!');
    //res.status(500);
    //hydrate();
  }
});
*/

/*
// react-router v4
// Promise.all
import matchRoutesPromise from '../shared/matchRoutesPromise';

app.use((req, res) => {

  matchRoutesPromise(routes, req.originalUrl)
  .then(result => {
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .then > result: ', result);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .then > result.components: ', result.components);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .then > result.match: ', result.match);
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .then > result.params: ', result.params);
    res.status(200).send('response success >>>> 200 !!!!!');
    //res.status(200).send();
  })
  .catch(err => {
    console.log('>>>>>>>> server > app.use((req,res) > matchRoutesPromise > .catch > err: ', err);
    res.status(500).send('response error >>>> 500 !!!!!');
    //res.status(500);
    //hydrate();
  });
});
*/


// #########################################################################

// app.use(routeNotFound);

// #########################################################################

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

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// http.createServer([requestListener]): Returns a new instance of http.Server
// const server = https.createServer(options, app).listen(app.get('port'), '', () => {
const server = http.createServer(app).listen( app.get('port'), '127.0.0.1', () => {
  console.log('>>>>>> Express server connected: ', server.address());
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

/*
app.listen(3000, (err) => {
  if (err) {
    console.log('>>>>>>>> Server Error: ', err);
  } else {
    console.log(`>>>>>>>> Server is running on port ${process.env.PORT} <<<<<<<<<<<`);
    
  }
});
*/

// #########################################################################

export default app;

// #########################################################################


/*
// react-router v3
app.use((req, res) => {

  match (
  
    async (err, redirectLocation, renderProps) => {

      if (redirectLocation) {

        res.redirect(redirectLocation.pathname + redirectLocation.search);

      } else if (err) {

        res.status(500);

      } else if (renderProps) {

        try {

          await loadOnServer({
            ...renderProps,
            store,
            helpers: { ...providers, redirect },
            filter: item => !item.deferred
          });

          const component = (
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          
          const html = <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />;
          res.status(200);
          res.send(`<!doctype html>${ReactDOM.renderToString(html)}`);

        } catch (err) {

          if (err.name === 'RedirectError') {
            return res.redirect(VError.info(err).to);
          }
          res.status(500);

        }

      } else {

        res.status(404).send('Not found');

      }
    }
  );
});
*/


