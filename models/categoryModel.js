// categoryModel.js
// Purpose: Defines the Category schema and model for MongoDB.
// Benefit: Centralizes category fields, validation rules, slug storage, and collection access.

const mongoose = require('mongoose');

// Create a schema that describes the shape and validation rules of a category document.
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    minlength: [3, 'Category name must be at least 3 characters long'],
    maxlength: [50, 'Category name must be less than 50 characters long'],
    unique: [true, 'Category name must be unique']
  },
  description: {
    type: String,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [200, 'Description must be less than 200 characters long']
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  }
  
},{ timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create a model that provides methods for creating, reading, updating, and deleting categories.
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
