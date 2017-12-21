
const indexX = (helmet = {}, appHtml = '') => (
`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${ helmet.title.toString() }
    
    <link rel="stylesheet" href="${process.env.NODE_ENV === 'production' ? '/static/styles.css': '/styles.css'}">
    <style> section { border-bottom: 1px solid #ccc; border-top: 1px solid #ccc; margin: 15px 0px }</style>
</head>
<body>
    <main id="app">${ appHtml }</main>
    
    <script src='${process.env.NODE_ENV === 'production' ? '/static/vendor.js' : '/vendor.js'}'></script>
    <script src='${process.env.NODE_ENV === 'production' ? '/static/app.js': '/app.js'}'></script>

</body>
</html>`
);

const index = () => (
  `<!doctype html>
  <html lang="en">
    <head>
      <link href="data:image/x-icon;" type="image/x-icon" rel="shortcut icon">
      <intercept-url pattern="/favicon.ico" access="ROLE_ANONYMOUS"></intercept-url>
      <title>Tester !!!!</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <div id="app">Apppppppppp1 !!!</div>
      <div><p>Apppppppppppppp2 !!!</p></div>
    </body>
  </html>`
);

export default index;