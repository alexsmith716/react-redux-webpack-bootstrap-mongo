
console.log('>>>>>>>>>>>>> Index.js >>>>>>>>> process.env.NODE_ENV: ', process.env.NODE_ENV);

// "env": {"development": {"plugins": ["transform-react-jsx-source"]}}
// Babel@6 doesn't export default module.exports
// https://github.com/59naga/babel-plugin-add-module-exports
// https://github.com/babel/babel/issues/2212
//     "add-module-exports",

if (process.env.NODE_ENV === 'production') {

  require('./build/server/server.bundle');

} else {
  require('babel-register')({
    plugins: [
      ['css-modules-transform', {
        preprocessCss: './loaders/sassLoader.js',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        extensions: ['.css', '.scss'],
      }],
      ['webpack-loaders', {
        config: './webpack.config.babel.js',
        verbose: true,
      }],
      'add-module-exports',
      'transform-es2015-modules-commonjs',
    ],
  });

  require('babel-polyfill');
  require('es6-promise').polyfill();
  //require('isomorphic-fetch');

  require('./server/server');

}
