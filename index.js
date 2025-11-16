const http = require("http");
require("dotenv").config();

const productsRouter = require("./router/products");
const jsonTostringify = require("./helpers/jsonTostringify");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  try {
    if (req.url === "/" && req.method === "GET") {
      return res.end(jsonTostringify({ message: "Hello world!" }));
    }

    if (req.url.startsWith("/products")) {
      return productsRouter(req, res);
    }

    res.statusCode = 404;
    res.end(jsonTostringify({ message: "API not found" }));
  } catch (error) {
    res.statusCode = 500;
    res.end(jsonTostringify({ message: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
