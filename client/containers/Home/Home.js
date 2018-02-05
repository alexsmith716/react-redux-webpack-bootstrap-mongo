import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import GuestHomepage from '../../components/GuestHomepage/GuestHomepage';
import LoggedInHomepage from '../../components/LoggedInHomepage/LoggedInHomepage';

import { isAuthenticated } from '../../redux/modules/auth';

@asyncConnect([
  {
    promise: ({ store: { getState } }) => {
      const authenticated = isAuthenticated(getState());
      console.log('>>>>>>>>>>>>>>> Home > asyncConnect > isAuthenticated: ', authenticated);
    }
  }
])

@connect(state => ({
  user: state.auth.user
}))

export default class Home extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      fullName: PropTypes.string
    })
  };

  static defaultProps = {
    user: null
  }

  render() {
    return (

      this.props.user ? <LoggedInHomepage /> : <GuestHomepage />

    );
  }
}
