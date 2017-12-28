
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { OK, NO_CONTENT, UNAUTHORIZED, FORBIDDEN } from '../../constants/statusCodes';
import { getSOME_HOME_ACTION} from '../../actions/HomeActions';
//import { isError, isException } from '../../reducers/ErrorReducer';
//import { isRegistered } from '../../reducers/AppContainerReducer';

// import apiHandler from '../../services/apiHandler';

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    this.props.dispatch(someAction());
  }

  render() {

    return(

      <div>

        <Helmet>

          <title>Home</title>

        </Helmet>

        <h3>Index Home Page!</h3>

        <p>ThisGreatApp are dedicated to providing the highest level of customer service. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>

      </div>

    )
  }

};

const mapStateToProps = (state) => {
  return {
    ...state.dashboard,
    ...state.user,
    termsAccepted: areTermsAccepted(state),
    isRegistered: isRegistered(state),
    isError: isError(state),
    isException: isException(state),
    error: state.error,
  };
};

export default connect(mapStateToProps)(Home);

