const globalErrorHandler = (err, req, res, next) => {
  // console.error('Error:', err);
  // Normalize any thrown error before sending it to the client.
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Keep all API errors in one consistent JSON shape.
  res.status(err.statusCode).json({ 
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack 
   });
};

module.exports = globalErrorHandler;
