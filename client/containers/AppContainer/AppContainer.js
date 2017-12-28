
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
// import { renderRoutes } from 'react-router-config';

//import Header from '../../components/Header/Header';
//import Footer from '../../components/Footer/Footer';
import LoaderSpinner from '../../components/LoaderSpinner';

import { isSpinnerOn, isRegistered, isLoggedIn, } from 'reducers/AppContainerReducer';
import { spinnerOn, spinnerOff } from '../../actions/AppContainerActions';

//import { getUser } from '../../actions/UserActions';


class AppContainer extends Component {


  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  };

  componentDidMount() {
    this.setState({ isMounted: true });
    this.props.dispatch(getUser());
  };


  render() {

    const {
      spinner,
      isLoggedIn,
      registered,
    } = this.props;

    let spinnerContent;
    if (spinner === true) {
      spinnerContent = <LoaderSpinner />;
    }

    return(

      <div>

        <header>
          <NavLink to="/">Home!</NavLink>
          &nbsp;
          <NavLink to="/about">About Us!!</NavLink>
          &nbsp;
          <NavLink to="/contact">Contact Us!!!</NavLink>
        </header>

        <section>
          { this.props.children }
        </section>

        {spinnerContent}

        <footer>
          <p>Copyright &copy; ThisGreatApp! 2017</p>
        </footer>

      </div>

    )
  };
};


AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  spinner: PropTypes.bool,
  registered: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

AppContainer.defaultProps = {
  isLoggedIn: false,
  registered: false,
  termsAccepted: false,
};

function mapStateToProps(state) {
  console.log('>>>>>>> AppContainer > mapStateToProps(state): ', state);
  return {
    spinner: isSpinnerOn(state),
    isLoggedIn: isLoggedIn(state),
    isRegistered: isRegistered(state),
    isLoggedIn: isLoggedIn(state),
  };

};


export default connect(mapStateToProps)(AppContainer);


