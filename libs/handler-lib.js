const StatusCodes = {
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  UNAUTHORIZED: 401,
};

export default function handler(lambda) {
  return function (event, context) {
    // Lambda functions could return a Promise (be asynchronous) or not
    return Promise.resolve()
      //run the lamda
      .then(() => lambda(event, context))
      //on success
      .then((responseBody) => [StatusCodes.OK, responseBody])
      //on failure
      .catch(e => {
        return [StatusCodes.INTERNAL_SERVER_ERROR, { error: e.message }];
      })
      //return http response
      .then(([statusCode, body]) => ({
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(body),
      }));
  };
};