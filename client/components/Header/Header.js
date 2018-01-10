
import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

//import styles from './Header.css';

export function Header(props, context) {

  const { router } = context;

  return (

    <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <NavLink className="navbar-brand" to="/">ThisGreatApp</NavLink>
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