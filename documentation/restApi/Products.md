# Products REST API Documentation

This document contains all the information about the **Products REST API**, including all endpoints, request examples, response examples, and possible errors.

---

## Base URL

http://localhost:3000

> Use the `PORT` defined in your `.env` file if different from 3000.

---

## 1. GET /products

Returns a list of all products.

Request:

GET /products HTTP/1.1
Host: localhost:3000

Response (200 OK):

[
{ "id": 1, "name": "phone12", "price": 3300 },
{ "id": 2, "name": "phone43", "price": 1300 },
{ "id": 3, "name": "phone65", "price": 7300 },
{ "id": 4, "name": "phone21", "price": 3300 }
]

---

## 2. GET /products/:id

Returns a single product by ID.

Request:

GET /products/1 HTTP/1.1

Response (200 OK):

{
"id": 1,
"name": "phone12",
"price": 3300
}

Errors:

- 404 Not Found — if the product does not exist
- 400 Bad Request — if ID is invalid

---

## 3. POST /products

Create a new product.

Request:

POST /products HTTP/1.1
Content-Type: application/json

{
"name": "phone99",
"price": 5000
}

Response (201 Created):

{
"id": 1700000000000,
"name": "phone99",
"price": 5000
}

Errors:

- 400 Bad Request — if `name` is missing or not a string

---

## 4. PATCH /products/:id

Update an existing product.

Request:

PATCH /products/1 HTTP/1.1
Content-Type: application/json

{
"name": "phone12 Pro",
"price": 3500
}

Response (200 OK):

{
"id": 1,
"name": "phone12 Pro",
"price": 3500
}

Errors:

- 404 Not Found — if the product does not exist
- 400 Bad Request — if body is invalid

---

## 5. DELETE /products/:id

Delete a product by ID.

Request:

DELETE /products/1 HTTP/1.1

Response (200 OK):

{
"id": 1,
"name": "phone12",
"price": 3300
}

Errors:

- 404 Not Found — if the product does not exist
- 400 Bad Request — if ID is invalid

---

## Notes

- All request and response bodies are in JSON format
- The server must be running on the port defined in `.env` or default 3000
- Use Postman or any HTTP client to test these endpoints

---

## Postman Collection

You can import the existing Postman collection:

postman/products.postman_collection.json

This allows you to test all endpoints quickly.
