
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

        <div className={style.bgYELLOW}>
          <p>This is a local CSS module. The BG color is Yellow.</p>
        </div>

        <div className={style.bgCHARTREUSE}>
          <p>This is a local CSS module. The BG color is Chartreuse.</p>
        </div>

        <div className={`row ${style.colItems}`}>
          <div className={`col-md-4 ${style.colItem}`}>
            <span className="fa fa-headphones"></span>
            <span className={style.text}>It!!!</span>
          </div>
          <div className={`col-md-4 ${style.colItem}`}>
            <span className="fa fa-glass"></span>
            <span className={style.text}>Just!!</span>
          </div>
          <div className={`col-md-4 ${style.colItem}`}>
            <span className="fa fa-thumbs-up"></span>
            <span className={style.text}>Works!</span>
          </div>
        </div>

        <div className={`row ${style.colorMarginStyle}`}>
          <div className={`col-md-4 ${style.bgSPRINGGREEN}`}>
            <span className={style.bgPINK}>fa fa-headphones</span>
          </div>
          <div className={`col-md-4 ${style.bgSKYBLUE}`}>
            <span className={style.bgPINK}>fa fa-glass</span>
          </div>
          <div className={`col-md-4 ${style.bgSPRINGGREEN}`}>
            <span className={style.bgPINK}>fa fa-thumbs-up</span>
          </div>
        </div>

      </div>
    )
  }
}

export default Home;

