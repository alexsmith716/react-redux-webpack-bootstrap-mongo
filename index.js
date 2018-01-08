
if (process.env.NODE_ENV === 'production') {

    require('./build/server/server.bundle');

} else {

  require('babel-register')({

    plugins: [

      ['babel-plugin-css-modules-transform', {
        preprocessCss: './loaders/sassLoader.js',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        extensions: ['.css', '.scss'], // '.scss'
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
  require('./server/server');

}
