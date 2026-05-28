// database.js
// Purpose: Handles the MongoDB connection.
// Benefit: Keeps database connection logic in one reusable place.

const mongoose = require('mongoose');

const dbConnect = () => {
  // Fail fast when the required database URL is missing instead of starting a broken server.
  if (!process.env.DB_URL) {
    console.error('Missing DB_URL in config.env');
    process.exit(1);
  }

  // Connect to MongoDB using the connection URL from environment variables.
  mongoose.connect(process.env.DB_URL).then((con) => {
    console.log(`Connected to MongoDB with host: ${ con.connection.host }`);
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Stop the app if the database connection fails.
  });
}

module.exports = dbConnect;
