# task3-web-development-
# Todo Backend API

## Overview
This project is a backend application for managing a Todo list. It provides a RESTful API to create, read, update, and delete todos, with support for filtering based on various criteria such as status, priority, category, and due date.

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- CORS
- JWT (for authentication, if implemented)
- date-fns (for date formatting)

## Project Structure
```
todo-backend
├── src
│   ├── app.js                  # Entry point of the application
│   ├── controllers
│   │   └── todoController.js   # Logic for handling todo API requests
│   ├── models
│   │   └── todo.js             # Mongoose schema for todo
│   ├── routes
│   │   └── todoRoutes.js       # API routes for todos
│   ├── middleware
│   │   └── auth.js             # Authentication middleware
│   └── utils
│       └── dateFormatter.js     # Utility functions for date formatting
├── .env                         # Environment variables (MongoDB URI, etc.)
├── package.json                 # NPM configuration file
├── README.md                    # Project documentation
└── .gitignore                   # Files to ignore in Git
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd todo-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
   ```
   MONGODB_URI=<your_mongodb_uri>
   ```

4. Start the application:
   ```
   npm start
   ```

## API Usage
### Base URL
The base URL for the API is `http://localhost:3000/todos`.

### Endpoints
- **GET /todos/**: Retrieve a list of todos, with optional query parameters for filtering.
- **GET /todos/:todoId/**: Retrieve a specific todo by ID.
- **POST /todos/**: Create a new todo.
- **PUT /todos/:todoId/**: Update an existing todo by ID.
- **DELETE /todos/:todoId/**: Delete a todo by ID.
- **GET /agenda/**: Retrieve todos by a specific due date.

### Query Parameters
- `status`: Filter by todo status (TO DO, IN PROGRESS, DONE).
- `priority`: Filter by todo priority (HIGH, MEDIUM, LOW).
- `category`: Filter by todo category (WORK, HOME, LEARNING).
- `search_q`: Search todos by a keyword in the todo text.
- `date`: Filter todos by due date.

## Design Choices
- The application uses a modular structure to separate concerns, making it easier to maintain and scale.
- Mongoose is used for MongoDB interactions, providing a schema-based solution to model application data.
- The API is designed to handle various filtering options, allowing users to retrieve todos based on specific criteria.

## Challenges Faced
- Ensuring proper validation for input data to prevent invalid entries in the database.
- Implementing error handling for various scenarios, such as invalid query parameters and database connection issues.
- Structuring the project in a way that allows for easy expansion in the future, such as adding authentication or additional features.

## License
This project is licensed under the MIT License.
