const http = require("http");
require("dotenv").config();
const products = require("./constant/products");
const getBody = require("./helpers/getBody");
const jsonTostringify = require("./helpers/jsonTostringify");
const deleteProduct = require("./helpers/deleteProduct");

const validateId = require("./middleware/validateId");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url.startsWith("/products/")) {
    validateId(req, res, async () => {
      try {
        if (req.url === "/" && req.method === "GET") {
          res.end("Hello world");
        } else if (req.url === "/products" && req.method === "GET") {
          res.end(jsonTostringify(products));
        } else if (req.url.startsWith("/products/") && req.method === "GET") {
          const product = products.find((product) => product.id === req.id);
          if (product) {
            res.end(jsonTostringify(product));
          } else {
            res.statusCode = 404;
            res.end(jsonTostringify({ message: "Product not found" }));
          }
        } else if (
          req.url.startsWith("/products/") &&
          req.method === "DELETE"
        ) {
          const deletedProduct = deleteProduct(req.id);
          if (deletedProduct) {
            res.statusCode = 200;
            res.end(jsonTostringify(deletedProduct));
          } else {
            res.statusCode = 404;
            res.end(jsonTostringify({ message: "Product not found" }));
          }
        } else if (req.url.startsWith("/products/") && req.method === "PATCH") {
          const data = await getBody(req);
          const parsedData = JSON.parse(data);

          const productIndex = products.findIndex((p) => p.id === req.id);
          if (productIndex === -1) {
            res.statusCode = 404;
            res.end(jsonTostringify({ message: "Product not found" }));
          } else {
            const product = products[productIndex];
            if (parsedData.name) product.name = parsedData.name;
            if (parsedData.price !== undefined)
              product.price = parsedData.price;

            res.statusCode = 200;
            res.end(jsonTostringify(product));
          }
        }
      } catch (error) {
        res.statusCode = 400;
        res.end(jsonTostringify({ message: error.message || "Bad Request" }));
      }
    });
  } else if (req.url === "/products" && req.method === "POST") {
    const data = await getBody(req);
    const parsedData = JSON.parse(data);

    if (!parsedData.name || typeof parsedData.name !== "string") {
      throw new Error("Product name is required and must be a string.");
    }

    const newProduct = {
      id: new Date().getTime(),
      name: parsedData.name,
      price: parsedData.price || 0,
    };

    products.push(newProduct);
    res.statusCode = 201;
    res.end(jsonTostringify(newProduct));
  } else {
    res.statusCode = 404;
    res.end(jsonTostringify({ message: "API not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
