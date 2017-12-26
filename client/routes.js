
import React from 'react'

import Home from './containers/Home';
import About from './containers/About';
import Contact from './containers/Contact';
import About from './containers/About';
import Register from './containers/Register';
import Login from './containers/Login';

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
  {
    path: '/contact',
    component: Contact
  },
];

/*
################### react-router-config #########################

Route Configuration Shape:

Routes are objects with the same properties as a `<Route>` with a couple differences:

- the only render prop it accepts is `component` (no `render` or `children`)
- introduces the `routes` key for sub routes
- Consumers are free to add any additional props they'd like to a route, you can access `props.route` inside the `component`, this object is a reference to the object used to render and match.
- accepts `key` prop to prevent remounting component when transition was made from route with the same component and same `key` prop


const routes = [
  { component: Root,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/child/:id',
        component: Child,
        routes: [
          { path: '/child/:id/grand-child',
            component: GrandChild
          }
        ]
      }
    ]
  }
]
*/

export default routes;