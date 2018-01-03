
// Root

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { renderRoutes } from 'react-router-config';

import routes from './routes';


const AppRouter = () => (

  <Router>

    {renderRoutes(routes)}

  </Router>
  
);

export default AppRouter;

