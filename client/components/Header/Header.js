
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

    <nav className="navbar navbar-toggleable-md navbar-custom fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header"><NavLink className="navbar-brand nav-link" to="/">Election App 2018</NavLink>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target=".navbar-main-collapse"><img src="/public/static/images/icon-bar-36.svg" alt="menu icon"></img></button>
        </div>
        <div className="navbar-collapse navbar-main-collapse collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>
        </div>
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