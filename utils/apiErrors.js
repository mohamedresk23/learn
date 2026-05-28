class apiError extends Error {
  constructor(message, statusCode) {
    super(message);
    // Store HTTP metadata so the global error middleware can build a consistent response.
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}

module.exports = apiError;
