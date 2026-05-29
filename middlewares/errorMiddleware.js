const globalErrorHandler = (err, req, res, next) => {
  // console.error('Error:', err);
  // Normalize any thrown error before sending it to the client.
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // In development, send detailed error information for debugging.
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    // In production, send a generic message to avoid leaking details.
    sendErrorProd(err, res);
  }
};

const sendErrorDev = (err, res) => {
  // Keep all API errors in one consistent JSON shape.
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalErrorHandler;
