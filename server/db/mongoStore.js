import session from 'express-session';
import mongoose from 'mongoose';

const MongoStore = require('connect-mongo')(session);

export default function mongoStore(req, res, next) {
  console.log('>>>>>>>>>>>>>>>>> !!!!!!!!!!! mongoStore !!!!!!!!!!!! <<<<<<<<<<<<<<<<<<<');
  req.app.use(session({
    secret: 'keyboardcat123abz',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: 'mongodb://localhost/apptest2018',
      touchAfter: 0.5 * 3600
    })
  }));
  
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/apptest2018');

  return next();
}
