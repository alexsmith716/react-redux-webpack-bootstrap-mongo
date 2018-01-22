
//  Workaround for async react routes to work with react-hot-reloader
//  https://github.com/reactjs/react-router/issues/2182
//  https://github.com/gaearon/react-hot-loader/issues/288

// https://github.com/gaearon/react-hot-loader
// "Wrap your application into <AppContainer>,
// all children of <AppContainer> will be reloaded when a change occurs:""

import { routerActions } from 'react-router-redux';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

//import LoginLoadable from './containers/Login/Loadable';
//import RegisterLoadable from './containers/Register/Loadable';


import Core from './containers/Core/Core';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Contact from './containers/Contact/Contact';
import PageNotFound from './containers/PageNotFound/PageNotFound';

const isAuthenticated = connectedRouterRedirect({
  //authenticatedSelector: state => !!state.auth.user,
  //redirectPath: '/login',
  //redirectAction: routerActions.replace,
  //wrapperDisplayName: 'UserIsAuthenticated'
});

const isNotAuthenticated = connectedRouterRedirect({
  //authenticatedSelector: state => !state.auth.user,
  //redirectPath: '/',
  //redirectAction: routerActions.replace,
  //allowRedirectBack: false,
  //wrapperDisplayName: 'UserIsNotAuthenticated'
});


const routes = [
  {
    component: Core,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/about',
        component: About,
      },
      {
        path: '/contact',
        component: Contact,
      },
      {
        component: PageNotFound
      },

    ],
  },
];

export default routes;


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
