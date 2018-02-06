import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

const Html1 = props => {

  const { assets, content, store } = props;
  const head = Helmet.renderStatic();


  return (
    <html lang="en">
      <head>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta http-equiv="X-UA-Compatible' content='IE=edge"/>
        <meta name="viewport', content='width=device-width, initial-scale=1"/>
        <meta name="description" content="Election App XXXXXX!!"/>

        <title>ThisGreatApp!</title>

      </head>
      <body>
        <div>
          <h3>Welcome back! Bbdhhd cdcdsnc ncsdcdscmn njkvfvjdkfvn.</h3>
          <ul>
            <li>Home</li>
            <li>Log In</li>
          </ul>
        </div>
      </body>
    </html>
  );

};

Html.propTypes = {
  assets: PropTypes.shape({
    styles: PropTypes.object,
    javascript: PropTypes.object
  }),
  content: PropTypes.string,
  store: PropTypes.shape({
    getState: PropTypes.func
  }).isRequired
};

Html.defaultProps = {
  assets: {},
  content: ''
};

export default Html1;

