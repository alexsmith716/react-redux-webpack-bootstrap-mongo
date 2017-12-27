
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//import Header from '../../components/Header/Header';
//import Footer from '../../components/Footer/Footer';
//import LoaderSpinner from '../../components/LoaderSpinner';

//import {  } from '../../reducers/AppContainerReducer';
//import {  } from '../../actions/AppContainerActions';


class AppContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {

    return(

      <div>

        <header>

          <Link to="/">Home!</Link>
          &nbsp;
          <Link to="/about">About Us!!</Link>
          &nbsp;
          <Link to="/contact">Contact Us!!!</Link>

        </header>


        <section>

          { this.props.children }

        </section>


        //<footer>
        //</footer>

      </div>

    )
  }

};


export default AppContainer;

