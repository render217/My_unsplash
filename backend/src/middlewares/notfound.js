const { NotFoundError } = require("../error/errors");
const notFound = (req, res, next) => {
  throw new NotFoundError("route not found");
};
module.exports = notFound;
