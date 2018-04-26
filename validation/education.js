const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  // Validator required that the param passed to it is a string, so if the field was submitted blank/empty, we need to convert the 'null' or 'undefined' value to an empty string via isEmpty()
  // The ternary operator '?' shortens an if/else statement into a single statement.
  // If true, the first expression is returned; if false, the second expression is returned
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "'School' field is required.";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "'Degree' field is required.";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "'Field of Study' is required.";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "'From' field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
