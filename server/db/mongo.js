
import mongoose from 'mongoose';
import dotenv from 'dotenv';
let gracefulShutdown;

dotenv.config();

let dbURI = process.env.MONGO_URL;

if (process.env.NODE_ENV === 'production') {
  // dbURI = process.env.MONGOLAB_URI;
};

mongoose.Promise = global.Promise;

const mongooseOptions = {
  useMongoClient: true,
  autoReconnect: true,
  keepAlive: true,
  connectTimeoutMS: 30000
};

mongoose.connect(dbURI, mongooseOptions, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
  }
});

mongoose.connection.on('connected', function() {
  console.log('####### > MONGOOSE CONNECTED: ' + dbURI);
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
