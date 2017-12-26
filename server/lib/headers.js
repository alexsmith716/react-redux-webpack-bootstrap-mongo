
export const accessControlheaders = (req, res, next) => {
  console.log('>>>>>>>>> server > lib > headers > accessControlheaders <<<<<<<<<<<<');
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods',);
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};
