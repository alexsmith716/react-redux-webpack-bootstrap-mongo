
const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

console.log('>>>>> webpack.config.dev.js > process.env.NODE_ENV <<<<<: ', process.env.NODE_ENV);

module.exports = {
  
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?reload=true',
      //'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      'babel-polyfill',
      path.join(__dirname, './client/index.js')
    ],
    // vendor: ['react', 'redux', 'react-dom']
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: 'http://0.0.0.0:3000/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json',],
    modules: ['client', 'node_modules']
  },


  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/,],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [ path.resolve(__dirname, 'client/assets/scss') ],
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
        exclude: [ path.resolve(__dirname, 'client/assets/scss') ],
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
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
};
