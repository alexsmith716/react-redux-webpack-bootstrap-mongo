
import React from 'react'

import Home from './containers/Home';
import About from './containers/About';


const routes = [
    {
      path: '/',
      component: Home,
      exact: true
    },
    {
      path: '/about',
      component: About
    },
];

export default routes;