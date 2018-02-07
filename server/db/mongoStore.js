import session from 'express-session';
import mongoose from 'mongoose';
let gracefulShutdown;

let dbURL = process.env.MONGO_URL;

if (process.env.NODE_ENV === 'production') {
  // dbURL = process.env.MONGOLAB_URL;
};

require('dotenv').config();
const MongoStore = require('connect-mongo')(session);

export default function mongoStore(req, res, next) {
  console.log('>>>>>>>>>>>>>>>>> !!!!!!!!!!! mongoStore !!!!!!!!!!!! <<<<<<<<<<<<<<<<<<<');

  req.app.use(session({
    secret: 'keyboardcat123abz',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: process.env.MONGO_URL,
      touchAfter: 0.5 * 3600
    })
  }));
  
  const mongooseOptions = {
    useMongoClient: true,
    autoReconnect: true,
    keepAlive: true,
    connectTimeoutMS: 30000
  };
  
  mongoose.connect(process.env.MONGO_URL, mongooseOptions, err => {
    if (err) {
      console.error('Please make sure Mongodb is installed and running!');
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

  return next();
}
