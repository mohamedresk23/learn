// userModel.js
// Purpose: Defines the User schema and model for MongoDB.
// Benefit: Centralizes user data structure, validation rules, and database collection access.

const mongoose = require('mongoose');

// Create a schema that describes the shape and validation rules of a user document.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  age: {
    type: Number,
    min: [0, 'Age must be a positive number']
  }
});

// Create a model that provides methods for creating, reading, updating, and deleting users.
const User = mongoose.model('User', userSchema);

module.exports = User;
