const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('./webpack.config.isomorphic');
const projectBasePath = require('path').resolve(__dirname, './');

// #########################################################################

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> index.js >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

if (process.env.NODE_ENV === 'production') {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> index.js > production >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(
    webpackIsomorphicToolsConfig).server(projectBasePath, () => {
      require('./build/server/server.bundle');
    }
  );

} else {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> index.js > development >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  require('babel-register')({
    plugins: [
      ['babel-plugin-css-modules-transform', {
        preprocessCss: './loaders/sassLoader.js',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        extensions: ['.css', '.scss'],
      }],
      ['babel-plugin-webpack-loaders', {
        config: './webpack.config.babel.js',
        verbose: true,
      }],
    ],
  });
  
  require('babel-polyfill');
  require('es6-promise').polyfill();
  require('isomorphic-fetch');

  global.webpackIsomorphicTools = new WebpackIsomorphicTools(
    webpackIsomorphicToolsConfig).server(projectBasePath, () => {
      require('./server/server');
    }
  );
}
