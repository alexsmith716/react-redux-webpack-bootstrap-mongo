
console.error('>>>>>>>>>>>>>>>> Load.controller <<<<<<<<<<<<<<<<<');


export default function load() {
  return new Promise(resolve => {
    resolve({
      message: 'This came from the api server',
      time: Date.now()
    });
  });
}

