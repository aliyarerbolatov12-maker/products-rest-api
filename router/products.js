const products = require("../constant/products");
const validateId = require("../middleware/validateId");
const getBody = require("../helpers/getBody");
const jsonTostringify = require("../helpers/jsonTostringify");
const deleteProduct = require("../helpers/deleteProduct");

module.exports = async function productsRouter(req, res) {
  // GET /products
  if (req.url === "/products" && req.method === "GET") {
    return res.end(jsonTostringify(products));
  }

  if (req.url === "/products" && req.method === "POST") {
    try {
      const data = await getBody(req);
      const parsed = JSON.parse(data);

      if (!parsed.name || typeof parsed.name !== "string") {
        res.statusCode = 400;
        return res.end(
          jsonTostringify({
            message: "Product name is required and must be a string",
          })
        );
      }

      const newProduct = {
        id: Date.now(),
        name: parsed.name,
        price: parsed.price || 0,
      };

      products.push(newProduct);
      res.statusCode = 201;
      return res.end(jsonTostringify(newProduct));
    } catch (err) {
      res.statusCode = 400;
      return res.end(jsonTostringify({ error: err.message }));
    }
  }

  // Routes with /products/:id
  if (req.url.startsWith("/products/")) {
    return validateId(req, res, async () => {
      const id = req.id;

      // GET /products/:id
      if (req.method === "GET") {
        const product = products.find((p) => p.id === id);
        if (!product) {
          res.statusCode = 404;
          return res.end(jsonTostringify({ message: "Product not found" }));
        }
        return res.end(jsonTostringify(product));
      }

      // DELETE /products/:id
      if (req.method === "DELETE") {
        try {
          const deleted = deleteProduct(id);
          if (!deleted) {
            res.statusCode = 404;
            return res.end(jsonTostringify({ message: "Product not found" }));
          }
          return res.end(jsonTostringify(deleted));
        } catch (err) {
          res.statusCode = 500;
          return res.end(jsonTostringify({ error: err.message }));
        }
      }

      // PATCH /products/:id
      if (req.method === "PATCH") {
        try {
          const data = await getBody(req);
          const parsed = JSON.parse(data);

          const product = products.find((p) => p.id === id);
          if (!product) {
            res.statusCode = 404;
            return res.end(jsonTostringify({ message: "Product not found" }));
          }

          if (parsed.name) product.name = parsed.name;
          if (parsed.price !== undefined) product.price = parsed.price;

          return res.end(jsonTostringify(product));
        } catch (err) {
          res.statusCode = 400;
          return res.end(jsonTostringify({ error: err.message }));
        }
      }

      res.statusCode = 405;
      return res.end(jsonTostringify({ message: "Method not allowed" }));
    });
  }

  res.statusCode = 404;
  return res.end(jsonTostringify({ message: "API not found" }));
};
