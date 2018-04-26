const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Validator required that the param passed to it is a string, so if the field was submitted blank/empty, we need to convert the 'null' or 'undefined' value to an empty string via isEmpty()
  // The ternary operator '?' shortens an if/else statement into a single statement.
  // If true, the first expression is returned; if false, the second expression is returned
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 1, max: 400 })) {
    errors.text = "Posts must be less than 400 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
