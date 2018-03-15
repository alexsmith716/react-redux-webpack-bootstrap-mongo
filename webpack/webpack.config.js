var path = require('path');
var webpack = require('webpack');

var tether = require('tether');

var rootPath = path.resolve(__dirname, '..');
var assetsPath = path.resolve(rootPath, 'public', 'build', 'client');

/*
optimization: {
  splitChunks: {
    chunks: "all",
    minSize: 0,
  },
  occurrenceOrder: true
},
optimization: {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
     },
    },
  },
},
*/

module.exports = {

  mode: 'development',

  context: rootPath,

  entry: {
    main: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      'babel-polyfill',
      './client/assets/scss/global.scss',
      './client/index.entry.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-dom',
      'redux',
      'tether',
      'jquery',
      'bootstrap',
    ],
  },

  output: {
    path: assetsPath,
    publicPath: '/build/client/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
    occurrenceOrder: true
  },

  module: {
    strictThisContextOnImports: true,

    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/,],
        use: [
          { 
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [ path.resolve(rootPath, 'client/assets/scss') ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            }
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: [ path.resolve(rootPath, 'client/assets/scss') ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
          },
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
        }]
      },
      {
        test: '/jquery/',
        use: [{
          loader: 'expose-loader',
          options: 'jQuery',
        },{
          loader: 'expose-loader',
          options: '$',
        }]
      },
      {
        test: '/tether/',
        use: [{
          loader: 'expose-loader',
          options: 'Tether',
        }]
      },
    ]
  },

  resolve: {
    modules: [
      path.resolve(rootPath, 'client'),
      path.resolve('node_modules')
    ],
  },

  plugins: []
}
