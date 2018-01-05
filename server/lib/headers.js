
export const accessControlheaders = (req, res, next) => {
  console.log('>>>>>>>>> server > lib > headers > accessControlheaders <<<<<<<<<<<<');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, x-auth');
  res.header('X-Auth-Version', '1.0.0');
  next();
};