# Backend-Mongo

This is a simple Node.js backend application that uses MongoDB as a data store.

## Project Structure

    .
    ├── app
    │   ├── config.js
    │   ├── controllers
    │   │   └── userController.js
    │   ├── db.js
    │   ├── models
    │   │   └── userModel.js
    │   ├── routes
    │   │   └── userRoutes.js
    │   └── server.js
    ├── index.js
    └── package.json

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repo

```sh
git clone https://github.com/Jupalaja/mongo-backend.git
```

2. Install NPM packages

```sh
npm install
```

## Usage

1. Rename `.env.example` to `.env` and update the value of `MONGO_URL` with your MongoDB connection string.
2. Start the application

```sh
npm run dev
```

The API will serve on `http://localhost:3000`.

## API Endpoints

The following endpoints are available:

- GET `/users`: Get all users
- GET `/users/:id`: Get a user by id
- POST `/users`: Create a new user
- PATCH `/users/:id`: Update a user by id
- DELETE `/users/:id`: Delete a user by id
- GET `/users/search`: Search users by email

## Contributing

Any contributions you make are **greatly appreciated**.

## License

Distributed under the MIT License.
