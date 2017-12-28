
// react-router-config

import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import { renderRoutes } from 'react-router-config';
import routes from './routes';
import AppContainer from './containers/AppContainer/AppContainer';
import PageNotFound from './containers/PageNotFound/PageNotFound';


const AppRouter = () => (

  <AppContainer>

    <Switch>

      { routes.map((route, index) => (
        <Route { ...route } key={ index }/>
      )) }

      <Route component={ PageNotFound } />

    </Switch>

  </AppContainer>

);


export default AppRouter;