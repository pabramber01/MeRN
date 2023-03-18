import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  if (err.name === 'CastError') {
    error.msg = `No item found with id: ${err.value}`;
    error.statusCode = 404;
  }

  if (err.name === 'ValidationError') {
    error.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join('; ');
    error.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    let field = Object.keys(err.keyValue)[0];
    let value = Object.values(err.keyValue)[0];
    field = field.charAt(0).toUpperCase() + field.slice(1);
    error.msg = `${field} '${value}' is already in use. Please, provide another`;
    error.statusCode = 400;
  }

  res.status(error.statusCode).json({ success: false, msg: error.msg });
};

const routeNotFoundMiddleware = (req, res) =>
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, msg: 'Route does not exists' });

export { errorHandlerMiddleware, routeNotFoundMiddleware };
