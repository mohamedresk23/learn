// validatorMiddleware.js
// Purpose: Reads express-validator results and stops the request when validation fails.
// Benefit: Keeps validation error responses consistent and removes repeated error-checking code from routes.

const { validationResult } = require('express-validator');

const validatorMiddleware = (req, res, next) => {
  // Collect validation errors produced by route validators, such as check('id').isMongoId().
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Return a 400 response before the request reaches the service/controller layer.
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = validatorMiddleware;
