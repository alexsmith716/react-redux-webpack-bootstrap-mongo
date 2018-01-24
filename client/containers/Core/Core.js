
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import DevTools from '../../components/DevTools/DevTools';

//import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';

import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';

// import style from './style.scss';

import { spinnerOn, spinnerOff } from '../../actions/AppContainerActions';
import { getUser } from '../../actions/UserActions';
import { isSpinnerOn, isRegistered, isLoggedIn, } from '../../redux/reducers/AppContainerReducer';


export class Core extends Component {

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  };

  // Core starting off actions with 'User' login status
  componentDidMount() {
    console.log('>>>>>>>>>>>>>> Client > Core > componentDidMount ++++++++++++++++++++');
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

          <Navbar
            isLoggedIn={isLoggedIn}
            registered={registered}
          />

          <div>{route ? renderRoutes(route.routes) : null}</div>

          {spinnerContent}

        </div>

      </div>

    );
  };
};


Core.propTypes = {
  dispatch: PropTypes.func.isRequired,
  spinner: PropTypes.bool,
  registered: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

Core.defaultProps = {
  isLoggedIn: false,
  registered: false,
  termsAccepted: false,
};


function mapStateToProps(state) {
  //console.log('>>>>>>> Core > mapStateToProps(state): ', state);
  return {
    spinner: isSpinnerOn(state),
    isLoggedIn: isLoggedIn(state),
    registered: isRegistered(state),
    isLoggedIn: isLoggedIn(state),
  };

};


export default connect(mapStateToProps)(Core);


