
// Got me a root component!!!
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

/**
"react-router-config":
  * Static route configuration helpers for React Router
  * With the introduction of React Router v4, there is no longer a centralized route configuration
  * There are some use-cases where it is valuable to know about all the app's potential routes such as:
  * Loading data on the server or in the lifecycle before rendering the next screen
  * Linking to routes by name
  * Static analysis
*/
import { renderRoutes } from 'react-router-config';

// Import the client routes from config file
import routes from './routes';

//import './global.css';
//import './main.css';

const AppRouter = () => (
  <Router>
    {renderRoutes(routes)}
  </Router>
);

export default AppRouter;
