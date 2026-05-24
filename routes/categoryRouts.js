// categoryRouts.js
// Purpose: Defines the API routes related to categories.
// Benefit: Keeps category endpoint definitions separate from controller logic in categoryServices.js.

const express = require('express');

const router = express.Router();

const categoryService = require('../services/categoryServices');

// POST /categories creates a new category.
router.route('/categories').post(categoryService.createCategory).get(categoryService.getAllCategories);

// GET /categories/:id gets a single category by ID.
router.route('/categories/:id').get(categoryService.getCategoryById).delete(categoryService.deleteCategory).put(categoryService.updateCategory);

module.exports = router;
