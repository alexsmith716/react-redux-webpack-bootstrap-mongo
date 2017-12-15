
import App from './containers/App/App';
import HomePage from './containers/HomePage/HomePage';
import ErrorPage from './containers/ErrorPage/ErrorPage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';


const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomePage,
      },
      {
        path: '/error',
        exact: true,
        component: ErrorPage,
      },
      {
        path: '*',
        component: NotFoundPage
      },

    ],
  },
];


export default routes;


//  https://github.com/reactjs/react-router/issues/2182
//  https://github.com/gaearon/react-hot-loader/issues/288