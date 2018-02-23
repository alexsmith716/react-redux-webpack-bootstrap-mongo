import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.

 * const helmet = Helmet.rewind();
 *  const attrs = helmet.htmlAttributes.toComponent();

  {assets.javascript && <script src={assets.javascript.app} charSet="UTF-8" />}
  {assets.styles && Object.keys(assets.styles).length === 0 ? (
    <script dangerouslySetInnerHTML={{ __html: 'document.getElementById("content").style.display="block";' }} />
  ) : null}
 */

const Html = props => {
  const { assets, content, store } = props;
  const head = Helmet.renderStatic();
  
  return (

    <html lang="en">

      <head>
        {/* (>>>>>>> META <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {head.base.toComponent()}
        {head.meta.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Election App 2018!" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Election App 2018!" />
        <meta name="theme-color" content="#1E90FF" />

        {/* (>>>>>>> TITLE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {head.title.toComponent()}

        {/* (>>>>>>> LINK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {head.link.toComponent()}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        {/* (>>>>>>> SCRIPT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<) */}
        {head.script.toComponent()}

      </head>

      <body>

        <div id="content" dangerouslySetInnerHTML={{ __html: content }} />

        {store && (
          <script
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />
        )}

        {assets.styles && Object.keys(assets.styles).length === 0 ? (
          <script dangerouslySetInnerHTML={{ __html: 'document.getElementById("content").style.display="block";' }} />
        ) : null}

        {Object.keys(assets.javascript)
          .filter(key => key.includes('app') || key.includes('vendor'))
          .reverse()
          .map(key => <script key={key} src={assets.javascript[key]} charSet="UTF-8" />)}

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

export default Html;
