
//const fs = require('fs');
const path = require('path');

const nodeExternals = require('webpack-node-externals');

console.log('>>>>>>> webpack.config.server.js > process.env.NODE_ENV <<<<<<<<: ',  process.env.NODE_ENV);

module.exports = {
  entry: path.join(__dirname, './server/server.js'),

  output: {
    path: path.join(__dirname, './build/server'),
    filename: 'server.bundle.js',
    publicPath: '/build/server/'
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  externals: [nodeExternals({ importType: 'commonjs' })],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            ['css-modules-transform', {
              preprocessCss: './loaders/sassLoader.js',
              generateScopedName: '[name]__[local]__[hash:base64:5]',
              extensions: ['.css', '.scss']
            }],
            ['webpack-loaders', {
              config: './webpack.config.babel.js',
              verbose: false
            }],
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

