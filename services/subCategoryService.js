const slugify = require('slugify');

// subCategoryService.js
// Purpose: Contains the controller logic for subcategory requests.
// Benefit: Handles parent category checks, subcategory creation, slug generation, and API responses in one place.

// const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiErrors');
const subCategory = require('../models/subCategoryModel');
const Category = require('../models/categoryModel');

// Create a new subcategory after confirming that its parent category exists.
exports.createSubCategory = async (req, res, next) => {
  const { name, category } = req.body;

  // Prevent orphan subcategories by checking the parent category first.
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return next(new ApiError(`Category not found with id: ${ category }`, 404));
  } 

  const newSubCategory = await subCategory.create({ name, category, slug: slugify(name, { lower: true }) });
  res.status(201).json(newSubCategory);
};
