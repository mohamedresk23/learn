// userRout.js
// Purpose: Defines the API routes related to users.
// Benefit: Separates route paths from the business logic in userService.js.

const express = require('express');

const router = express.Router();

const userService = require('../services/userService');

// POST /users creates a new user.
router.post('/users', userService.getUser);

module.exports = router;
