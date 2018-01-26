
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';

import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

//import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';

import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';

import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/reducers/info';
import { isAuthLoaded, loadAuth, logout } from '../../redux/reducers/auth';

//import { spinnerOn, spinnerOff } from '../../actions/AppContainerActions';
//import { getUser } from '../../actions/UserActions';
//import { isSpinnerOn, isRegistered, isLoggedIn, } from '../../redux/reducers/AppContainerReducer';

import Notifs from '../../components/Notifs/Notifs';


@asyncConnect([
  {
    promise: async ({ store: { dispatch, getState } }) => {
      if (!isAuthLoaded(getState())) {
        await dispatch(loadAuth());
      }
      if (!isInfoLoaded(getState())) {
        await dispatch(loadInfo());
      }
    }
  }
])

@connect(
  state => ({
    notifs: state.notifs,
    user: state.auth.user
  }),
  {
    logout
  }
)


class Core extends Component {

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.context.router.history.push('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      this.context.router.history.push('/');
    }
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const {
      user,
      notifs,
      route,
    } = this.props;

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    return (

      <div>

        <Helmet
          title="Client - Containers - Core - Core"
          titleTemplate="%s - ThisGreatApp!"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              'content': 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0',
            },
          ]}
        />

        <div>{route ? renderRoutes(route.routes) : null}</div>

      </div>

    );
  };
};


Core.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }),
  notifs: PropTypes.shape({ global: PropTypes.array }).isRequired,
  logout: PropTypes.func.isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired
};

Core.defaultProps = {
  user: null
};

Core.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.shape({
    history: PropTypes.object.isRequired
  })
};

export default Core;


