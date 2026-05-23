# Project Progress

## Version

Current version: `0.1.0`

Last updated: `2026-05-23`

## Overview

This project is a simple Node.js and Express API connected to MongoDB using Mongoose.

The current goal is to create a basic user API that can receive user data, validate it through a Mongoose model, and save it in the database.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- Morgan
- Nodemon

## Project Structure

```text
config/
  database.js
models/
  userModel.js
routes/
  userRout.js
services/
  userService.js
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

- Mounted user routes inside the Express app.
- Added server startup using `app.listen()`.

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

### Code Comments

- Added English comments to the main project files.
- Comments explain each file's purpose and benefit.
- Comments were added to:

```text
server.js
config/database.js
models/userModel.js
routes/userRout.js
services/userService.js
```

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

## Current Scripts

From `package.json`:

```json
{
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Version History

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
- Add a global error handler.
- Add API route prefix, such as `/api/v1`.
- Add tests when the API grows.
- Clean up formatting and unused imports.
