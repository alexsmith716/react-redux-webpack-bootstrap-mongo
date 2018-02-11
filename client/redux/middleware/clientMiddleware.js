
export default function clientMiddleware(client) {

  console.log('>>>>>>>>>>>>>>>>>> clientMiddleware.js > client: ', client);

  return ({ dispatch, getState }) => next => action => {

    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action;

    if (!promise) {
      console.log('>>>>>>>>>>>>>>>>>> clientMiddleware.js > return > NO promise: ', promise);
      return next(action);
    }

    console.log('>>>>>>>>>>>>>>>>>> clientMiddleware.js > return > YES promise: ', promise);

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({ ...rest, type: REQUEST });

    const actionPromise = promise(client, dispatch);

    console.log('>>>>>>>>>>>>>>>>>> clientMiddleware.js > return > YES promise > actionPromise: ', actionPromise);

    actionPromise
      .then(
        result => next({ ...rest, result, type: SUCCESS }),
        error => next({ ...rest, error, type: FAILURE })
      ).catch(error => {
        console.error('MIDDLEWARE ERROR:', error);
        next({ ...rest, error, type: FAILURE });
      });

    return actionPromise;
  };
}
