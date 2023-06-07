const logErrors = (err, req, res, next) => {
  console.log("logErrors ---> " + err.stack);
  next(err.stack);
};

module.exports = logErrors;
