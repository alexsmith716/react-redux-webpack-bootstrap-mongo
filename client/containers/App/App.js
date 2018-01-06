
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import DevTools from '../../components/DevTools/DevTools';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';

// import styles from './App.scss';

import { spinnerOn, spinnerOff } from '../../actions/AppContainerActions';
import { getUser } from '../../actions/UserActions';
import { isSpinnerOn, isRegistered, isLoggedIn, } from '../../reducers/AppContainerReducer';


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  };

  // App starting off actions with 'User' login status
  componentDidMount() {
    console.log('>>>>>>>>>>>>>> Client > App > componentDidMount ++++++++++++++++++++');
    this.setState({ isMounted: true });
    this.props.dispatch(getUser());
  };

  render() {

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const {
      route,
      spinner,
      isLoggedIn,
      registered,
    } = this.props;

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    let spinnerContent;
    if (spinner === true) {
      spinnerContent = <LoaderSpinner />;
    }

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    return (

      <div>

        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}

        <div>

          <Helmet
            title="Client - Containers - App - App"
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

          <Header
            isLoggedIn={isLoggedIn}
            registered={registered}
          />

          <div>{route ? renderRoutes(route.routes) : null}</div>

          {spinnerContent}

          <Footer />

        </div>

      </div>

    );
  };
};


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  spinner: PropTypes.bool,
  registered: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  isLoggedIn: false,
  registered: false,
  termsAccepted: false,
};


function mapStateToProps(state) {
  //console.log('>>>>>>> App > mapStateToProps(state): ', state);
  return {
    spinner: isSpinnerOn(state),
    isLoggedIn: isLoggedIn(state),
    registered: isRegistered(state),
    isLoggedIn: isLoggedIn(state),
  };

};


export default connect(mapStateToProps)(App);


