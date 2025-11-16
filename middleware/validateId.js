const getUrlId = require("../helpers/getUrlId");
const jsonTostringify = require("../helpers/jsonTostringify");

module.exports = function validateId(req, res, next) {
  const id = Number(getUrlId(req));

  if (!id || isNaN(id) || id <= 0) {
    res.statusCode = 400;
    return res.end(jsonTostringify({ message: "Invalid ID" }));
  }

  req.id = id;
  next();
};
