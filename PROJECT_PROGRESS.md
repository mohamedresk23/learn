# Project Progress

## Version

Current version: `0.6.0`

Last updated: `2026-06-14`

## Overview

This project is a simple Node.js and Express API connected to MongoDB using Mongoose.

The current goal is to create a basic API that can receive user and category data, validate it through Mongoose models, and save it in the database.
Subcategories can now be created and linked to existing parent categories.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- Morgan
- Nodemon
- slugify
- express-async-handler
- @kramerdev/express-async-error-handler
- express-validator
- ESLint
- Prettier

## Project Structure

```text
config/
  database.js
models/
  categoryModel.js
  subCategoryModel.js
  userModel.js
routes/
  categoryRouts.js
  subCategoryRouts.js
  userRout.js
services/
  categoryServices.js
  subCategoryService.js
  userService.js
middlewares/
  errorMiddleware.js
  validatorMiddleware.js
utils/
  apiErrors.js
  validators/
    categoryValidator.js
    subCategoryValidator.js
server.js
package.json
.eslintrc.json
```

## What Has Been Done

### Server Setup

- Created `server.js` as the main entry point of the application.
- Set up an Express app.
- Added JSON body parsing using `express.json()`.
- Added a basic health route:

```http
GET /
```

- Mounted user, category, and subcategory routes inside the Express app.
- Added server startup using `app.listen()`.
- Added a fallback route handler for unknown URLs.
- Connected the fallback route to the global error handler.

### Environment Variables

- Added dotenv setup to load variables from `config.env`.
- The app currently expects values like:

```text
PORT
NODE_ENV
DB_URL
```

### Database Connection

- Created `config/database.js`.
- Added a reusable `dbConnect` function.
- Connected the app to MongoDB using `mongoose.connect(process.env.DB_URL)`.
- Added success and error handling for the database connection.
- Added a startup check that stops the app when `DB_URL` is missing.

### User Model

- Created `models/userModel.js`.
- Added a Mongoose schema for users.
- Current user fields:

```text
name  - required string
email - required unique string
age   - number with minimum value 0
```

- Created and exported the `User` model.

### User Routes

- Created `routes/userRout.js`.
- Added an Express router.
- Added the current user endpoint:

```http
POST /users
```

- Connected the route to the user service.
- Exported the router so it can be used in `server.js`.

### User Service

- Created `services/userService.js`.
- Added the controller logic for creating a new user.
- Used `User.create()` to save user data in MongoDB.
- Fixed the async/await issue by making the route handler an `async` function.
- Added basic error handling with a `400` response.

### Category Model

- Created `models/categoryModel.js`.
- Added a Mongoose schema for categories.
- Current category fields:

```text
name        - required unique string with length validation
description - optional string with length validation
slug        - lowercase string used for URL-friendly category names
```

- Enabled timestamps so each category has `createdAt` and `updatedAt` fields.
- Created and exported the `Category` model.

### SubCategory Model

- Created `models/subCategoryModel.js`.
- Added a Mongoose schema for subcategories.
- Current subcategory fields:

```text
name     - unique string with trim and length validation
slug     - lowercase URL-friendly subcategory name
category - required ObjectId reference to the parent Category
```

- Enabled timestamps so each subcategory has `createdAt` and `updatedAt` fields.
- Created and exported the `SubCategory` model.

### Category Routes

- Created `routes/categoryRouts.js`.
- Added an Express router for category endpoints.
- Added the current category endpoints:

```http
POST /categories
GET /categories
GET /categories/:id
PUT /categories/:id
DELETE /categories/:id
```

- Connected the routes to the category service.
- Connected category routes to the express-validator validation layer.
- Exported the router so it can be used in `server.js`.

### Category Validation

- Created `utils/validators/categoryValidator.js`.
- Added route validation rules using `express-validator`.
- Added validation for category MongoDB IDs on:

```http
GET /categories/:id
PUT /categories/:id
DELETE /categories/:id
```

- Added create category validation for:

```text
name        - required string between 3 and 50 characters
description - optional string between 10 and 200 characters
```

- Added update category validation for:

```text
id          - valid MongoDB ObjectId
name        - optional string between 3 and 50 characters
description - optional string between 10 and 200 characters
```

### SubCategory Routes

- Created `routes/subCategoryRouts.js`.
- Added an Express router for subcategory endpoints.
- Added the current subcategory endpoint:

```http
POST /subcategories
```

- Connected the route to the subcategory service.
- Connected subcategory routes to the express-validator validation layer.
- Exported the router so it can be used in `server.js`.

### SubCategory Validation

- Created `utils/validators/subCategoryValidator.js`.
- Added route validation rules using `express-validator`.
- Added create subcategory validation for:

```text
name     - required string between 3 and 50 characters
category - required valid MongoDB ObjectId
```

### Category Service

- Created `services/categoryServices.js`.
- Added controller logic for category CRUD operations.
- Used `slugify` to generate a URL-friendly slug from the category name.
- Added pagination support for listing categories using `page` and `limit` query parameters.
- Used `express-async-handler` to pass async errors to Express.
- Replaced direct `404` category responses with shared `apiError` errors.

### SubCategory Service

- Created `services/subCategoryService.js`.
- Added controller logic for creating subcategories.
- Checked that the parent category exists before creating a subcategory.
- Used `slugify` to generate a URL-friendly slug from the subcategory name.
- Used the shared `apiError` class when the requested parent category does not exist.

### Error Handling

- Created `utils/apiErrors.js`.
- Added a reusable `apiError` class for operational API errors.
- Created `middlewares/errorMiddleware.js`.
- Added a global error handler that returns errors in one JSON response format.
- Added handling for unknown routes using the same error flow.
- Updated category read, update, and delete operations to pass missing-category errors to the global handler.
- Created `middlewares/validatorMiddleware.js` to return `400 Bad Request` when express-validator finds invalid request data.

### Code Comments

- Added English comments to the main project files.
- Comments explain each file's purpose and benefit.
- Comments were added to:

```text
server.js
config/database.js
models/userModel.js
models/categoryModel.js
routes/userRout.js
routes/categoryRouts.js
routes/subCategoryRouts.js
services/userService.js
services/categoryServices.js
services/subCategoryService.js
middlewares/errorMiddleware.js
middlewares/validatorMiddleware.js
utils/apiErrors.js
utils/validators/categoryValidator.js
utils/validators/subCategoryValidator.js
models/subCategoryModel.js
.eslintrc.json
```

### Package Updates

- Added `slugify` for generating category slugs.
- Added `express-async-handler` for cleaner async category controllers.
- Added `@kramerdev/express-async-error-handler`.
- Added `express-validator` for route-level request validation.
- Added `pnpm-lock.yaml` alongside the existing npm lock file.
- Added ESLint, Airbnb config, Node plugin, Prettier config, and related linting plugins.
- Added `cross-env` for setting production environment variables in npm scripts.

### Linting Configuration

- Created `.eslintrc.json`.
- Extended Airbnb, Prettier, and Node recommended linting rules.
- Added project-specific rule overrides for console logging, process exit usage, underscore fields, and selected warning levels.

## Current API

### Create User

```http
POST /users
```

Example request body:

```json
{
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "age": 25
}
```

Success response:

```http
201 Created
```

Error response:

```http
400 Bad Request
```

Validation error response:

```http
400 Bad Request
```

### Categories

```http
POST /categories
GET /categories
GET /categories/:id
PUT /categories/:id
DELETE /categories/:id
```

Example create request body:

```json
{
  "name": "Electronics",
  "description": "Products related to electronic devices"
}
```

Success responses:

```http
200 OK
201 Created
```

Not found response:

```http
404 Not Found
```

Unknown route response:

```http
404 Not Found
```

Category validation currently checks request data before the service layer runs. Invalid category IDs or invalid category body fields return `400 Bad Request`.

### SubCategories

```http
POST /subcategories
```

Example create request body:

```json
{
  "name": "Mobile Phones",
  "category": "665f0c2f8c4a8b0012ab3456"
}
```

Success response:

```http
201 Created
```

Validation error response:

```http
400 Bad Request
```

Missing parent category response:

```http
404 Not Found
```

Subcategory validation currently checks the subcategory name and parent category ID before the service layer runs.

## Current Scripts

From `package.json`:

```json
{
  "start:dev": "nodemon server.js",
  "start:prod": "cross-env NODE_ENV=production node server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Version History

### `0.6.0` - 2026-06-14

- Added `routes/subCategoryRouts.js`.
- Added `services/subCategoryService.js`.
- Added `utils/validators/subCategoryValidator.js`.
- Mounted subcategory routes in `server.js`.
- Added subcategory creation linked to an existing parent category.
- Added request validation for creating subcategories.
- Added English comments explaining the new subcategory route and service files.
- Updated this progress documentation file.

### `0.5.0` - 2026-06-06

- Added `models/subCategoryModel.js`.
- Added the subcategory schema with name, slug, and parent category reference fields.
- Added English comments explaining the subcategory model.
- Added `.eslintrc.json` for ESLint, Airbnb, Prettier, and Node linting rules.
- Added linting and formatting dev dependencies.
- Added `cross-env` and production startup script support.
- Updated this progress documentation file.

### `0.4.0` - 2026-05-29

- Added `express-validator` validation rules for category routes.
- Added `utils/validators/categoryValidator.js`.
- Added `middlewares/validatorMiddleware.js`.
- Validated category IDs before read, update, and delete operations.
- Validated category create and update request bodies.
- Updated category routes to use validator middleware before service handlers.
- Added comments explaining the new validation files.
- Updated this progress documentation file.

### `0.3.0` - 2026-05-28

- Added a custom `apiError` class for consistent operational API errors.
- Added a global Express error middleware.
- Added unknown route handling in `server.js`.
- Updated category not-found handling to use the shared error flow.
- Added a `DB_URL` startup guard in the database connection.
- Added comments explaining the new error handling changes.
- Fixed `updateCategory` so it receives `next` before forwarding errors.
- Updated this progress documentation file.

### `0.2.0` - 2026-05-24

- Added category model with validation, slug support, and timestamps.
- Added category routes for create, list, read, update, and delete operations.
- Added category service/controller logic.
- Added category pagination using `page` and `limit` query parameters.
- Mounted category routes in `server.js`.
- Added `slugify`, `express-async-handler`, and `@kramerdev/express-async-error-handler` dependencies.
- Added English comments explaining the new category files.
- Updated this progress documentation file.

### `0.1.0` - 2026-05-23

- Initial Express server setup.
- MongoDB connection setup.
- User model created with validation.
- User creation route added.
- User service/controller added.
- Fixed `await` usage by making the handler async.
- Added English comments explaining project files.
- Added this progress documentation file.

## Next Steps

- Add more user endpoints:
  - `GET /users`
  - `GET /users/:id`
  - `PATCH /users/:id`
  - `DELETE /users/:id`
- Improve validation and error messages for user routes.
- Add API route prefix, such as `/api/v1`.
- Add tests when the API grows.
- Clean up formatting and unused imports.
