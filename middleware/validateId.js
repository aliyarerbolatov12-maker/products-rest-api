const getUrlId = require("../helpers/getUrlId");

function validateId(req, res, next) {
  const id = Number(getUrlId(req));

  if (isNaN(id) || id <= 0) {
    res.statusCode = 400;
    return res.end(jsonTostringify({ message: "Invalid product ID" }));
  }

  req.id = id;
  next();
}

module.exports = validateId;
