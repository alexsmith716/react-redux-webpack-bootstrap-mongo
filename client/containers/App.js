
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import Layout from './Layout';
import PageNotFound from './PageNotFound';


const App = (props) => (

  <Layout>

    <Switch>

      { routes.map((route, index) => (

        <Route { ...route } key={ index }/>

      )) }

      <Route component={ NotFound } />

    </Switch>

  </Layout>

);


export default App;