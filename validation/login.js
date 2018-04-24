const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Validator required that the param passed to it is a string, so if the field was submitted blank/empty, we need to convert the 'null' or 'undefined' value to an empty string via isEmpty()
  // The ternary operator '?' shortens an if/else statement into a single statement.
  // If true, the first expression is returned; if false, the second expression is returned
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
