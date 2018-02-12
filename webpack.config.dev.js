const webpack = require('webpack');
const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsConfig = require('./webpack.config.isomorphic');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('dotenv').config();

const host = process.env.HOST;
const port = process.env.PORT;

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> webpack.config.dev.js <<<<<<<<<<<<<<<<<<<<<<<<<<<');

// 'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
// 'webpack-hot-middleware/client?reload=true',

module.exports = {

  devtool: 'cheap-module-inline-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      'babel-polyfill',
      'isomorphic-fetch',
      path.join(__dirname, './client/assets/scss/global.scss'),
      path.join(__dirname, './client/index.js'),
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
    path: path.join(__dirname, './dist'),
    // the target directory for all output files
    filename: '[name].[chunkhash].js',
    // the filename template for entry chunks
    chunkFilename: '[name].[chunkhash].js',
    // the filename template for additional chunks
    publicPath: '/',
    //publicPath: 'http://localhost:3000/dist/',
    // the url to the output directory resolved relative to the HTML page
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
        include: [ path.join(__dirname, 'client/assets/scss') ],
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
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery',
        },{
          loader: 'expose-loader',
          options: '$',
        }]
      },
      {
        test: require.resolve('tether'),
        use: [{
          loader: 'expose-loader',
          options: 'Tether',
        }]
      },
    ]
  },

  resolve: {
    modules: ['client', 'node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.css', '.json',],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),

    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[hash].js',
    }),

    // DefinePlugin: GLOBAL constants created at COMPILE TIME ++++++++++++++++
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),

    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development(),

    /*
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 3000,
      defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: false
    }),
    */
    
  ]
};

/*
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
  "window.jQuery": "jquery",
  Tether: "tether",
  "window.Tether": "tether",
}),
*/
