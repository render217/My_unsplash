const errorHandler = (err, req, res, next) => {
  const customError = {
    msg: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `Image with id: ${err.value} not found`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).send({ msg: customError.msg });
  // return res.status(500).send({ msg: err });
};

module.exports = errorHandler;
