// categoryValidator.js
// Purpose: Defines validation rules for category routes using express-validator.
// Benefit: Keeps request validation separate from route definitions and service logic.

const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

// Validate MongoDB ObjectId params before reading a category.
exports.getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category ID'),
  validatorMiddleware
];

// Validate category creation body before saving a new category.
exports.createCategoryValidator = [
  check('name').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),
  check('description').optional().isLength({ min: 10, max: 200 }).withMessage('Description must be between 10 and 200 characters'),
  validatorMiddleware
];

// Validate category ID and optional update fields before updating a category.
exports.updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category ID'),
  check('name').optional().isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),     
  check('description').optional().isLength({ min: 10, max: 200 }).withMessage('Description must be between 10 and 200 characters'),
  validatorMiddleware
];

// Validate MongoDB ObjectId params before deleting a category.
exports.deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category ID'),
  validatorMiddleware
];

