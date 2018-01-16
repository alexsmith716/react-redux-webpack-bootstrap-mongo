
import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

//import styles from './Nav.css';
// <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
//    <img src="/public/static/images/icon-bar-36.svg" alt="menu icon"></img>
//  </button>
// <li className="nav-item"><NavLink className="nav-link" to="#">Sign Up</NavLink></li>
// <li className="nav-item"><NavLink className="nav-link" to="#">Log In</NavLink></li>
// <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse" role="navigation">

export function Nav(props, context) {

  const { router } = context;

  return (

    <nav className="container w-100">
      <div className="d-flex justify-content-between fixed-top hidden-lg-up">
        <NavLink className="navbar-brand nav-link" to="">Bootstrap</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bd-main-nav" aria-controls="bd-main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="collapse navbar-collapse" id="bd-main-nav">

        <ul className="nav navbar-nav">

          <li className="nav-item active">
            <NavLink className="nav-link " to="">Bootstrap</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link active" to="">Documentation</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link " to="">Examples 1</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link " to="">Examples 2</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link " to="">Examples 3</NavLink>
          </li>

        </ul>

      </div>

    </nav>

  );
}

Nav.contextTypes = {
  router: PropTypes.object,
};

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  registered: PropTypes.bool.isRequired,
};

export default Nav;
