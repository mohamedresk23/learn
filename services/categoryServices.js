// categoryServices.js
// Purpose: Contains the controller logic for category requests.
// Benefit: Handles category database operations, slug generation, pagination, and API responses in one place.

const Category = require('../models/categoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

// Create a new category from the request body and return the saved category.
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const newCategory = await Category.create({ name, description, slug: slugify(name, { lower: true }) });
  res.status(201).json(newCategory);

});

// Get all categories from the database and return them as a JSON response.
exports.getAllCategories = asyncHandler(async (req, res) => {
  const page= parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page if not provided
  const skip = (page - 1) * limit;
  const categories = await Category.find().skip(skip).limit(limit);
  res.status(200).json({ result: categories.length ,page, limit, categories  }); 

});

// Get a single category by ID from the database and return it as a JSON response.
exports.getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.status(200).json(category);
});

// Update a category by ID with the request body and return the updated category.
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, description, slug: slugify(name, { lower: true }) },
    { new: true, runValidators: true }
  );

  if (!updatedCategory) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.status(200).json(updatedCategory);
});

// Delete a category by ID from the database and return a success message.
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.status(200).json({ message: 'Category deleted successfully' });
});
