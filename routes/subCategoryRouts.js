// subCategoryRouts.js
// Purpose: Defines the Express routes for subcategory endpoints.
// Benefit: Keeps subcategory URL definitions and validation middleware separate from controller logic.

const express = require('express');

const router = express.Router();

const {
  createSubCategory

} = require('../services/subCategoryService');
const {
  createSubCategoryValidator
} = require('../utils/validators/subCategoryValidator');

// Validate the request body before creating a subcategory.
router.route('/subcategories')
  .post(createSubCategoryValidator, createSubCategory);

module.exports = router;
