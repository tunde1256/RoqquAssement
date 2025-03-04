# User, Post, and Address Management API

## Overview

The **User, Post, and Address Management API** provides a robust solution for managing users, their posts, and addresses. The API follows **RESTful** principles and supports CRUD (Create, Read, Update, Delete) operations for each resource, ensuring flexibility and scalability for a variety of use cases. The API is designed to support the needs of any application that requires user management and associated posts and address data.


## Table of Contents

1. **Base URL**
2. **Authentication**
3. **User Operations**
   - Get All Users
   - Get User Count
   - Get User by ID
   - Create User
4. **Post Operations**
   - Get All Posts by User ID
   - Get Paginated Posts by User ID
   - Create Post
   - Delete Post by ID
5. **Address Operations**
   - Get Address by User ID
   - Create Address
   - Update Address by User ID
6. **Error Handling**
7. **Postman Collection**
8. **Best Practices and Principles**

---

## 1. Base URL

The **base URL** for all the endpoints is:

http://localhost:4090


## 2. Authentication

This API assumes that authentication is handled externally (e.g., via OAuth2, JWT, etc.). Authentication details should be provided in the `Authorization` header if needed. For the purposes of this documentation, no authentication is assumed for any endpoints. However, you can extend this by adding the necessary authentication middleware.

---

## 3. User Operations

### 3.1 Get All Users

- **URL**: `/users`
- **Method**: `GET`
- **Description**: Retrieves a list of all users in the system.
- **Response**: 
 json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com"
    },
    ...
  ]


### 3.2 Get User Count

- **URL**: `/users/count`
- **Method**: `GET`
- **Description**: Retrieves the total number of users.
- **Response**:
  json
  {
    "count": 100
  }
 

### 3.3 Get User by ID

- **URL**: `/users/:id`
- **Method**: `GET`
- **Description**: Retrieves the details of a specific user based on their unique ID.
- **Parameters**:
  - `id` (path parameter): The ID of the user.
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  

### 3.4 Create User

- **URL**: `/users`
- **Method**: `POST`
- **Description**: Creates a new user.
- **Request Body**:
 json
  {
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
- **Response**:
 json
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  }




## 4. Post Operations

### 4.1 Get All Posts by User ID

- **URL**: `/posts?user_id=:user_id`
- **Method**: `GET`
- **Description**: Retrieves all posts for a specific user.
- **Parameters**:
  - `user_id` (query parameter): The ID of the user whose posts are to be retrieved.
- **Response**:
  json
  [
    {
      "id": 1,
      "title": "Post Title",
      "content": "Post Content",
      "user_id": 1
    },
  ]
  

### 4.2 Get Paginated Posts by User ID

- **URL**: `/posts/posts/paginated?user_id=:user_id&page=:page&limit=:limit`
- **Method**: `GET`
- **Description**: Retrieves paginated posts for a specific user.
- **Parameters**:
  - `user_id` (query parameter): The ID of the user whose posts are to be retrieved.
  - `page` (query parameter): The page number for pagination.
  - `limit` (query parameter): The number of posts per page.
- **Response**:
json
  {
    "posts": [
      {
        "id": 1,
        "title": "Post Title",
        "content": "Post Content",
        "user_id": 1
      }
    ],
    "totalPages": 5,
    "currentPage": 1
  }

### 4.3 Create Post

- **URL**: `/posts/posts`
- **Method**: `POST`
- **Description**: Creates a new post.
- **Request Body**:
  json
  {
    "title": "Post Title",
    "content": "Post Content",
    "user_id": 1
  }
- **Response**:
  json
  {
    "id": 1,
    "title": "Post Title",
    "content": "Post Content",
    "user_id": 1
  }
  

### 4.4 Delete Post by ID

- **URL**: `/posts/:id`
- **Method**: `DELETE`
- **Description**: Deletes a specific post by its ID.
- **Parameters**:
  - `id` (path parameter): The ID of the post to delete.
- **Response**:
  json
  {
    "message": "Post deleted successfully"
  }



## 5. Address Operations

### 5.1 Get Address by User ID

- **URL**: `/addresses/address/:user_id`
- **Method**: `GET`
- **Description**: Retrieves the address for a specific user.
- **Parameters**:
  - `user_id` (path parameter): The ID of the user whose address is to be retrieved.
- **Response**:
  json
  {
    "user_id": 1,
    "street": "Street Name",
    "city": "City Name",
    "state": "State Name",
    "zip_Code": "12345"
  }

### 5.2 Create Address

- **URL**: `/addresses`
- **Method**: `POST`
- **Description**: Creates a new address for a user.
- **Request Body**:
  json
  {
    "user_id": 1,
    "street": "Street Name",
    "city": "City Name",
    "state": "State Name",
    "zip_Code": "12345"
  }
  
- **Response**:
  json
  {
    "user_id": 1,
    "street": "Street Name",
    "city": "City Name",
    "state": "State Name",
    "zip_Code": "12345"
  }
  

### 5.3 Update Address by User ID

- **URL**: `/addresses/:user_id`
- **Method**: `PATCH`
- **Description**: Updates the address for a specific user.
- **Parameters**:
  - `user_id` (path parameter): The ID of the user whose address is to be updated.
- **Request Body**:
  json
  {
    "street": "Updated Street",
    "city": "Updated City",
    "state": "Updated State",
    "zip_Code": "54321"
  }
  
- **Response**:
  json
  {
    "user_id": 1,
    "street": "Updated Street",
    "city": "Updated City",
    "state": "Updated State",
    "zip_Code": "54321"
  }
  ```

---

## 6. Error Handling

The API uses standard HTTP status codes to indicate the result of an API request:

- **200 OK**: The request was successful.
- **201 Created**: The resource was successfully created.
- **400 Bad Request**: The request was invalid or missing required parameters.
- **404 Not Found**: The requested resource was not found.
- **500 Internal Server Error**: An unexpected error occurred.

In case of an error, the API returns a JSON object with the following structure:

json
{
  "status": "error",
  "message": "Error message"
}

## 7. Postman Collection

To facilitate easy testing and exploration of the API, a Postman collection has been created with all the available endpoints. You can import this collection into Postman to start making API requests immediately.

### Import Instructions:

1. Download the `User_Post_Address_Management_API.postman_collection.json` file.
2. Open Postman.
3. Click on the **Import** button in the top-left corner of the Postman interface.
4. Select the downloaded file and click **Open**.
5. The collection will be added to your Postman workspace, allowing you to make requests to the API directly.

---

## 8. Best Practices and Principles

### RESTful Design

The API follows the principles of REST (Representational State Transfer) by using standard HTTP methods and status codes. It uses nouns to represent resources and HTTP verbs to perform actions on those resources.

- **GET**: Retrieve data (e.g., get a user, get posts by a user).
- **POST**: Create a new resource (e.g., create a user, create a post).
- **PATCH**: Update an existing resource (e.g., update a user's address).
- **DELETE**: Remove a resource (e.g., delete a post).

### Data Validation

The API ensures that all required fields are validated before performing operations, especially for creating and updating resources. For example, when creating a user, the API

 validates that the email address is in the correct format.

### Scalability and Maintainability

The API is designed to be scalable and maintainable, following best practices such as separating routes into distinct modules and using middleware for validation and error handling. This makes it easier to extend the API in the future, such as adding more resource types or implementing authentication.


## Conclusion

The **User, Post, and Address Management API** provides a simple yet powerful interface for managing user data, posts, and addresses. It adheres to **best practices** in terms of **RESTful design**, **validation**, and **scalability**, making it an ideal solution for any application that requires these core functionalities. The included Postman collection allows for easy exploration and testing of all available endpoints.