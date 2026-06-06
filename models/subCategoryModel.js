// subCategoryModel.js
// Purpose: Defines the SubCategory schema and model for MongoDB.
// Benefit: Links each subcategory to a parent category while keeping subcategory validation in one place.

const mongoose = require('mongoose');

// Create a schema that describes subcategory fields and their relationship to categories.
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [ true, 'subcategore must be unique' ],
      minlengnth: [ 2, 'To short subcategore ' ],
      maxlengnth: [ 40, 'To long subcategore ' ]
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [ true, 'Subcategore must be belong to category' ]
    }
  },
  { timestamps: true }
)

// Create a model that provides database access methods for subcategory documents.
module.exports = mongoose.model('SubCategory', subCategorySchema);
