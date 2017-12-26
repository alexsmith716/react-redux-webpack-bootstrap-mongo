
// react-router-config

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import Main from './Main';
import PageNotFound from './PageNotFound';


const App = (props) => (

  <Main>

    <Switch>

      { routes.map((route, index) => (

        <Route { ...route } key={ index }/>

      )) }

      <Route component={ PageNotFound } />

    </Switch>

  </Main>

);


export default App;