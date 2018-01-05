
// Root

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


import { renderRoutes } from 'react-router-config';

import routes from './routes';

//import { Provider } from 'react-redux';
//import { configureStore } from './store';
//const store = configureStore(window.__INITIAL_STATE__);


const AppRouter = () => (

    <Router>

      {renderRoutes(routes)}

    </Router>
  
);

export default AppRouter;

