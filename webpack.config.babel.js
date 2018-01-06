
let cssModulesIdentName = '[name]__[local]__[hash:base64:5]';

if (process.env.NODE_ENV === 'production') {

  cssModulesIdentName = '[hash:base64]';

}


console.log('>>>>>>> webpack.config.babel.js <<<<<<<<<<<<<<<<<<<<<<');

// this concerns server only
// what server-side code needs to be loaded and transformed (Babel) from es6 to es5
// while keeping in mind what will be transpiled and available client-side by "webpack.config.dev.js"
// "webpack.config.dev.js" already will have the client-side css/scss ready for the server-side sent "res.send" html

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json',],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
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
  }
};

/*
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
      */

