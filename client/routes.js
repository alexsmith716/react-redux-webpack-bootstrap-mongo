
//  Workaround for async react routes to work with react-hot-reloader
//  https://github.com/reactjs/react-router/issues/2182
//  https://github.com/gaearon/react-hot-loader/issues/288

// https://github.com/gaearon/react-hot-loader
// "Wrap your application into <AppContainer>,
// all children of <AppContainer> will be reloaded when a change occurs:""

import Core from './containers/Core/Core';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Contact from './containers/Contact/Contact';
import PageNotFound from './containers/PageNotFound/PageNotFound';


const routes = [
  {
    component: Core,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
      },
      {
        path: '/about',
        component: About,
        exact: true,
      },
      {
        path: '/contact',
        component: Contact,
        exact: true,
      },
      {
        path: '*',
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
