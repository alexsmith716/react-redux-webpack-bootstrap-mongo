import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import renderRoutes from 'react-router-config/renderRoutes';
import Helmet from 'react-helmet';

import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/modules/info';
import { isAuthLoaded, loadAuth, logout } from '../../redux/modules/auth';

import Notifs from '../../components/Notifs/Notifs';
import config from '../../../server/config';

@asyncConnect([
  {
    promise: async ({ store: { dispatch, getState } }) => {
      console.log('>>>>>>>>>>>>> APP.JS > asyncConnect > isAuthLoaded FALSE ??? <<<<<<<<<<<<<<<<<<<');
      if (!isAuthLoaded(getState())) {
        console.log('>>>>>>>>>>>>> APP.JS > asyncConnect > isAuthLoaded FALSE <<<<<<<<<<<<<<<<<');
        await dispatch(loadAuth());
      }
      console.log('>>>>>>>>>>>>> APP.JS > asyncConnect > isInfoLoaded FALSE ??? <<<<<<<<<<<<<<<<<<<');
      if (!isInfoLoaded(getState())) {
        console.log('>>>>>>>>>>>>> APP.JS > asyncConnect > isInfoLoaded FALSE <<<<<<<<<<<<<<<<<');
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

export default class App extends Component {
  static propTypes = {
    user: PropTypes.shape({ email: PropTypes.string }),
    notifs: PropTypes.shape({ global: PropTypes.array }).isRequired,
    logout: PropTypes.func.isRequired,
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    })
  };

  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.user && nextProps.user) {
  //     this.context.router.history.push('/loginSuccess');
  //   } else if (this.props.user && !nextProps.user) {
  //     this.context.router.history.push('/');
  //   }
  // }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { notifs, route } = this.props;
    console.log('>>>>>>>>>>>>> APP.JS > render() <<<<<<<<<<<<<<');
    return (
      <div>
        <Helmet {...config.app.head} />
        <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">Fixed navbar</a>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><span className="fa fa-headphones"/>Headphones!</a>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" placeholder="Search" type="text"></input>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>

        <div>
          {notifs.global && (
            <div>
              <Notifs
                namespace="global"
                NotifComponent={props => <div>{props.message}</div>}
              />
            </div>
          )}
          {renderRoutes(route.routes)}
        </div>
        <div>
          Copyright © 2018 · Election App 2018!
        </div>

      </div>
    );
  }
}
