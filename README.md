# Todo Server

This is a Todo server built with Fastify and MongoDB. It provides endpoints to create, read, update, and delete tasks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/todo-server.git
    cd todo-server
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a [.env](http://_vscodecontentref_/0) file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb://localhost:27017/todo
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Usage

The server will start on `http://localhost:3000`. You can use tools like Postman or curl to interact with the API.

## API Endpoints

### Create Task

- **URL:** `/tasks`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "todo": "Task description",
      "status": false,
      "type": "personal"
    }
    ```
- **Response:**
    ```json
    {
      "id": "task_id",
      "todo": "Task description",
      "status": false,
      "type": "personal",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
    ```

### Get Tasks

- **URL:** `/tasks`
- **Method:** `GET`
- **Query Parameters:**
    - `type` (optional): `personal` or `professional`
    - `page` (optional): Page number
    - `limit` (optional): Number of tasks per page
- **Response:**
    ```json
    {
      "data": [
        {
          "id": "task_id",
          "todo": "Task description",
          "status": false,
          "type": "personal",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ],
      "pagination": {
        "total": 1,
        "currentPage": 1,
        "totalPages": 1
      }
    }
    ```

### Update Task

- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **Body:**
    ```json
    {
      "todo": "Updated task description",
      "status": true,
      "type": "professional"
    }
    ```
- **Response:**
    ```json
    {
      "id": "task_id",
      "todo": "Updated task description",
      "status": true,
      "type": "professional",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
    ```

### Delete Task

- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Response:**
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```

## Models

### Task

- **id:** `ObjectId` or `string`
- **todo:** `string`
- **status:** `boolean`
- **type:** `string` (`personal` or `professional`)
- **createdAt:** `Date`
- **updatedAt:** `Date`

## License

This project is licensed under the MIT License.
