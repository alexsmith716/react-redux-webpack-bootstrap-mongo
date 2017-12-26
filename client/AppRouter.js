
// react-router-config

import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import { renderRoutes } from 'react-router-config';
import routes from './routes';
import App from './containers/App/App';
import PageNotFound from './containers/PageNotFound/PageNotFound';


const AppRouter = (props) => (

  <App>

    <Switch>

      { routes.map((route, index) => (

        <Route { ...route } key={ index }/>

      )) }

      <Route component={ PageNotFound } />

    </Switch>

  </App>

);


export default AppRouter;