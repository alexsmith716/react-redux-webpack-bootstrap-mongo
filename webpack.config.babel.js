
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
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000'
      }
    ]
  }
};

/*

      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        loader: 'file-loader',
      },

  {
    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
    use: 'file-loader',
  },
*/
