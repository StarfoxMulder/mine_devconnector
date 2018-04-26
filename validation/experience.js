const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Validator required that the param passed to it is a string, so if the field was submitted blank/empty, we need to convert the 'null' or 'undefined' value to an empty string via isEmpty()
  // The ternary operator '?' shortens an if/else statement into a single statement.
  // If true, the first expression is returned; if false, the second expression is returned
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title is required.";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company name is required.";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "'From' is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
