# Flyro-Backend - API

## User Registration Endpoint

This endpoint is used to register a new user.

### HTTP Method

- `POST`

### Endpoint URL

- `/api/v1/users/register`

### Request Body

The request body should contain the following fields:

- `fullname`: An object with two properties:
  - `firstname`: A string with a minimum length of 3 characters.
  - `lastname`: A string with a minimum length of 3 characters.
- `email`: A string with a minimum length of 5 characters, representing a valid email address.
- `password`: A string with a minimum length of 6 characters.

Example Request Body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Response Body

The response body should contain the following fields:

- `user`: An object with two properties:
  - `fullname`: An object with two properties:
    - `firstname`: A string with a minimum length of 3 characters.
    - `lastname`: A string with a minimum length of 3 characters.
- `token`: A jwt token.

Example Response Body:

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  },
  "token": "dummyToken"
}
```

# User Login Endpoint

This endpoint is used to login an existing user.

## HTTP Method

- `POST`

## Endpoint URL

- `/api/v1/users/login`

## Request Body

The request body should contain the following fields:

- `email`: A string representing the user's email address.
- `password`: A string representing the user's password.

## Example Request Body

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Response Body

The response body should contain the following fields:

- `user`: An object with two properties:
  - `fullname`: An object with two properties:
    - `firstname`: A string with a minimum length of 3 characters.
    - `lastname`: A string with a minimum length of 3 characters.
- `token`: A jwt token.

Example Response Body:

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  },
  "token": "dummyToken"
}
```

# Logout Endpoint

This endpoint is used to logout a user.

## HTTP Method

- `POST`

## Endpoint URL

- `/api/v1/users/logout`

## Request Body

No request body is required for this endpoint.

## Response Format

The response will be in JSON format and will contain a success message.

```json
{
  "message": "User logged out successfully"
}
```

# Get User Profile Endpoint

This endpoint is used to retrieve a user's profile information.

## HTTP Method

- `GET`

## Endpoint URL

- `/api/v1/users/profile`

## Request Body

No request body is required for this endpoint.

## Response Format

The response will be in JSON format and will contain the user's profile information.

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

# Captain Registration API Documentation

## Overview

This API endpoint allows for the registration of a new captain. It validates input data, ensures unique email addresses, hashes passwords, and generates an authentication token. The token is stored in a secure cookie upon successful registration.

---

## HTTP Method

- `POST`

## Endpoint URL

- `/api/v1/captain`

---

## Request Format

### **Headers**

| Header Name    | Type   | Description                 |
| -------------- | ------ | --------------------------- |
| `Content-Type` | String | Must be `application/json`. |

### **Body**

The request body should be a JSON object with the following structure:

- **`fullname`**: An object with the following properties:
  - **`firstname`**: A string with a minimum length of 3 characters.
  - **`lastname`**: A string with a minimum length of 3 characters.
- **`email`**: A string that must be a valid email address.
- **`password`**: A string with a minimum length of 6 characters.
- **`vehicle`**: An object describing the captain's vehicle with the following properties:
  - **`color`**: A string representing the vehicle's color.
  - **`type`**: A string that can be one of `car`, `auto`, or `motorcycle`.
  - **`capacity`**: A number representing the seating capacity of the vehicle.

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "type": "car",
    "capacity": 4
  }
}
```

---

## Response Format

### **Success Response**

If the captain is successfully registered, the server will return a JSON object containing the captain's details (excluding the password) and an authentication token.

#### **Status Code**: `200 OK`

#### Example Response Body:

```json
{
  "user": {
    "_id": "62c27c9f4f1a4b23456789ab",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "vehicle": {
      "color": "Red",
      "type": "car",
      "capacity": 4
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **Error Responses**

#### **1. Input Validation Errors**

If the input validation fails, the server will respond with a 400 error and details about the invalid fields.

- **Status Code**: `400 Bad Request`

- **Example Response**:

```json
{
  "error": [
    {
      "msg": "Email is invalid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### **2. Email Already Exists**

If the provided email is already associated with another captain, the server will return an error indicating the conflict.

- **Status Code**: `400 Bad Request`

- **Example Response**:

```json
{
  "error": "Captain already exists with this email."
}
```

#### **3. Server Errors**

If an unexpected error occurs during processing, the server will return a generic error message.

- **Status Code**: `400 Bad Request`

- **Example Response**:

```json
{
  "error": "An unexpected error occurred."
}
```
