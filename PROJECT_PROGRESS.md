# Project Progress

## Version

Current version: `0.3.0`

Last updated: `2026-05-28`

## Overview

This project is a simple Node.js and Express API connected to MongoDB using Mongoose.

The current goal is to create a basic API that can receive user and category data, validate it through Mongoose models, and save it in the database.

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

## Project Structure

```text
config/
  database.js
models/
  categoryModel.js
  userModel.js
routes/
  categoryRouts.js
  userRout.js
services/
  categoryServices.js
  userService.js
middlewares/
  errorMiddleware.js
utils/
  apiErrors.js
server.js
package.json
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

- Mounted user and category routes inside the Express app.
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
- Exported the router so it can be used in `server.js`.

### Category Service

- Created `services/categoryServices.js`.
- Added controller logic for category CRUD operations.
- Used `slugify` to generate a URL-friendly slug from the category name.
- Added pagination support for listing categories using `page` and `limit` query parameters.
- Used `express-async-handler` to pass async errors to Express.
- Replaced direct `404` category responses with shared `apiError` errors.

### Error Handling

- Created `utils/apiErrors.js`.
- Added a reusable `apiError` class for operational API errors.
- Created `middlewares/errorMiddleware.js`.
- Added a global error handler that returns errors in one JSON response format.
- Added handling for unknown routes using the same error flow.
- Updated category read, update, and delete operations to pass missing-category errors to the global handler.

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
services/userService.js
services/categoryServices.js
middlewares/errorMiddleware.js
utils/apiErrors.js
```

### Package Updates

- Added `slugify` for generating category slugs.
- Added `express-async-handler` for cleaner async category controllers.
- Added `@kramerdev/express-async-error-handler`.
- Added `pnpm-lock.yaml` alongside the existing npm lock file.

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

## Current Scripts

From `package.json`:

```json
{
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Version History

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
- Improve validation and error messages.
- Add API route prefix, such as `/api/v1`.
- Add tests when the API grows.
- Clean up formatting and unused imports.
