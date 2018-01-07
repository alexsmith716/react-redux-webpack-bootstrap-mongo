
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';


import { OK, NO_CONTENT, UNAUTHORIZED, FORBIDDEN } from '../../constants/statusCodes';
import { getSomeHomeAction} from '../../actions/HomeActions';
//import { isError, isException } from '../../reducers/ErrorReducer';
//import { isRegistered } from '../../reducers/AppContainerReducer';

import style from './style.css';

import apiHandler from '../../services/apiHandler';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

  render() {


    return(

      <div>

        <h3>client > containers > home !</h3>

        <p>Testing HMR SSR content in dev mode. It appears to be working as does DevTools which is cool.</p>

        <div className={style.bgYellow}>
          <p>This is a local CSS module. The BG color is Yellow.</p>

        </div>

        <div className={style.bgCHARTREUSE}>

          <p>This is a local CSS module. The BG color is Chartreuse.</p>

        </div>

      </div>

    )
  }
}

export default Home;

