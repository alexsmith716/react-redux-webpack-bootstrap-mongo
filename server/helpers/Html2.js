
const index = (helmet = {}, appHtml = '', initialState) => (
  `<!DOCTYPE html>
  <html lang="en-US">
    <head>

      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="react-redux-webpack-bootstrap-mongo">

      ${ helmet.title.toString() }

      <link rel="stylesheet" href="${process.env.NODE_ENV === 'production' ? '/public/static/dist/client/styles.css': ''}">

    </head>

    <body>

      <div id="app">${ appHtml }</div>

      <script>
          window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) }
      </script>
      
      <script src='${process.env.NODE_ENV === 'production' ? '/public/static/dist/client/vendor.js' : '/vendor.js'}'></script>

      <script src='${process.env.NODE_ENV === 'production' ? '/public/static/dist/client/app.js': '/app.js'}'></script>

    </body>

  </html>`
);

export default index;
