
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { OK, NO_CONTENT, UNAUTHORIZED, FORBIDDEN } from '../../constants/statusCodes';
import { getSomeHomeAction} from '../../actions/HomeActions';
//import { isError, isException } from '../../reducers/ErrorReducer';
//import { isRegistered } from '../../reducers/AppContainerReducer';

// import style from './style.css';

import apiHandler from '../../services/apiHandler';

// <div className={`row ${css.colItems}`}>
// <div className={`col-md-4 ${css.colItem}`}>
// <div className="modal-backdrop fade in" style="display: none;"><img src="/public/static/images/ajax-loader.gif" style="position: fixed; top: 45%; left: 49%;"></img></div>

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

  render() {

    return(

      <div id="content">

        <header className="intro">
          <div className="intro-body">
            <div className="container">
              <h1 className="intro-heading">Election App 2017</h1>
              <h2>The 2016 presidential election is here!</h2>
              <p className="intro-text"><b>Who do you support and what are your comments? Join the conversation.</b></p>
              <p><a className="btn btn-primary btn-lg" href="#" role="button">Sign Up Now &raquo;</a></p>
            </div>
          </div>
        </header>

        <div className="container">

          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">Three Column Section Header</h1>
            </div>
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4><i></i>Three Column Section 1</h4>
                </div>
                <div className="panel-body">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, optio corporis quae nulla aspernatur in alias at numquam rerum ea excepturi expedita tenetur assumenda voluptatibus eveniet incidunt dicta nostrum quod?</p> <a className="btn btn-default" href="#">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4><i></i>Three Column Section 2</h4>
                </div>
                <div className="panel-body">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, optio corporis quae nulla aspernatur in alias at numquam rerum ea excepturi expedita tenetur assumenda voluptatibus eveniet incidunt dicta nostrum quod?</p> <a className="btn btn-default" href="#">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4><i></i>Three Column Section 3</h4>
                </div>
                <div className="panel-body">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, optio corporis quae nulla aspernatur in alias at numquam rerum ea excepturi expedita tenetur assumenda voluptatibus eveniet incidunt dicta nostrum quod?</p> <a className="btn btn-default" href="#">Learn More</a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <h2 className="page-header">Grided Section Heading</h2>
            </div>
            <div className="col-md-4 col-sm-6"><a href=""><img className="img-responsive" src="" alt=""></img></a></div>
            <div className="col-md-4 col-sm-6"><a href=""><img className="img-responsive" src="" alt=""></img></a></div>
            <div className="col-md-4 col-sm-6"><a href=""><img className="img-responsive" src="" alt=""></img></a></div>
            <div className="col-md-4 col-sm-6"><a href=""><img className="img-responsive" src="" alt=""></img></a></div>
            <div className="col-md-4 col-sm-6"><a href=""><img className="img-responsive" src="" alt=""></img></a></div>
            <div className="col-md-4 col-sm-6"><a href=""><img className="img-responsive" src="" alt=""></img></a></div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <h2 className="page-header">Features Section Header</h2>
            </div>
            <div className="col-md-6">
              <p>Features Section Header includes:</p>
              <ul>
                <li><strong>Features Suff included 1 highlighted</strong></li>
                <li>Features Suff included 2</li>
                <li>Features Suff included 3</li>
                <li>Features Suff included 4</li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, omnis doloremque non cum id reprehenderit, quisquam totam aspernatur tempora minima unde aliquid ea culpa sunt. Reiciendis quia dolorum ducimus unde.</p>
            </div>
            <div className="col-md-6"><img className="img-responsive" src="" alt=""></img></div>
          </div>
          <hr />

          <div className="well">
            <div className="row">
              <div className="col-md-8">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, expedita, saepe, vero rerum deleniti beatae veniam harum neque nemo praesentium cum alias asperiores commodi.</p>
              </div>
              <div className="col-md-4"><a className="btn btn-lg btn-default btn-block" href="#">Call to Action</a></div>
            </div>
          </div>

          <hr />

          <footer className="text-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <p>Copyright &copy; This Great Election App 2017</p>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>
    )
  }
}

export default Home;

