function getUrlId(req) {
  return req.url.split("/")[2];
}

module.exports = getUrlId;
