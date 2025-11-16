# Products REST API

A simple REST API for managing products built with **Node.js** and **vanilla HTTP module**.

This project demonstrates:

- CRUD operations for products (`GET`, `POST`, `PATCH`, `DELETE`)
- ID validation middleware
- Body parsing for requests
- Centralized routing for `/products` endpoints

---

# Products REST API

A simple REST API for managing products built with **Node.js** and **vanilla HTTP module**.

This project demonstrates:
- CRUD operations for products (`GET`, `POST`, `PATCH`, `DELETE`)
- ID validation middleware
- Body parsing for requests
- Centralized routing for `/products` endpoints

---

## Project Structure

```plaintext
products-rest-api/
├── router/
│   └── products.js         # Product routes
├── helpers/                # Helper functions
├── middleware/             # Middleware for validation
├── cors/                   # New CORS middleware folder
│   └── cors.js             # CORS configuration or middleware file
├── constant/               # Data (products array)
├── postman/                # Postman collection JSON
├── documentations/         # Detailed API documentation
│   └── RestApi/
│       └── Products.md     # API documentation for Products
├── index.js                # HTTP server
├── package.json            # Project dependencies and scripts
└── .env                    # Environment variables
```  

## Installation

1. Clone the repository:

git clone https://github.com/aliyarerbolatov12-maker/products-rest-api.git
cd products-rest-api

2. Install dependencies:

npm install

3. Create a `.env` file (optional):

PORT=3000

---

## Usage

Start the server:

npm run dev

Server will run on http://localhost:3000 (or your `.env` PORT).

---

## Documentation

Detailed REST API documentation is available in:

documentations/RestApi/Products.md

This includes all endpoints, request/response examples, and error cases.

---

## Postman Collection

Import the Postman collection for testing all endpoints quickly:

postman/products-rest-api.postman_collection.json
