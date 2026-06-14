// server.js
// Purpose: The main entry point of the application.
// Benefit: Sets up Express, connects to the database, registers middleware, and mounts user/category/subcategory routes.

const express = require('express');

// Load environment variables from config.env, such as PORT, DB_URL, and NODE_ENV.
require('dotenv').config({ path: './config.env' })

const dbConnect = require('./config/database');
const userRoutes = require('./routes/userRout');
const categoryRoutes = require('./routes/categoryRouts');
const subCategoryRoutes = require('./routes/subCategoryRouts'); 
const morgan = require('morgan')
const mongoose = require('mongoose');
const apiError = require('./utils/apiErrors');
const globalErrorHandler =require('./middlewares/errorMiddleware')

// Connect to MongoDB before handling requests.
dbConnect();






const app = express();
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV ;



// Allow the app to read JSON data from request bodies.
app.use(express.json());

// In development mode, log request details in the terminal.
if (nodeEnv === 'development') {
  app.use(morgan('dev'))
  console.log(`mode : ${nodeEnv}`)

}
 


// Mount feature routes on the app.
app.use(userRoutes);
app.use(categoryRoutes);
app.use(subCategoryRoutes);
// app.post('/users', );

// Simple health route to check that the server is running.
app.get('/', (req, res) => {
  res.send('Hello World 2!');
});


app.use((req, res, next) => {
  // Forward unknown routes to the shared error middleware instead of responding here.
  next(new apiError(`Can't find this route: ${ req.originalUrl }`, 404));
});

// Central error handling middleware must be registered after all routes.
app.use(
 globalErrorHandler
);

// Start the server on the selected port.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 

// Events
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.name}\n${err.message}\n${err.stack}`); 
  server.close(() => {
    console.log(`Shutting down the server due to unhandled rejection`);
    process.exit(1);
  });   
}); 
