// subCategoryValidator.js
// Purpose: Defines validation rules for subcategory routes using express-validator.
// Benefit: Keeps request validation separate from route definitions and service logic.

const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

// Validate MongoDB ObjectId params before reading a subcategory.
// exports.getSubCategoryValidator = [
//   check('id').isMongoId().withMessage('Invalid subcategory ID'),
//   validatorMiddleware
// ];

// Validate subcategory creation body before saving a new subcategory.
exports.createSubCategoryValidator = [
  check('name').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),
  check('category').notEmpty().withMessage('Category is required').isMongoId().withMessage('Invalid category ID'),
  validatorMiddleware
];

// Validate subcategory ID and optional update fields before updating a subcategory.
// exports.updateSubCategoryValidator = [
//   check('id').isMongoId().withMessage('Invalid subcategory ID'),
//   check('name').optional().isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),
//   check('description').optional().isLength({ min: 10, max: 200 }).withMessage('Description must be between 10 and 200 characters'),
//   validatorMiddleware
// ];

// // Validate MongoDB ObjectId params before deleting a subcategory.
// exports.deleteSubCategoryValidator = [
//   check('id').isMongoId().withMessage('Invalid subcategory ID'),
//   validatorMiddleware
// ];

