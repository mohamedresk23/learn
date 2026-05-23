// userService.js
// Purpose: Contains the controller logic for user requests.
// Benefit: Keeps route files clean by handling database operations and responses here.

const User = require('../models/userModel');

// Create a new user from the request body and return the saved user.
exports.getUser = async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const newUser = await User.create({ name, email, age });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
