// categoryRouts.js
// Purpose: Defines the API routes related to categories.
// Benefit: Keeps category endpoint definitions separate from controller logic in categoryServices.js.

const express = require('express');

const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../services/categoryServices');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');

// POST /categories creates a new category.
router.route('/categories')
  .post(createCategoryValidator, createCategory)
  .get(getAllCategories);

// Category ID routes validate the :id param before calling the service layer.
router.route('/categories/:id')
  .get(getCategoryValidator, getCategoryById)
  .delete(deleteCategoryValidator, deleteCategory)
  .put(updateCategoryValidator, updateCategory);

module.exports = router;
