
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//require('dotenv').config();
// path: __dirname,
// path: path.join(__dirname, './dist'),
//       'webpack/hot/only-dev-server',
// 'webpack-hot-middleware/client?reload=true',
// 'webpack-hot-middleware/client?path=http://127.0.0.1:3000/__webpack_hmr',

console.log('>>>>> webpack.config.dev.js > process.env.NODE_ENV <<<<<: ', process.env.NODE_ENV);

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
      path.join(__dirname, './client/index.js')
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-dom',
      'redux',
      'redux-thunk',
    ],
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    //filename: 'app.js',
    //chunkFilename: '[name].[chunkhash].js',
    //publicPath: '/',
    publicPath: 'http://localhost:3000/',
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
    //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new webpack.NamedModulesPlugin(),

    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  minChunks: Infinity,
    //  filename: 'vendor.js',
    //}),

    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),

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
