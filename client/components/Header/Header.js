
import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

//import bg from 'assets/img/header-bk.png';
//import UserBadge from 'components/UserBadge';
//import LanguageSwitcher from 'components/LanguageSwitcher';

//import styles from './Header.css';

export function Header(props, context) {

  const { router } = context;

  // const isRouteActive = (path) => {
  //   if (!router || !router.history || !router.history.location) {
  //     return false;
  //   }
  //   return router.history.location.pathname === path;
  // };

  const buildLink = () => {

    if (!router || !router.history || !router.history.location) {
      return false;
    }

    let path = '/';
    let textId = 'Home';

    switch (router.history.location.pathname) {

      case '/error':
        // back to dashboard
        break;

      case '/about':
        path = '/about';
        textId = 'About';
        break;

      case '/contact':
        path = '/contact';
        textId = 'Contact';
        break;

      default:
        path = '/about';
        textId = 'About';
        break;
    }

    if ( path === null ) {
      return path;
    }
    return <NavLink to={path} >{textId}</NavLink>;
  };

  const menu = buildLink();

  console.log(props.isLoggedIn);

  return (
    <div>
      <div>
        {menu}
      </div>
      <div>
        Foooooo!!!: {props.isLoggedIn}
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  registered: PropTypes.bool.isRequired,
};

export default Header;
