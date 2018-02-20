
const apiRoutesTester = (req, res, next) => {

  console.log('>>>>>>>>>>>>>>>>>>>>>>>> apiRoutesTester !!!!!!!!! <<<<<<<<<<<<<<<<<<<<<');
  console.log('REQ.ip +++++++++: ', req.ip);
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

  res.status(200).send('apiRoutesTester > Response Ended For Testing!!!!!!! Status 200!!!!!!!!!');
  //return next();

};

export default apiRoutesTester;
