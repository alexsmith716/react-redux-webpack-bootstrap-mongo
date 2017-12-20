
import React from 'react'

// import AppRoot from './containers/AppRoot';
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

/*
const routes = [
  { component: AppRoot,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true
      },
      { 
        path: '/home',
        component: Home
      },
      {
        path: '/about',
        component: About
      },
    ]
  }
];
*/

export default routes;