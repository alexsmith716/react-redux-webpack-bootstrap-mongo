import session from 'express-session';
import mongoose from 'mongoose';
//import bodyParser from 'body-parser';
//import cookieParser from 'cookie-parser';
require('dotenv').config();

// 31,536,000 seconds in a year
// 60 * 60 * 1000 = 3,600,000 == 1 hour
// 20 * 60 * 1000 = 1,200,000 == 20 min
// 86,400,000 (24 × 60 × 60 × 1000) milliseconds – one day
// 18,000,000 === 5 hours
// var oneHour = 3,600,000

/*
  app.use(session({
    store: new MongoStore({
      url: process.env.MONGO_URL,
      autoRemove: 'native'
    }),
    name: 'id',
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

let gracefulShutdown;
let dbURL = process.env.MONGO_URL;
if (process.env.NODE_ENV === 'production') {
  // dbURL = process.env.MONGOLAB_URL;
};
const MongoStore = require('connect-mongo')(session);
const cookieExpiryDate = new Date(Date.now() + 14 * 24 * 60 * 60);
const sessionExpireDate = 6 * 60 * 60 * 1000; // 6 hours
//const sessionExpireDate = 20 * 60 * 1000; // 20 minutes

export default function mongoStore(app) {

  app.use((req, res, next) => {

    console.log('>>>>>>>>>>>>>>>>> MongoStore > __CLIENT__: ', __CLIENT__);
    console.log('>>>>>>>>>>>>>>>>> MongoStore > __SERVER__: ', __SERVER__);
    console.log('>>>>>>>>>>>>>>>>> MongoStore > __DEVTOOLS__: ', __DEVTOOLS__);
    console.log('>>>>>>>>>>>>>>>>> MongoStore > __DEVELOPMENT__: ', __DEVELOPMENT__);

    req.app.locals.foober = 'Fooooober';
    console.log('>>>>>>>>>>>>>>>>> MongoStore >>>>>>>>>>>>> MiddlewareMiddleware >>>>>>');
    return next();
  });

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: process.env.MONGO_URL,
      touchAfter: 0.5 * 3600
    })
  }));

  app.use((req, res, next) => {
    console.log('>>>>>>>>>>>>>>>>> MongoStore >>>>>>>>>>>>> MiddlewareMiddleware > REQs >>>');
    console.log('REQ.headers ++++++++++++: ', req.headers);
    console.log('REQ.sessionID ++++++++++: ', req.sessionID);
    console.log('APP.locals.foober+++++++: ', app.locals.foober);
    console.log('REQ.APP.locals.foober+++: ', req.app.locals.foober);
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    next();
  });

  const mongooseOptions = {
    autoReconnect: true,
    keepAlive: true,
    connectTimeoutMS: 30000
  };

  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URL, mongooseOptions, err => {
    if (err) {
      console.error('####### > Please make sure Mongodb is installed and running!');
    } else {
      console.error('####### > Mongodb is installed and running!');
    }
  });

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

  //app.use(bodyParser.json());
  //app.use(cookieParser());

  return (req, res, next) => {
    return next();
  };
}
