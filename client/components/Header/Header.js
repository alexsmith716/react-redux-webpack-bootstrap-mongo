
import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

//import styles from './Header.css';
// <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
//    <img src="/public/static/images/icon-bar-36.svg" alt="menu icon"></img>
//  </button>
// <li className="nav-item"><NavLink className="nav-link" to="#">Sign Up</NavLink></li>
// <li className="nav-item"><NavLink className="nav-link" to="#">Log In</NavLink></li>

export function Header(props, context) {

  const { router } = context;

  return (

    <nav className="navbar navbar-toggleable-md navbar-custom navbar-inverse fixed-top bg-inverse" role="navigation">

      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>

      <NavLink className="navbar-brand" to="/">Election App 2018</NavLink>

      <div className="collapse navbar-collapse" id="navbarCollapse">

        <ul className="navbar-nav mr-auto">
          <li className="nav-item active"><NavLink className="nav-link" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
        </ul>

      </div>

    </nav>

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